import { loadEnv, defineConfig } from '@medusajs/framework/utils'

// Memuat file .env Anda
loadEnv(process.env.NODE_ENV || 'development', process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    // TAMBAHKAN ATAU UBAH BAGIAN INI
    http: {
      storeCors: "http://localhost:8000,http://localhost:3000", 
      adminCors: "http://localhost:7000,http://localhost:9000",
      authCors: "http://localhost:8000,http://localhost:3000",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },

  // 2. Registrasi Modules (HARUS BERUPA OBJECT DI MEDUSA V2)
  modules: {
    // --- MODULE A: Cloudflare R2 (S3) ---
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

    // --- MODULE B: Custom Module 'Make Your Own Brand' Kita ---
    reviews: {
        resolve: "./src/modules/reviews",
      },
    myob: {
      resolve: "./src/modules/myob",
    },
    hero: {
    resolve: "./src/modules/hero",
  },
  
  }
})