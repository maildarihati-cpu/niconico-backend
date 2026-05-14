"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.default = customerUpdatedHandler;
const utils_1 = require("@medusajs/framework/utils"); // 👈 Mengikuti standar v2 kamu
const resend_1 = require("../lib/resend");
async function customerUpdatedHandler({ event: { data }, // Mengikuti gaya destrukturisasi kamu
container, }) {
    try {
        // 1. CARA MEDUSA V2: Menggunakan Modules.CUSTOMER sesuai contohmu
        const customerModuleService = container.resolve(utils_1.Modules.CUSTOMER);
        // 2. Retrieve data kustomer terbaru
        const customer = await customerModuleService.retrieveCustomer(data.id);
        if (!customer.email) {
            console.log("⚠️ Kustomer tidak punya email, operasi dihentikan.");
            return;
        }
        // 3. Kirim Email via Resend
        // Pakai from: info@niconicoresort.com sesuai kodingan welcome kamu
        const resendResponse = await resend_1.resend.emails.send({
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
    }
    catch (error) {
    }
}
exports.config = {
    event: "customer.updated",
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tZXItdXBkYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zdWJzY3JpYmVycy9jdXN0b21lci11cGRhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlBLHlDQTZDQztBQWhERCxxREFBbUQsQ0FBQywrQkFBK0I7QUFDbkYsMENBQXNDO0FBRXZCLEtBQUssVUFBVSxzQkFBc0IsQ0FBQyxFQUNuRCxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxzQ0FBc0M7QUFDdkQsU0FBUyxHQUNzQjtJQUkvQixJQUFJLENBQUM7UUFDSCxrRUFBa0U7UUFDbEUsTUFBTSxxQkFBcUIsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLGVBQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUVqRSxvQ0FBb0M7UUFDcEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFFdEUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLG9EQUFvRCxDQUFDLENBQUE7WUFDakUsT0FBTTtRQUNWLENBQUM7UUFFRCw0QkFBNEI7UUFDNUIsbUVBQW1FO1FBQ25FLE1BQU0sY0FBYyxHQUFHLE1BQU0sZUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDOUMsSUFBSSxFQUFFLHlCQUF5QjtZQUMvQixFQUFFLEVBQUUsUUFBUSxDQUFDLEtBQUs7WUFDbEIsT0FBTyxFQUFFLGlDQUFpQztZQUMxQyxJQUFJLEVBQUU7OzhDQUVrQyxRQUFRLENBQUMsVUFBVTs7OzREQUdMLFFBQVEsQ0FBQyxVQUFVLElBQUksUUFBUSxDQUFDLFNBQVM7NkRBQ3hDLFFBQVEsQ0FBQyxLQUFLLElBQUksR0FBRzs7Ozs7O09BTTNFO1NBQ0YsQ0FBQyxDQUFDO0lBSUwsQ0FBQztJQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7SUFFakIsQ0FBQztBQUNILENBQUM7QUFFWSxRQUFBLE1BQU0sR0FBcUI7SUFDdEMsS0FBSyxFQUFFLGtCQUFrQjtDQUMxQixDQUFBIn0=