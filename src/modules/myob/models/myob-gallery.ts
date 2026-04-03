import { model } from "@medusajs/framework/utils"

export const MyobGallery = model.define("myob_gallery", {
  id: model.id().primaryKey(),
  url: model.text(),
})