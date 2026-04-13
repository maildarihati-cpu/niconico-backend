import { model } from "@medusajs/framework/utils"

export const StoreLocation = model.define("store_location", {
  id: model.id().primaryKey(),
  name: model.text(),
  address: model.text(),
  image_main: model.text(),
  image_sub1: model.text().nullable(),
  image_sub2: model.text().nullable(),
  maps_link: model.text().nullable(),
  wa_link: model.text().nullable(),
  is_featured: model.boolean().default(false),
})