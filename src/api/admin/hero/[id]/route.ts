import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import HeroService from "../../../../modules/hero/service"

// FUNGSI UNTUK HAPUS GAMBAR TERTENTU
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params
  const heroService = req.scope.resolve<HeroService>("hero")
  
  await heroService.deleteHeroes(id)
  
  return res.status(200).json({
    id,
    object: "hero",
    deleted: true,
  })
}

// FUNGSI UNTUK UPDATE DATA BERDASARKAN ID (Jika perlu)
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const { id } = req.params
  const heroService = req.scope.resolve<HeroService>("hero")
  const payload = req.body as any

  const result = await heroService.updateHeroes({
    id,
    ...payload
  })

  return res.status(200).json({ hero: result })
}