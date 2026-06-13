import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function orderStatusNotifierHandler({
  event: { name, data },
  container,
}: SubscriberArgs<{ id: string }>) {
  // Panggil Modul Order untuk mengambil data lengkap order
  const orderModule = container.resolve(Modules.ORDER)

  try {
    // 1. Ambil data order berdasarkan ID
    // Jika event-nya dari fulfillment/shipment, kadang ID order ada di order_id
    const orderId = (data as any).order_id || data.id;
    if (!orderId) return;

    const order = await orderModule.retrieveOrder(orderId, {
      relations: ["items", "shipping_address", "customer"]
    })

    if (!order || !order.email) return;

    let emailSubject = ""
    let emailTitle = ""
    let emailMessage = ""

    // 2. Cocokkan Event dengan Pesan Email (Bahasa Inggris)
    switch (name) {
      case "order.payment_captured":
        emailSubject = "Order Confirmed - Niconico Resort"
        emailTitle = "Your Order is Confirmed!"
        emailMessage = `Thank you for shopping with us! We have successfully received your payment for Order #${order.display_id}. We are now preparing your items and will notify you once they are ready to ship.`
        break;

      case "order.fulfillment_created":
        emailSubject = "Processing Order - Niconico Resort"
        emailTitle = "We are Processing Your Order!"
        emailMessage = `Great news! Your Order #${order.display_id} is currently being processed and packed by our team. We'll let you know as soon as it leaves our warehouse.`
        break;

      case "order.shipment_created":
        emailSubject = "Order on the Way - Niconico Resort"
        emailTitle = "Your Order is on the Way!"
        emailMessage = `Yay! Your Order #${order.display_id} has been handed over to our shipping courier and is now on its way to you. Keep an eye out for your package!`
        break;

      case "order.fulfillment_delivered":
        emailSubject = "Order Complete - Niconico Resort"
        emailTitle = "Order Delivered Successfully!"
        emailMessage = `Your Order #${order.display_id} has been marked as delivered. We hope you love your purchase! Thank you for choosing Niconico Resort.`
        break;
        
      default:
        return; // Jika event tidak cocok, jangan lakukan apa-apa
    }

    // 3. Template HTML Basic (Sementara, bisa diganti nanti)
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h2 style="color: #EF7044; margin: 0;">NICONICO RESORT</h2>
        </div>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h3 style="color: #333; margin-top: 0;">${emailTitle}</h3>
          <p style="color: #555; line-height: 1.5; font-size: 14px;">Hi ${order.shipping_address?.first_name || 'there'},</p>
          <p style="color: #555; line-height: 1.5; font-size: 14px;">${emailMessage}</p>
        </div>
        <div style="margin-top: 20px; text-align: center; color: #999; font-size: 12px;">
          <p>If you have any questions, please reply to this email.</p>
          <p>&copy; ${new Date().getFullYear()} Niconico Resort. All rights reserved.</p>
        </div>
      </div>
    `;

    // 4. LOGIKA PENGIRIMAN EMAIL (Nodemailer / Resend / SendGrid)
    // 🌟 SEMENTARA KITA LOG KE CONSOLE DULU SEBELUM BOS PASANG KREDENSIAL SMTP
    console.log("=========================================")
    console.log(`📧 MENGIRIM EMAIL KE: ${order.email}`)
    console.log(`🏷️  SUBJECT: ${emailSubject}`)
    console.log(`✉️  ISI PESAN: \n${htmlTemplate}`)
    console.log("=========================================")

    /* 💡 CONTOH JIKA NANTI MAU PAKAI RESEND (Langsung buka komennya):
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Niconico Support <no-reply@niconicoresort.com>',
      to: order.email,
      subject: emailSubject,
      html: htmlTemplate
    });
    */

  } catch (err) {
    console.error("[ERROR] Gagal memproses notifikasi status order:", err)
  }
}

// 🌟 DAFTARKAN SEMUA EVENT YANG HARUS DIDENGARKAN OLEH MEDUSA
export const config: SubscriberConfig = {
  event: [
    "order.payment_captured",
    "order.fulfillment_created",
    "order.shipment_created",
    "order.fulfillment_delivered"
  ],
}