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
  const origin = req.headers.origin || ""; 
  
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); 
  }
  
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
    // ⭐ 1. UPLOAD MIDDLEWARES (HARUS POST)
    // Pastikan corsMiddleware masuk ke dalam array middlewares SEBELUM multer
    {
      matcher: "/admin/myob/upload",
      method: "POST",
      middlewares: [corsMiddleware, upload.array("files") as any],
    },
    {
      matcher: "/admin/hero/upload",
      method: "POST",
      middlewares: [corsMiddleware, upload.single("file") as any],
    },
    {
      matcher: "/admin/reviews/upload",
      method: "POST",
      middlewares: [corsMiddleware, upload.single("file") as any],
    },
    {
      matcher: "/admin/store-location/upload",
      method: "POST",
      middlewares: [corsMiddleware, upload.single("file") as any],
    },

    // ⭐ 2. OPTIONS PREFLIGHT (Biar Vercel gak blokir pas klik Save/Delete)
    // Pakai wildcard (*) biar meng-cover base route dan [id] route sekaligus
    {
      matcher: "/admin/myob*",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    {
      matcher: "/admin/hero*",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    {
      matcher: "/admin/reviews*",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    {
      matcher: "/admin/store-location*",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },

    // ⭐ 3. GENERAL ROUTES (Sapu Jagat paling akhir untuk method lain)
    {
      matcher: "/*",
      middlewares: [forceHttpsProtocol, corsMiddleware],
    },
  ],
})