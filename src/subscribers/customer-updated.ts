import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils" // 👈 Mengikuti standar v2 kamu
import { resend } from "../lib/resend"

export default async function customerUpdatedHandler({
  event: { data }, // Mengikuti gaya destrukturisasi kamu
  container,
}: SubscriberArgs<{ id: string }>) { 
  
  

  try {
    // 1. CARA MEDUSA V2: Menggunakan Modules.CUSTOMER sesuai contohmu
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    
    // 2. Retrieve data kustomer terbaru
    const customer = await customerModuleService.retrieveCustomer(data.id)

    if (!customer.email) {
        console.log("⚠️ Kustomer tidak punya email, operasi dihentikan.")
        return
    }

    // 3. Kirim Email via Resend
    // Pakai from: info@niconicoresort.com sesuai kodingan welcome kamu
    const resendResponse = await resend.emails.send({
      from: "info@niconicoresort.com", 
      to: customer.email,
      subject: "Profile Updated Successfully 🍍",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #EF7044;">Halo, ${customer.first_name}!</h2>
          <p>Kami cuma mau kasih tahu kalau profil kamu di <strong>Niconico Resort</strong> baru saja diperbarui.</p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
             <p style="margin: 0;"><strong>Nama:</strong> ${customer.first_name} ${customer.last_name}</p>
             <p style="margin: 0;"><strong>Phone:</strong> ${customer.phone || '-'}</p>
          </div>
          <p>Kalau bukan kamu yang melakukan perubahan ini, segera hubungi admin ya say!</p>
          <br />
          <p style="font-size: 12px; color: #999;">Niconico Resort Team</p>
        </div>
      `,
    });
    
   

  } catch (error) {
    
  }
}

export const config: SubscriberConfig = {
  event: "customer.updated",
}