"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Myob = void 0;
const utils_1 = require("@medusajs/framework/utils");
exports.Myob = utils_1.model.define("myob", {
    id: utils_1.model.id().primaryKey(),
    content_type: utils_1.model.text(),
    media_url: utils_1.model.text().nullable(),
    poster_url: utils_1.model.text().nullable(),
    heading: utils_1.model.text(),
    quote_verbatim: utils_1.model.text(),
    button_text: utils_1.model.text(),
    button_link: utils_1.model.text(),
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL215b2IvbW9kZWxzL215b2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQWlEO0FBRXBDLFFBQUEsSUFBSSxHQUFHLGFBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO0lBQ3ZDLEVBQUUsRUFBRSxhQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsVUFBVSxFQUFFO0lBQzNCLFlBQVksRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQzFCLFNBQVMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ2xDLFVBQVUsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxFQUFFO0lBQ25DLE9BQU8sRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3JCLGNBQWMsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQzVCLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0lBQ3pCLFdBQVcsRUFBRSxhQUFLLENBQUMsSUFBSSxFQUFFO0NBQzFCLENBQUMsQ0FBQSJ9