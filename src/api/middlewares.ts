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
  const origin = req.headers.origin || ""; // Kosongkan dulu, jangan langsung kasih "*"
  
  // Perbaikan CORS Credentials: Tidak boleh "*" kalau Credentials "true"
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    // Kalau origin ga kebaca (biasanya hit dari server-to-server), fallback ke lokal/domain
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:9000"); 
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD");
  
  // Sudah termasuk x-medusa-locale agar Admin live tidak error 401
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key, Authorization, x-medusa-access-token, Accept, x-medusa-locale");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");
  
  // Handle preflight OPTIONS request
  if (req.method === "OPTIONS") {
    console.log(`[CORS] Preflight OPTIONS untuk ${req.path}`)
    return res.status(200).end();
  }
  next();
};

export default defineMiddlewares({
  routes: [
    // ⭐ UPLOAD MIDDLEWARE HARUS DIDAHULUKAN (SPESIFIK DULU BARU GENERAL)
    {
      matcher: "/admin/myob/upload",
      method: "POST",
      middlewares: [upload.array("files") as any],
    },
    {
      matcher: "/admin/myob/upload",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    {
      matcher: "/admin/myob/media",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    // TAMBAHAN: Biar waktu klik tombol 'Simpan Perubahan' (POST /admin/myob) ga diblokir CORS preflight
    {
      matcher: "/admin/myob",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    // RUTE HERO BOS YANG SEMPAT HILANG (SUDAH KEMBALI)
    {
      matcher: "/admin/hero/upload",
      method: "POST",
      middlewares: [upload.single("file") as any],
    },
    {
      matcher: "/admin/hero/upload",
      method: "OPTIONS",
      middlewares: [corsMiddleware],
    },
    {
      // 🚀 Terapkan CORS & HTTPS ke semua rute Medusa (GENERAL PALING AKHIR)
      matcher: "/*",
      middlewares: [forceHttpsProtocol, corsMiddleware],
    },
  ],
})