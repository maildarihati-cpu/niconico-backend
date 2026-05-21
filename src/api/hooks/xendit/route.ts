import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeCartWorkflow } from "@medusajs/core-flows"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const payload = req.body as any;
  
  // 🌟 CCTV 1: Bongkar isi koper Xendit!
  console.log("🚨 [XENDIT WEBHOOK MASUK]:", JSON.stringify(payload, null, 2));

  const invoiceData = payload?.data?.id ? payload.data : payload;
  const cartId = invoiceData?.external_id;
  const status = invoiceData?.status;

  // 🌟 CCTV 2: Cek kondisi syaratnya!
  console.log(`📌 Mengecek Syarat - Status Xendit: ${status}, Cart ID: ${cartId}`);

  if (status === "PAID" && cartId?.startsWith("cart_")) {
    try {
      console.log(`🎉 UANG MASUK! Memproses Cart: ${cartId} menjadi Order...`);
      await completeCartWorkflow(req.scope).run({
        input: { id: cartId }
      });
      console.log(`✅ BOOM! Cart ${cartId} resmi mendarat di Dashboard Admin!`);
    } catch (error: any) {
      console.error("❌ Gagal mengeksekusi Order:", error?.message || error);
    }
  } else {
    // 🌟 CCTV 3: Kalau ditolak, kita tahu alasannya!
    console.log("⚠️ ROBOT DIAM: Order di-skip karena status bukan PAID atau bukan ID Cart.");
  }

  return res.status(200).send("OK");
}