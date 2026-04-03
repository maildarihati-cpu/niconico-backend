import { MedusaService } from "@medusajs/framework/utils"
import { Hero, HeroSetting } from "./models/hero"

class HeroService extends MedusaService({
  Hero,
  HeroSetting,
}) {}

export default HeroService