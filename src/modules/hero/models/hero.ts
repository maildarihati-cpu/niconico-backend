import { model } from "@medusajs/framework/utils"

const Hero = model.define("hero", {
  id: model.id({ prefix: "hero" }).primaryKey(),
  image_url: model.text(),
  position: model.number().default(0), 
  category: model.text().default("hero-banner"),
})

const HeroSetting = model.define("hero_setting", {
  id: model.id({ prefix: "hset" }).primaryKey(),
  global_title: model.text().default("SIMPLY BE YOUR OWN"),
})

// EXPORT KEDUANYA
export { Hero, HeroSetting }