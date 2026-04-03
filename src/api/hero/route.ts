
import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const heroService = req.scope.resolve("hero")

  // FIX: Jangan biarkan kosong! Kita harus minta yang stikernya 'hero-banner' saja.
  const data = await heroService.listHeroes(
    { 
      category: "hero-banner" // <--- INI KUNCINYA BOS!
    }, 
    {
      order: { position: "ASC" } 
    }
  )

  return res.status(200).json({ heroes: data })
}