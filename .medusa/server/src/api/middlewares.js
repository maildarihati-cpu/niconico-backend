"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@medusajs/framework/http");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const forceHttpsProtocol = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        req.headers["x-forwarded-proto"] = "https";
    }
    next();
};
// 🌟 CORS AGRESIF: Menimpa aturan Medusa bawaan
const corsMiddleware = (req, res, next) => {
    // Tangkap origin asli, pastikan tidak ada garis miring (/) di belakang
    const origin = req.headers.origin || "https://admin.niconicoresort.com";
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key, Authorization, x-medusa-access-token, Accept, x-medusa-locale, X-Requested-With");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "86400");
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    next();
};
exports.default = (0, http_1.defineMiddlewares)({
    routes: [
        // ⭐ 1. SEMUA UPLOAD PAKAI ARRAY "files" (Disamakan dengan logic MYOB)
        { matcher: "/admin/myob/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files")] },
        { matcher: "/admin/hero/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files")] },
        { matcher: "/admin/reviews/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files")] },
        { matcher: "/admin/store-location/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files")] },
        // ⭐ 2. OPTIONS PREFLIGHT EKSPLISIT (Anti Error 404 & CORS)
        { matcher: "/admin/myob", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/myob/*", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/hero", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/hero/*", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/reviews", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/reviews/*", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/store-location", method: "OPTIONS", middlewares: [corsMiddleware] },
        { matcher: "/admin/store-location/*", method: "OPTIONS", middlewares: [corsMiddleware] },
        // ⭐ 3. GENERAL ROUTES
        {
            matcher: "/*",
            middlewares: [forceHttpsProtocol, corsMiddleware],
        },
    ],
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWlkZGxld2FyZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYXBpL21pZGRsZXdhcmVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsbURBQTREO0FBQzVELG9EQUEyQjtBQUUzQixNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxPQUFPLEVBQUUsZ0JBQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFFMUQsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7SUFDM0QsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUUsQ0FBQztRQUMxQyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQzdDLENBQUM7SUFDRCxJQUFJLEVBQUUsQ0FBQztBQUNULENBQUMsQ0FBQTtBQUVELGdEQUFnRDtBQUNoRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFRLEVBQUUsSUFBUyxFQUFFLEVBQUU7SUFDdkQsdUVBQXVFO0lBQ3ZFLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxJQUFJLGtDQUFrQyxDQUFDO0lBRXhFLEdBQUcsQ0FBQyxTQUFTLENBQUMsNkJBQTZCLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDckQsR0FBRyxDQUFDLFNBQVMsQ0FBQyw4QkFBOEIsRUFBRSw4Q0FBOEMsQ0FBQyxDQUFDO0lBQzlGLEdBQUcsQ0FBQyxTQUFTLENBQUMsOEJBQThCLEVBQUUsc0hBQXNILENBQUMsQ0FBQztJQUN0SyxHQUFHLENBQUMsU0FBUyxDQUFDLGtDQUFrQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFELEdBQUcsQ0FBQyxTQUFTLENBQUMsd0JBQXdCLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBRSxDQUFDO1FBQzdCLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBQ0QsSUFBSSxFQUFFLENBQUM7QUFDVCxDQUFDLENBQUM7QUFFRixrQkFBZSxJQUFBLHdCQUFpQixFQUFDO0lBQy9CLE1BQU0sRUFBRTtRQUNOLHNFQUFzRTtRQUN0RSxFQUFFLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBUSxDQUFDLEVBQUU7UUFDOUcsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsQ0FBQyxjQUFjLEVBQUUsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQVEsQ0FBQyxFQUFFO1FBQzlHLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFRLENBQUMsRUFBRTtRQUNqSCxFQUFFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBUSxDQUFDLEVBQUU7UUFFeEgsMkRBQTJEO1FBQzNELEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzVFLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBRTlFLEVBQUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQzVFLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBRTlFLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDL0UsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUVqRixFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3RGLEVBQUUsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFFeEYsc0JBQXNCO1FBQ3RCO1lBQ0UsT0FBTyxFQUFFLElBQUk7WUFDYixXQUFXLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxjQUFjLENBQUM7U0FDbEQ7S0FDRjtDQUNGLENBQUMsQ0FBQSJ9