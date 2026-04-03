import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")

  const reviews = await reviewService.listReviews(
    {}, 
    { 
      order: { created_at: "DESC" },
      take: 10 
    }
  )

  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  return res.json({ reviews })
}

// Tambahkan rute OPTIONS untuk "pre-flight request" browser
export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000")
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  return res.status(200).send()
}