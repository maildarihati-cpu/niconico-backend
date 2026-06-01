import { SubscriberArgs, type SubscriberConfig } from "@medusajs/framework"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function orderFulfillmentHandler({
  event: { data },
  container,
}: SubscriberArgs<{ fulfillment_id: string }>) {
  
  const fulfillmentId = data.fulfillment_id
  const query = container.resolve("query")
  
  const { data: fulfillmentResult } = await query.graph({
    entity: "fulfillment",
    filters: { id: fulfillmentId },
    fields: ["tracking_numbers.tracking_number", "order.email", "order.first_name"]
  })

  const fulfillment = fulfillmentResult[0] as any
  if (!fulfillment || !fulfillment.order?.email) return

  const trackingNumber = fulfillment.tracking_numbers?.[0]?.tracking_number || "Pending"
  const customerEmail = fulfillment.order.email
  const customerName = fulfillment.order.first_name || "Customer"

  try {
    await resend.emails.send({
      from: "Niconico Resort <orders@niconicoresort.com>",
      to: customerEmail,
      subject: "Your Order is on the Way! - Niconico Resort",
      
      // 🌟 TEMPLATE EMAIL ADA DI SINI BOS (html property)
      html: `
        <div style="font-family: Arial, sans-serif; color: #000000; max-width: 600px; margin: 0 auto;">
          <h2>Great news, ${customerName}!</h2>
          <p>Your order has been shipped and is on its way to you.</p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #000000; margin: 20px 0;">
            <p style="margin: 0;"><strong>Tracking Number:</strong> ${trackingNumber}</p>
          </div>
          <p>Safe travels,<br/>The Niconico Resort Team</p>
        </div>
      `
    })
    console.log(`Fulfillment email sent to ${customerEmail}`)
  } catch (error) {
    console.error("Gagal mengirim email Fulfillment via Resend:", error)
  }
}

export const config: SubscriberConfig = {
  event: "fulfillment.created",
}