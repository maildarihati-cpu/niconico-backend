import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

// Resep CORS Sapu Jagat (Otomatis nerima tamu dari Vercel maupun Localhost tanpa ribet ngecek .env)
const corsMiddleware = (req: any, res: any, next: any) => {
  // Ambil nama asal yang ngetok pintu, kalau kosong kasih bintang (*)
  const origin = req.headers.origin || "*";
  
  // Kasih stempel izin langsung pakai nama si tamu
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
};

export default defineMiddlewares({
  routes: [
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