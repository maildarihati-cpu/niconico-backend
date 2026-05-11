import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

// 🌟 OBAT 1: Paksa HTTPS HANYA di Live (Railway). Kalau di Localhost biarkan normal!
const forceHttpsProtocol = (req: any, res: any, next: any) => {
  if (process.env.NODE_ENV === "production") {
    req.headers["x-forwarded-proto"] = "https";
  }
  next();
}

// 🌟 OBAT 2: CORS Sapu Jagat (Berlaku di Local & Live)
const corsMiddleware = (req: any, res: any, next: any) => {
  const origin = req.headers.origin || "*";
  
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  
  // Sudah termasuk x-medusa-locale agar Admin live tidak error 401
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key, Authorization, x-medusa-access-token, Accept, x-medusa-locale");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

export default defineMiddlewares({
  routes: [
    {
      // 🚀 Terapkan ke semua rute Medusa
      matcher: "/*",
      middlewares: [forceHttpsProtocol, corsMiddleware],
    },
    {
      matcher: "/admin/myob/upload",
      method: "POST",
      middlewares: [upload.array("files") as any],
    },
    {
      matcher: "/admin/hero/upload",
      method: "POST",
      middlewares: [upload.single("file") as any],
    },
  ],
})