"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const utils_1 = require("@medusajs/framework/utils");
const Review = utils_1.model.define("review", {
    id: utils_1.model.id({ prefix: "rev" }).primaryKey(),
    customer_name: utils_1.model.text(),
    review_text: utils_1.model.text(),
    rating: utils_1.model.number().default(5), // Bintang 1-5
    image_url: utils_1.model.text().nullable(), // Foto dari Cloudflare
    country_code: utils_1.model.text(), // Kode negara (ID, US, dll)
    country_name: utils_1.model.text(), // Nama negara lengkap
    is_displayed: utils_1.model.boolean().default(true), // Status tayang di frontend
    rank: utils_1.model.number().default(0), // Urutan tampil
});
exports.Review = Review;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV2aWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL21vZHVsZXMvcmV2aWV3cy9tb2RlbHMvcmV2aWV3LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUFpRDtBQUVqRCxNQUFNLE1BQU0sR0FBRyxhQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUNwQyxFQUFFLEVBQUUsYUFBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLFVBQVUsRUFBRTtJQUM1QyxhQUFhLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUMzQixXQUFXLEVBQUUsYUFBSyxDQUFDLElBQUksRUFBRTtJQUN6QixNQUFNLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjO0lBQ2pELFNBQVMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUUsdUJBQXVCO0lBQzNELFlBQVksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsNEJBQTRCO0lBQ3hELFlBQVksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLEVBQUUsc0JBQXNCO0lBQ2xELFlBQVksRUFBRSxhQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLDRCQUE0QjtJQUN6RSxJQUFJLEVBQUUsYUFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxnQkFBZ0I7Q0FDbEQsQ0FBQyxDQUFBO0FBRU8sd0JBQU0ifQ==