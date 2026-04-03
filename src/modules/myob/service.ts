import { MedusaService } from "@medusajs/framework/utils"
import { Myob } from "./models/myob"
import { MyobGallery } from "./models/myob-gallery" // Tambahkan ini

class MyobService extends MedusaService({
  Myob,
  MyobGallery // Tambahkan ini juga
}) {}

export default MyobService