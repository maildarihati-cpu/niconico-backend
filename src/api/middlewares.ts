import { defineMiddlewares } from "@medusajs/framework/http"
import multer from "multer"

const upload = multer({ storage: multer.memoryStorage() })

// 🌟 OBAT 1: Paksa server ngaku pakai HTTPS
const forceHttpsProtocol = (req: any, res: any, next: any) => {
  req.headers["x-forwarded-proto"] = "https";
  next();
}

// 🌟 OBAT 2: CORS Sapu Jagat (Sudah ditambah x-medusa-locale)
const corsMiddleware = (req: any, res: any, next: any) => {
  const origin = req.headers.origin || "*";
  
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
  
  // 👇 INI YANG BIKIN ERROR TADI SAY, SEKARANG UDAH DITAMBAHIN x-medusa-locale 👇
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
      // 🚀 HAJAR SEMUA RUTE
      matcher: "/*",
      middlewares: [forceHttpsProtocol, corsMiddleware],
    },
    {
      matcher: "/myob*", 
      middlewares: [corsMiddleware],
    },
    {
      matcher: "/hero*", 
      middlewares: [corsMiddleware],
    },
    {
      matcher: "/reviews*", 
      middlewares: [corsMiddleware],
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