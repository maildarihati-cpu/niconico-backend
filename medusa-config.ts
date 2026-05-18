import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'

// Memuat file .env
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      // 🌟 URL dibersihkan dari garis miring (/) di bagian akhir
      storeCors: process.env.STORE_CORS || "https://dev.niconicoresort.com,http://localhost:8000,http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "https://admin.niconicoresort.com,http://localhost:7000,http://localhost:9000",
      authCors: process.env.AUTH_CORS || "https://admin.niconicoresort.com,http://localhost:8000,http://localhost:3000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  // --- KONFIGURASI ADMIN ---
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    
    // Default fallback ke localhost kalau di laptop, ambil dari .env kalau di Railway
    backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
    // 🌟 WAJIB /app: Biar rute API Frontend gak ketimpa sama HTML Admin
    path: "/", 
  },

  // --- REGISTRASI MODULES ---
  modules: {
    // 🌟 TAMBAHAN MODULE PAYMENT (XENDIT)
    [Modules.PAYMENT]: {
      resolve: "@medusajs/payment",
      options: {
        providers: [
          {
            resolve: "./src/modules/xendit", // Path ke folder modul custom kita
            id: "xendit", // Identifier resmi payment gateway
          },
        ],
      },
    },

    // 🌟 TAMBAHAN MODULE AUTH (EMAIL & GOOGLE)
    [Modules.AUTH]: {
      resolve: "@medusajs/auth",
      options: {
        providers: [
          // Provider bawaan buat login pakai Email & Password biasa
          {
            resolve: "@medusajs/auth-emailpass",
            id: "emailpass",
          },
          // Provider baru buat Sign In with Google
          {
            resolve: "@medusajs/auth-google",
            id: "google",
            options: {
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_CLIENT_SECRET,
              callbackUrl: process.env.GOOGLE_CALLBACK_URL,
              succesRedirect: process.env.STOREFRONT_URL || "https://dev.niconicoresort.com",
              successRedirectUrl: process.env.STOREFRONT_URL || "https://dev.niconicoresort.com",
            },
          },
        ],
      },
    },
    
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