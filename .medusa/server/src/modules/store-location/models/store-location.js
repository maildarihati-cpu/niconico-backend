"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreLocation = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.StoreLocation = utils_1.model.define("store_location", {
    id: utils_1.model.id().primaryKey(),
    name: utils_1.model.text(),
    address: utils_1.model.text(),
    image_main: utils_1.model.text(),
    image_sub1: utils_1.model.text().nullable(),
    image_sub2: utils_1.model.text().nullable(),
    maps_link: utils_1.model.text().nullable(),
    wa_link: utils_1.model.text().nullable(),
    is_featured: utils_1.model.boolean().default(false),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUtbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvbW9kdWxlcy9zdG9yZS1sb2NhdGlvbi9tb2RlbHMvc3RvcmUtbG9jYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRXBDLFFBQUEsYUFBYSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUU7SUFDMUQsRUFBRSxFQUFFLGFBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUU7SUFDM0IsSUFBSSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDbEIsT0FBTyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDckIsVUFBVSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUU7SUFDeEIsVUFBVSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkMsVUFBVSxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbkMsU0FBUyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDbEMsT0FBTyxFQUFFLGFBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLEVBQUU7SUFDaEMsV0FBVyxFQUFFLGFBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO0NBQzVDLENBQUMsQ0FBQSJ9