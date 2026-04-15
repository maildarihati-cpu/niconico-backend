"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@medusajs/framework/http");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
// Kita buat resep CORS-nya di luar biar rapi
const corsMiddleware = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
};
exports.default = (0, http_1.defineMiddlewares)({
    routes: [
        {
            // 1. Izin CORS untuk MYOB
            matcher: "/myob*",
            middlewares: [corsMiddleware],
        },
        {
            // 2. Izin CORS untuk Hero (Jalur VIP Baru)
            matcher: "/hero*",
            middlewares: [corsMiddleware],
        },
        {
            // 3. UPLOAD MYOB
            matcher: "/admin/myob/upload",
            method: "POST",
            middlewares: [upload.array("files")],
        },
        {
            // 4. UPLOAD HERO
            matcher: "/admin/hero/upload",
            method: "POST",
            middlewares: [upload.single("file")],
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTREO0FBQzVELG9EQUEyQjtBQUUzQixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFFMUQsNkNBQTZDO0FBQzdDLE1BQU0sY0FBYyxHQUFHLENBQUMsR0FBUSxFQUFFLEdBQVEsRUFBRSxJQUFTLEVBQUUsRUFBRTtJQUN2RCxHQUFHLENBQUMsU0FBUyxDQUFDLDZCQUE2QixFQUFFLHVCQUF1QixDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO0lBQzVFLEdBQUcsQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUscUNBQXFDLENBQUMsQ0FBQztJQUVyRixJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUFFLENBQUM7UUFDN0IsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQztBQUVGLGtCQUFlLElBQUEsd0JBQWlCLEVBQUM7SUFDL0IsTUFBTSxFQUFFO1FBQ047WUFDRSwwQkFBMEI7WUFDMUIsT0FBTyxFQUFFLFFBQVE7WUFDakIsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQzlCO1FBQ0Q7WUFDRSwyQ0FBMkM7WUFDM0MsT0FBTyxFQUFFLFFBQVE7WUFDakIsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQzlCO1FBQ0Q7WUFDRSxpQkFBaUI7WUFDakIsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixNQUFNLEVBQUUsTUFBTTtZQUNkLFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDckM7UUFDRDtZQUNFLGlCQUFpQjtZQUNqQixPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLE1BQU0sRUFBRSxNQUFNO1lBQ2QsV0FBVyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNyQztLQUNGO0NBQ0YsQ0FBQyxDQUFBIn0=