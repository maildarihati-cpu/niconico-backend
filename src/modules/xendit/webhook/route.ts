import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { completeCartWorkflow } from "@medusajs/core-flows"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  // 1. Ambil laporan dari Xendit
  const payload = req.body as any;
  const invoiceData = payload?.data?.id ? payload.data : payload;

  // 2. Ambil Cart ID yang tadi kita titipkan
  const cartId = invoiceData.external_id;

  // 3. Cek apakah benar ini laporan lunas dan memiliki Cart ID
  if (invoiceData.status === "PAID" && cartId?.startsWith("cart_")) {
    try {
      console.log(`🎉 UANG MASUK! Memproses Cart: ${cartId} menjadi Order...`);

      // 4. BONGKAR PAKSA: Suruh Medusa ubah keranjang jadi Order detik ini juga!
      await completeCartWorkflow(req.scope).run({
        input: { id: cartId }
      });

      console.log(`✅ BOOM! Cart ${cartId} resmi mendarat di Dashboard Admin!`);
    } catch (error) {
      console.error("❌ Gagal mengeksekusi Order:", error);
    }
  }

  // 5. Selalu balas 200 OK ke Xendit biar dia nggak bawel
  return res.status(200).send("OK");
}