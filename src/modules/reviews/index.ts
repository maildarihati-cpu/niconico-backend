import { Module } from "@medusajs/framework/utils"
import ReviewModuleService from "./service"

export const REVIEWS_MODULE = "reviews"

export default Module(REVIEWS_MODULE, {
  service: ReviewModuleService,
})