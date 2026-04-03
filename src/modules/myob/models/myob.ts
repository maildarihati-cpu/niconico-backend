import { model } from "@medusajs/framework/utils"

export const Myob = model.define("myob", {
  id: model.id().primaryKey(),
  content_type: model.text(),
  media_url: model.text().nullable(),
  poster_url: model.text().nullable(),
  heading: model.text(),
  quote_verbatim: model.text(),
  button_text: model.text(),
  button_link: model.text(),
})