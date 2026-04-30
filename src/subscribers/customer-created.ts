import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa"
import { Modules } from "@medusajs/framework/utils" // 👈 Wajib import ini di v2
import { resend } from "../lib/resend"
import WelcomeEmail from "../emails/welcome"
import { render } from "@react-email/render"
import * as React from "react" 

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) { 
  
  

  try {
    // 1. CARA MEDUSA V2: Gunakan Module Service, bukan old service
    const customerModuleService = container.resolve(Modules.CUSTOMER)
    
    // 2. Method-nya ganti nama jadi retrieveCustomer
    const customer = await customerModuleService.retrieveCustomer(data.id)

    if (!customer.email) {
        console.log("⚠️ Kustomer tidak punya email, operasi dihentikan.")
        return
    }

    const htmlContent = await render(
      React.createElement(WelcomeEmail, { 
        customerName: customer.first_name || "there" 
      })
    )

    const resendResponse = await resend.emails.send({
      // UBAH BAGIAN INI BOS 👇
      from: "info@niconicoresort.com", 
      to: customer.email,
      subject: "Welcome to Niconico Resort",
      html: htmlContent,
    });
    
    console.log(`✅ Welcome email sukses dikirim ke: ${customer.email}`)

  } catch (error) {
    console.error(`❌ ERROR SUBSCRIBER:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
}