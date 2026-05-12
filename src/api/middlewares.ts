import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

const forceHttpsProtocol = (req: any, res: any, next: any) => {
  if (process.env.NODE_ENV === "production") {
    req.headers["x-forwarded-proto"] = "https";
  }
  next();
}

const corsMiddleware = (req: any, res: any, next: any) => {
  const origin = req.headers.origin || req.headers.host || "https://admin.niconicoresort.com"; 
  
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key, Authorization, x-medusa-access-token, Accept, x-medusa-locale");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

export default defineMiddlewares({
  routes: [
    // ⭐ 1. SEMUA UPLOAD PAKAI ARRAY "files" (Anti Error 400 Bad Request)
    {
      matcher: "/admin/myob/upload",
      method: "POST",
      middlewares: [corsMiddleware, upload.array("files") as any],
    },
    {
      matcher: "/admin/hero/upload",
      method: "POST",
      middlewares: [corsMiddleware, upload.array("files") as any], // 🌟 DISAMAKAN DENGAN MYOB
    },

    // ⭐ 2. OPTIONS PREFLIGHT EKSPLISIT (Anti Error 404 Not Found CORS)
    // Medusa lebih akurat membaca path spesifik daripada wildcard bintang (*)
    { matcher: "/admin/myob", method: "OPTIONS", middlewares: [corsMiddleware] },
    { matcher: "/admin/myob/*", method: "OPTIONS", middlewares: [corsMiddleware] },
    { matcher: "/admin/hero", method: "OPTIONS", middlewares: [corsMiddleware] },
    { matcher: "/admin/hero/*", method: "OPTIONS", middlewares: [corsMiddleware] },

    // ⭐ 3. GENERAL ROUTES
    {
      matcher: "/*",
      middlewares: [forceHttpsProtocol, corsMiddleware],
    },
  ],
})