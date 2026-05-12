import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const forceHttpsProtocol = (req: any, res: any, next: any) => {
  if (process.env.NODE_ENV === "production") {
    req.headers["x-forwarded-proto"] = "https";
  }
  next();
}

// 🌟 CORS AGRESIF: Menimpa aturan Medusa bawaan
const corsMiddleware = (req: any, res: any, next: any) => {
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

export default defineMiddlewares({
  routes: [
    // ⭐ 1. SEMUA UPLOAD PAKAI ARRAY "files" (Disamakan dengan logic MYOB)
    { matcher: "/admin/myob/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files") as any] },
    { matcher: "/admin/hero/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files") as any] },
    { matcher: "/admin/reviews/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files") as any] },
    { matcher: "/admin/store-location/upload", method: "POST", middlewares: [corsMiddleware, upload.array("files") as any] },

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
})