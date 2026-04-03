import { model } from "@medusajs/framework/utils"

const Review = model.define("review", {
  id: model.id({ prefix: "rev" }).primaryKey(),
  customer_name: model.text(),
  review_text: model.text(),
  rating: model.number().default(5), // Bintang 1-5
  image_url: model.text().nullable(), // Foto dari Cloudflare
  country_code: model.text(), // Kode negara (ID, US, dll)
  country_name: model.text(), // Nama negara lengkap
  is_displayed: model.boolean().default(true), // Status tayang di frontend
  rank: model.number().default(0), // Urutan tampil
})

export { Review }