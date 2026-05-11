import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// Memuat file .env
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      // 🌟 JURUS SAKTI CORS: Hardcode langsung alamat domainnya
      // Masukkan versi dengan dan tanpa garis miring (/)
      storeCors: process.env.STORE_CORS || "https://dev.niconicoresort.com,http://localhost:8000,http://localhost:3000", 
      
      adminCors: "https://admin.niconicoresort.com,https://admin.niconicoresort.com/,http://localhost:7000,http://localhost:9000",
      
      authCors: "https://admin.niconicoresort.com,https://admin.niconicoresort.com/,http://localhost:8000,http://localhost:3000",
      
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  // --- KONFIGURASI ADMIN ---
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    
    // 🌟 Pastikan mengarah ke URL Railway kamu (tanpa garis miring di akhir)
    backendUrl: process.env.MEDUSA_BACKEND_URL || "https://niconico-backend-production.up.railway.app",
    
    // 🌟 OBAT BLANK PUTIH: Wajib "/" kalau pakai subdomain sendiri di Vercel
    path: "/", 
  },

  // --- REGISTRASI MODULES ---
  modules: {
    file: {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-s3",
            id: "s3",
            options: {
              file_url: process.env.S3_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
    reviews: { resolve: "./src/modules/reviews" },
    myob: { resolve: "./src/modules/myob" },
    hero: { resolve: "./src/modules/hero" },
    storeLocation: { resolve: "./src/modules/store-location" },
  }
})