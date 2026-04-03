import { Module } from "@medusajs/framework/utils"
import MyobModuleService from "./service"

export const MYOB_MODULE = "myob"

export default Module(MYOB_MODULE, {
  service: MyobModuleService,
})