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
      const query = req.scope.resolve("query");

      // 🌟 PELACAK LAPIS 1: Kalau tiketnya Payment Session (payses_)
      if (incomingId?.startsWith("payses_")) {
        console.log(`🔍 Melacak dari Payment Session: ${incomingId}...`);
        const { data: sessions } = await query.graph({
          entity: "payment_session",
          fields: ["payment_collection_id"],
          filters: { id: incomingId } as any 
        });
        if (sessions && sessions.length > 0 && sessions[0].payment_collection_id) {
          incomingId = sessions[0].payment_collection_id; // Lempar ke pelacak lapis 2
          console.log(`🎯 Session mengarah ke PayCol: ${incomingId}`);
        }
      }

      // 🌟 PELACAK LAPIS 2: Kalau tiketnya Payment Collection (pay_col_)
      if (incomingId?.startsWith("pay_col_")) {
        console.log(`🔍 Melacak Cart ID dari Payment Collection: ${incomingId}...`);
        const { data: carts } = await query.graph({
          entity: "cart",
          fields: ["id"],
          filters: { payment_collection: { id: incomingId } } as any 
        });

        if (carts && carts.length > 0) {
          cartIdToComplete = carts[0].id;
          console.log(`🎯 Ketemu! Cart ID aslinya adalah: ${cartIdToComplete}`);
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