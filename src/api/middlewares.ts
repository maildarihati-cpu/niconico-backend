import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

// 🌟 OBAT 1: Paksa server ngaku pakai HTTPS (Biar Cookie KTP nggak ditolak)
const forceHttpsProtocol = (req: any, res: any, next: any) => {
  req.headers["x-forwarded-proto"] = "https";
  next();
}

// 🌟 OBAT 2: CORS Sapu Jagat (Brute Force Semua Tamu Diizinkan)
const corsMiddleware = (req: any, res: any, next: any) => {
  const origin = req.headers.origin || "*";
  
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key, Authorization, x-medusa-access-token, Accept");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  // Kalau browser cuma nanya izin (OPTIONS preflight), langsung tembak OK!
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

export default defineMiddlewares({
  routes: [
    {
      // 🚀 HAJAR SEMUA RUTE (Termasuk rute bawaan Medusa yang rewel)
      matcher: "/*",
      middlewares: [forceHttpsProtocol, corsMiddleware],
    },
    {
      // 1. Izin CORS untuk MYOB
      matcher: "/myob*", 
      middlewares: [corsMiddleware],
    },
    {
      // 2. Izin CORS untuk Hero 
      matcher: "/hero*", 
      middlewares: [corsMiddleware],
    },
    {
      // 3. Izin CORS untuk Reviews
      matcher: "/reviews*", 
      middlewares: [corsMiddleware],
    },
    {
      // 4. UPLOAD MYOB
      matcher: "/admin/myob/upload",
      method: "POST",
      middlewares: [upload.array("files") as any],
    },
    {
      // 5. UPLOAD HERO
      matcher: "/admin/hero/upload",
      method: "POST",
      middlewares: [upload.single("file") as any],
    },
  ],
})