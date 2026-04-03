import { Module } from "@medusajs/framework/utils"
import HeroService from "./service"

export default Module("hero", {
  service: HeroService,
})