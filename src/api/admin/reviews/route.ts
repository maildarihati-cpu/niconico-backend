import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")
  // Ambil semua data review, urutkan dari yang terbaru
  const reviews = await reviewService.listReviews(
    {}, 
    { order: { created_at: "DESC" } }
  )
  return res.json({ reviews })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")
  
  // TAMBAHKAN 'as any' DI SINI BOS
  const review = await reviewService.createReviews(req.body as any)
  
  return res.json({ review })
}

// --- FUNGSI UPDATE (EDIT) ---
export const PUT = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")

  // FIX: Masukkan ID ke dalam satu objek bersama body-nya
  const review = await reviewService.updateReviews({
    id: req.params.id,
    ...(req.body as any)
  })

  return res.json({ review })
}

// --- FUNGSI DELETE (HAPUS) ---
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const reviewService = req.scope.resolve("reviews")
  await reviewService.deleteReviews(req.params.id)
  return res.json({ success: true })
}