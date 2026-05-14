"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = passwordResetHandler;
const resend_1 = require("../lib/resend");
async function passwordResetHandler({ event: { data }, }) {
    // Di Medusa V2, alamat email disimpan di dalam variabel 'entity_id'
    const email = data.entity_id;
    const token = data.token;
    console.log("🔥 EVENT TERTANGKAP: Permintaan Reset Password untuk:", email);
    try {
        if (!email || !token) {
            console.log("⚠️ Data email atau token kosong, operasi dihentikan.");
            return;
        }
        // Kirim Email via Resend
        const resendResponse = await resend_1.resend.emails.send({
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
        console.log(`✅ Email token reset password sukses dikirim ke: ${email}`);
    }
    catch (error) {
        console.error(`❌ ERROR SUBSCRIBER RESET PASSWORD:`, error);
    }
}
exports.config = {
    event: "auth.password_reset",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFzc3dvcmQtcmVzZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3Vic2NyaWJlcnMvcGFzc3dvcmQtcmVzZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBR0EsdUNBNkNDO0FBL0NELDBDQUFzQztBQUV2QixLQUFLLFVBQVUsb0JBQW9CLENBQUMsRUFDakQsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLEdBQzBEO0lBRXpFLG9FQUFvRTtJQUNwRSxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1REFBdUQsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUUzRSxJQUFJLENBQUM7UUFDSCxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFBO1lBQ25FLE9BQU07UUFDVixDQUFDO1FBRUQseUJBQXlCO1FBQ3pCLE1BQU0sY0FBYyxHQUFHLE1BQU0sZUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUMsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixFQUFFLEVBQUUsS0FBSztZQUNULE9BQU8sRUFBRSx3QkFBd0I7WUFDakMsSUFBSSxFQUFFOzs7Ozs7OztpQkFRSyxLQUFLOzs7Ozs7OztPQVFmO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtREFBbUQsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUV6RSxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDNUQsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLHFCQUFxQjtDQUM3QixDQUFBIn0=