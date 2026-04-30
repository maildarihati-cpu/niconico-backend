import { type SubscriberArgs, type SubscriberConfig } from "@medusajs/medusa"
import { resend } from "../lib/resend" 

export default async function passwordResetHandler({
  event: { data },
}: SubscriberArgs<{ entity_id: string; token: string; actor_type: string }>) { 
  
  // Di Medusa V2, alamat email disimpan di dalam variabel 'entity_id'
  const email = data.entity_id;
  const token = data.token;

  console.log("🔥 EVENT TERTANGKAP: Permintaan Reset Password untuk:", email)

  try {
    if (!email || !token) {
        console.log("⚠️ Data email atau token kosong, operasi dihentikan.")
        return
    }

    // Kirim Email via Resend
    const resendResponse = await resend.emails.send({
      from: "info@niconicoresort.com", 
      to: email,
      subject: "Reset Your Password 🍍",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333; text-align: center; padding: 20px;">
          <h2 style="color: #EF7044; letter-spacing: 2px;">RESET PASSWORD</h2>
          <p>Kami menerima permintaan untuk mengatur ulang password akun <strong>Niconico Resort</strong> kamu, say.</p>
          <p>Silakan salin (copy) token verifikasi di bawah ini dan masukkan ke dalam kolom di website:</p>
          
          <div style="background: #fff3f0; padding: 20px; border-radius: 10px; margin: 30px 0; border: 2px dashed #EF7044;">
             <p style="font-size: 16px; font-weight: bold; margin: 0; color: #EF7044; word-break: break-all;">
               ${token}
             </p>
          </div>
          
          <p style="font-size: 12px; color: #999;">Kalau kamu merasa tidak pernah meminta reset password, abaikan saja email ini ya.</p>
          <br />
          <p style="font-size: 12px; font-weight: bold; color: #333;">Niconico Resort Team</p>
        </div>
      `,
    });
    
    console.log(`✅ Email token reset password sukses dikirim ke: ${email}`)

  } catch (error) {
    console.error(`❌ ERROR SUBSCRIBER RESET PASSWORD:`, error)
  }
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}