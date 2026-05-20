import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import XenditPaymentProvider from "./service"

// 🌟 Kita pakaikan seragam ModuleProvider agar Medusa mau mendaftarkannya!
export default ModuleProvider(Modules.PAYMENT, {
  services: [XenditPaymentProvider],
})