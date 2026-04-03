import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// --- FUNGSI UPDATE (PUT) ---
export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")
  
  // ID diambil dari nama folder [id]
  const { id } = req.params

  const review = await reviewService.updateReviews({
    id,
    ...(req.body as any)
  })

  return res.json({ review })
}

// --- FUNGSI DELETE ---
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")
  
  await reviewService.deleteReviews(req.params.id)
  
  return res.json({ success: true })
}