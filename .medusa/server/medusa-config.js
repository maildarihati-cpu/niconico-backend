"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
// Memuat file .env
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
exports.default = (0, utils_1.defineConfig)({
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsbUJBQW1CO0FBQ25CLElBQUEsZUFBTyxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUU3RCxrQkFBZSxJQUFBLG9CQUFZLEVBQUM7SUFDMUIsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtRQUNyQyxJQUFJLEVBQUU7WUFDSiwyREFBMkQ7WUFDM0QsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLDRFQUE0RTtZQUNqSCxTQUFTLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLElBQUksOEVBQThFO1lBQ25ILFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsSUFBSSw4RUFBOEU7WUFDakgsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLGFBQWE7WUFDbEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLGFBQWE7U0FDekQ7S0FDRjtJQUVELDRCQUE0QjtJQUM1QixLQUFLLEVBQUU7UUFDTCxPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsS0FBSyxNQUFNO1FBRXBELGtGQUFrRjtRQUNsRixVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsSUFBSSx1QkFBdUI7UUFDckUsb0VBQW9FO1FBQ3BFLElBQUksRUFBRSxHQUFHO0tBQ1Y7SUFFRCw2QkFBNkI7SUFDN0IsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSwwQkFBMEI7d0JBQ25DLEVBQUUsRUFBRSxJQUFJO3dCQUNSLE9BQU8sRUFBRTs0QkFDUCxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNOzRCQUM1QixhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7NEJBQzNDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9COzRCQUNuRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTOzRCQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTOzRCQUM3QixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXOzRCQUNqQyx3QkFBd0IsRUFBRTtnQ0FDeEIsY0FBYyxFQUFFLElBQUk7NkJBQ3JCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUNELE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRTtRQUM3QyxJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUUsb0JBQW9CLEVBQUU7UUFDdkMsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFO1FBQ3ZDLGFBQWEsRUFBRSxFQUFFLE9BQU8sRUFBRSw4QkFBOEIsRUFBRTtLQUMzRDtDQUNGLENBQUMsQ0FBQSJ9