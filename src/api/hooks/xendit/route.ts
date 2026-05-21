import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeCartWorkflow } from "@medusajs/core-flows"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const payload = req.body as any;
  console.log("🚨 [XENDIT WEBHOOK MASUK]:", JSON.stringify(payload, null, 2));

  const invoiceData = payload?.data?.id ? payload.data : payload;
  const incomingId = invoiceData?.external_id;
  const status = invoiceData?.status;

  console.log(`📌 Mengecek Syarat - Status: ${status}, ID Masuk: ${incomingId}`);

  if (status === "PAID") {
    try {
      let cartIdToComplete = incomingId;

      // 🌟 Kalau tiketnya berawalan pay_col_, kita bongkar database buat cari Cart aslinya!
      if (incomingId?.startsWith("pay_col_")) {
        console.log(`🔍 Melacak Cart ID dari Payment Collection: ${incomingId}...`);
        const query = req.scope.resolve("query");
        
        // 🌟 JURUS PENANGKAL TYPESCRIPT: Tambahkan 'as any' di bagian filters
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

      // 🌟 Eksekusi Order kalau ID-nya sudah berwujud cart_
      if (cartIdToComplete?.startsWith("cart_")) {
        console.log(`🎉 UANG MASUK! Memproses Cart: ${cartIdToComplete} menjadi Order...`);
        
        // 🌟 JURUS PENANGKAL TYPESCRIPT: Tambahkan 'as any' untuk workflow
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