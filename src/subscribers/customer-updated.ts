import { 
  type SubscriberConfig, 
  type SubscriberArgs 
} from "@medusajs/medusa";
import { resend } from "../lib/resend"; // Pastikan path ke resend.ts bener ya say

export default async function customerUpdatedHandler({
  event, // Ganti 'data' menjadi 'event'
  container,
}: SubscriberArgs<any>) {
  // 1. Ambil service kustomer lewat container (Tanpa import CustomerService di atas)
  const customerService: any = container.resolve("customerService");

  // 2. Ambil ID kustomer dari event.data
  const { id } = event.data;

  // 3. Tarik data lengkap kustomer
  try {
    const customer = await customerService.retrieve(id);

    if (!customer) return;

    // 4. Kirim Email via Resend
    await resend.emails.send({
      from: 'Niconico Resort <onboarding@resend.dev>', // Ganti pakai domain kamu nanti
      to: [customer.email],
      subject: 'Profile Updated Successfully 🍍',
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
    
    console.log(`✅ Success: Email update profil terkirim ke ${customer.email}`);
  } catch (error) {
    console.error("❌ Gagal proses subscriber update kustomer:", error);
  }
}

export const config: SubscriberConfig = {
  event: "customer.updated",
  context: {
    subscriberId: "customer-updated-handler",
  },
};