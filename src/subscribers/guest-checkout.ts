import { type SubscriberConfig, type SubscriberArgs } from "@medusajs/framework"
import { Modules } from "@medusajs/framework/utils"

export default async function guestCheckoutHandler({
  event: { data },
  container,
}: SubscriberArgs<{ id: string }>) {
  // 🌟 Di v2, kita resolve melalui Modules
  const customerModule = container.resolve(Modules.CUSTOMER)
  const orderModule = container.resolve(Modules.ORDER)

  try {
    // 1. Tarik data order terbaru
    const order = await orderModule.retrieveOrder(data.id)

    // Jika ini Guest Checkout (terdeteksi dari stempel is_guest frontend)
    if (order.metadata?.is_guest) {
      
      // 2. Cek apakah customer dengan email ini sudah ada di database
      const customers = await customerModule.listCustomers({
        email: order.email
      })
      let customer = customers[0]

      // Jika tidak ada, buat customer baru (Guest)
      if (!customer) {
        customer = await customerModule.createCustomers({
          email: order.email,
          first_name: "Guest",
          last_name: "Checkout"
        })
      }

      // 3. Cari Customer Group bernama "Guest Checkout"
      const groups = await customerModule.listCustomerGroups({
        name: "Guest Checkout"
      })
      const guestGroup = groups[0]

      // 4. Eksekusi: Masukkan customer ke dalam grup tersebut
      if (guestGroup && customer) {
        await customerModule.addCustomerToGroup({
          customer_id: customer.id,
          customer_group_id: guestGroup.id
        })
        console.log(`[SUKSES] Guest ${order.email} telah dijebloskan ke grup Guest Checkout!`)
      }
    }
  } catch (err) {
    console.error("[ERROR] Gagal memproses Guest Checkout group:", err)
  }
}

export const config: SubscriberConfig = {
  event: "order.placed", 
}