"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@medusajs/framework/utils");
// Memuat file .env Anda
(0, utils_1.loadEnv)(process.env.NODE_ENV || 'development', process.cwd());
exports.default = (0, utils_1.defineConfig)({
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
        storeLocation: {
            resolve: "./src/modules/store-location",
        },
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkdXNhLWNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL21lZHVzYS1jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxxREFBaUU7QUFFakUsd0JBQXdCO0FBQ3hCLElBQUEsZUFBTyxFQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLGFBQWEsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUU3RCxrQkFBZSxJQUFBLG9CQUFZLEVBQUM7SUFDMUIsYUFBYSxFQUFFO1FBQ2IsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWTtRQUNyQyxpQ0FBaUM7UUFDbEMsSUFBSSxFQUFFO1lBQ0gsU0FBUyxFQUFFLDZDQUE2QztZQUN4RCxTQUFTLEVBQUUsNkNBQTZDO1lBQ3hELFFBQVEsRUFBRSw2Q0FBNkM7WUFDdkQsU0FBUyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLGFBQWE7WUFDbEQsWUFBWSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBYSxJQUFJLGFBQWE7U0FDekQ7S0FDRjtJQUVELDJEQUEyRDtJQUMzRCxPQUFPLEVBQUU7UUFDUCx1Q0FBdUM7UUFDdkMsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLHVCQUF1QjtZQUNoQyxPQUFPLEVBQUU7Z0JBQ1AsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSwwQkFBMEI7d0JBQ25DLEVBQUUsRUFBRSxJQUFJO3dCQUNSLE9BQU8sRUFBRTs0QkFDUCxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNOzRCQUM1QixhQUFhLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7NEJBQzNDLGlCQUFpQixFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9COzRCQUNuRCxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTOzRCQUM3QixNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTOzRCQUM3QixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXOzRCQUNqQyx3QkFBd0IsRUFBRTtnQ0FDeEIsY0FBYyxFQUFFLElBQUk7NkJBQ3JCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7U0FDRjtRQUVELDZEQUE2RDtRQUM3RCxPQUFPLEVBQUU7WUFDUCxPQUFPLEVBQUUsdUJBQXVCO1NBQ2pDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osT0FBTyxFQUFFLG9CQUFvQjtTQUM5QjtRQUNELElBQUksRUFBRTtZQUNKLE9BQU8sRUFBRSxvQkFBb0I7U0FDOUI7UUFDRCxhQUFhLEVBQUU7WUFDYixPQUFPLEVBQUUsOEJBQThCO1NBQ3hDO0tBR0Y7Q0FDRixDQUFDLENBQUEifQ==