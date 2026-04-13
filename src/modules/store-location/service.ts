import { MedusaService } from "@medusajs/framework/utils"
import { StoreLocation } from "./models/store-location"

class StoreLocationModuleService extends MedusaService({
  StoreLocation,
}) {}

export default StoreLocationModuleService