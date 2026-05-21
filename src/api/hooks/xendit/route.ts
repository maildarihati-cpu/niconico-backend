import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeCartWorkflow } from "@medusajs/core-flows"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const payload = req.body as any;
  console.log("🚨 [XENDIT WEBHOOK MASUK]:", JSON.stringify(payload, null, 2));

  const invoiceData = payload?.data?.id ? payload.data : payload;
  let incomingId = invoiceData?.external_id;
  const status = invoiceData?.status;

  console.log(`📌 Mengecek Syarat - Status: ${status}, ID Masuk: ${incomingId}`);

  if (status === "PAID") {
    try {
      let cartIdToComplete = incomingId;
      const paymentModuleService = req.scope.resolve("payment");

      // 🌟 PELACAK LAPIS 1: Kalau tiketnya Payment Session (payses_)
      if (incomingId?.startsWith("payses_")) {
        console.log(`🔍 Melacak dari Payment Session: ${incomingId}...`);
        try {
          const session = await paymentModuleService.retrievePaymentSession(incomingId);
          // Tutup mata TypeScript untuk session
          if (session && (session as any).payment_collection_id) {
            incomingId = (session as any).payment_collection_id;
            console.log(`🎯 Session mengarah ke PayCol: ${incomingId}`);
          }
        } catch (err) {
          console.log("⚠️ Gagal mengekstrak Session.");
        }
      }

      // 🌟 PELACAK LAPIS 2: Kalau tiketnya Payment Collection (pay_col_)
      if (incomingId?.startsWith("pay_col_")) {
        console.log(`🔍 Melacak Cart ID dari Payment Collection: ${incomingId}...`);
        try {
          const payCol = await paymentModuleService.retrievePaymentCollection(incomingId);
          
          // 🌟 JURUS TUTUP MATA TOTAL: Jadikan payCol sebagai 'any' sepenuhnya
          const payColAny = payCol as any;
          let foundCartId = payColAny.cart_id || payColAny.context?.cart_id || payColAny.metadata?.cart_id;

          if (!foundCartId) {
            const query = req.scope.resolve("query");
            const { data: collections } = await query.graph({
              entity: "payment_collection",
              fields: ["id", "cart.id", "cart_id"],
              filters: { id: incomingId } as any 
            });
            if (collections && collections.length > 0) {
              const colAny = collections[0] as any;
              foundCartId = colAny.cart?.id || colAny.cart_id;
            }
          }

          if (foundCartId) {
            cartIdToComplete = foundCartId;
            console.log(`🎯 Ketemu! Cart ID aslinya adalah: ${cartIdToComplete}`);
          }
        } catch (err: any) {
          console.log("⚠️ Pelacak Lapis 2 Gagal:", err?.message);
        }
      }

      // 🌟 EKSEKUSI FINAL
      if (cartIdToComplete?.startsWith("cart_")) {
        console.log(`🎉 UANG MASUK! Memproses Cart: ${cartIdToComplete} menjadi Order...`);
        
        await completeCartWorkflow(req.scope).run({
          input: { id: cartIdToComplete }
        } as any);

        console.log(`✅ BOOM! Cart ${cartIdToComplete} resmi mendarat di Dashboard Admin!`);
      } else {
        console.log("⚠️ ROBOT DIAM: Gagal melacak atau menemukan ID Cart yang valid.");
      }
    } catch (error: any) {
      console.error("❌ Gagal mengeksekusi Order:", error?.message || error);
    }
  } else {
    console.log("⚠️ ROBOT DIAM: Status pembayaran bukan PAID.");
  }

  return res.status(200).send("OK");
}