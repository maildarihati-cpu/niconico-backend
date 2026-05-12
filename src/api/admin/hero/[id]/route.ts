import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import HeroService from "../../../../modules/hero/service"

// FUNGSI UNTUK HAPUS GAMBAR TERTENTU
export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  
  try {
    const { id } = req.params
    // Tambahan 'as any' di ujung untuk bypass TypeScript auto-generate method
    const heroService = req.scope.resolve<HeroService>("hero") as any
    
    await heroService.deleteHeroes(id)
    
    return res.status(200).json({
      id,
      object: "hero",
      deleted: true,
    })
  } catch (error) {
    console.error("[Hero Delete Error]", error)
    return res.status(500).json({ message: "Gagal menghapus slide hero", error: String(error) })
  }
}

// FUNGSI UNTUK UPDATE DATA BERDASARKAN ID (Jika perlu)
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  
  try {
    const { id } = req.params
    const heroService = req.scope.resolve<HeroService>("hero") as any
    
    // 🌟 PERBAIKAN TS: Ubah 'as any' jadi 'as Record<string, any>' agar ...payload aman
    const payload = req.body as Record<string, any>

    const result = await heroService.updateHeroes({
      id,
      ...payload
    })

    return res.status(200).json({ hero: result })
  } catch (error) {
    console.error("[Hero Update Error]", error)
    return res.status(500).json({ message: "Gagal update slide hero", error: String(error) })
  }
}

// 🌟 TAMBAHAN WAJIB VERCEL: Tangkap preflight CORS khusus untuk rute dinamis [id]
export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  res.setHeader("Access-Control-Allow-Credentials", "true")
  return res.status(200).end()
}