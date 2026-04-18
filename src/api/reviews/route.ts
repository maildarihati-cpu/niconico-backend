import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // Mengambil service reviews
  const reviewService = req.scope.resolve("reviews")

  // Mengambil data reviews dari database
  const reviews = await reviewService.listReviews(
    {}, 
    { 
      order: { created_at: "DESC" },
      take: 10 
    }
  )

  // Langsung kembalikan JSON. 
  // Biarkan middleware.ts yang mengurus izin akses (CORS) secara otomatis.
  return res.json({ reviews })
}