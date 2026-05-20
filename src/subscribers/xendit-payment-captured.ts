import { completeCartWorkflow } from "@medusajs/core-flows"

// 🌟 Tipenya tetap 'any' biar aman
export default async function xenditPaymentCapturedHandler({
  event,
  container,
}: any) {
  const { payment_collection_id } = event.data

  const paymentModuleService = container.resolve("payment")
  const cartModuleService = container.resolve("cart")

  try {
    // 1. Ambil data payment collection untuk mencari tahu ID Cart-nya
    const paymentCollection = await paymentModuleService.retrievePaymentCollection(
      payment_collection_id,
      { relations: ["payment_sessions"] }
    )

    // Cek apakah ini transaksi milik Xendit
    const isXendit = paymentCollection.payment_sessions?.some(
      (session: any) => session.provider_id === "pp_xendit_xendit"
    )

    if (!isXendit) return

    // 2. Cari tahu ID Cart yang terikat dengan payment ini
    const cartId = paymentCollection.context?.cart_id
    if (!cartId) return

    // 🌟 3. PERBAIKAN DI SINI: Gunakan .run() untuk mengeksekusi workflow
    await completeCartWorkflow(container).run({
      input: { id: cartId } 
    })

    console.log(`🎉 Sukses mengubah Cart ${cartId} menjadi Order resmi di Admin!`)
  } catch (error) {
    console.error("Gagal memproses otomatisasi Cart ke Order:", error)
  }
}

// 🌟 Config polos tanpa import tipe
export const config = {
  event: "payment-collection.payment-captured",
}