import { Module } from "@medusajs/framework/utils"
import StoreLocation from "../../modules/store-location/service"

export const STORE_LOCATION_MODULE = "storeLocation"

export default Module(STORE_LOCATION_MODULE, {
  service: StoreLocation,
})