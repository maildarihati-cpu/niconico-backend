import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Resend } from "resend"

// Inisialisasi Resend menggunakan API Key dari .env
const resend = new Resend(process.env.RESEND_API_KEY)

export default async function orderPlacedHandler({
  event: { data }, 
  container,
}: SubscriberArgs<{ id: string }>) {
  
  const orderId = data.id
  const query = container.resolve("query")
  
  const { data: orderResult } = await query.graph({
    entity: "order",
    filters: { id: orderId },
    fields: ["email", "total", "items.title", "currency_code", "first_name"]
  })

  const order = orderResult[0] as any
  if (!order || !order.email) return

  const customerName = order.first_name || "Valued Customer"

  try {
    await resend.emails.send({
      from: "Niconico Resort <orders@niconicoresort.com>", // Pastikan domain ini sudah diverifikasi di Resend
      to: order.email,
      subject: "Thank You for Your Order - Niconico Resort",
      
      // 🌟 TEMPLATE EMAIL ADA DI SINI BOS (html property)
      html: `
        <div style="font-family: Arial, sans-serif; color: #000000; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #E60000;">Thank You, ${customerName}!</h1>
          <p>We have received your order <strong>#${orderId}</strong> and are getting it ready for you.</p>
          <p>We will notify you once it has been shipped.</p>
          <hr style="border-top: 1px solid #eaeaea; margin: 20px 0;" />
          <p style="font-size: 12px; color: #888888;">Niconico Resort - Bali</p>
        </div>
      `
    })
    console.log(`Order confirmation sent to ${order.email}`)
  } catch (error) {
    console.error("Gagal mengirim email Order Placed via Resend:", error)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}