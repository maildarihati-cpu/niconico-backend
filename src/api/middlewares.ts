import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

// Kita buat resep CORS-nya di luar biar rapi
const corsMiddleware = (req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-publishable-api-key");
  
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
})