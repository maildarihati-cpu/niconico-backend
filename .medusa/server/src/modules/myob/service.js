"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
const myob_1 = require("./models/myob");
const myob_gallery_1 = require("./models/myob-gallery"); // Tambahkan ini
class MyobService extends (0, utils_1.MedusaService)({
    Myob: myob_1.Myob,
    MyobGallery: myob_gallery_1.MyobGallery // Tambahkan ini juga
}) {
}
exports.default = MyobService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzL215b2Ivc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUF5RDtBQUN6RCx3Q0FBb0M7QUFDcEMsd0RBQW1ELENBQUMsZ0JBQWdCO0FBRXBFLE1BQU0sV0FBWSxTQUFRLElBQUEscUJBQWEsRUFBQztJQUN0QyxJQUFJLEVBQUosV0FBSTtJQUNKLFdBQVcsRUFBWCwwQkFBVyxDQUFDLHFCQUFxQjtDQUNsQyxDQUFDO0NBQUc7QUFFTCxrQkFBZSxXQUFXLENBQUEifQ==