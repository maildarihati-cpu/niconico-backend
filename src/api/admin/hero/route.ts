import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import HeroService from "../../../modules/hero/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const heroService = req.scope.resolve<HeroService>("hero")
  
  // 1. Ambil kategori dari query parameter (?category=reviews)
  const { category } = req.query as { category?: string }

  // 2. Tentukan filter: 
  // Jika ada kategori di URL, pakai itu. Jika tidak ada, default ke 'hero-banner'
  const filter = category ? { category } : { category: "hero-banner" }

  const data = await heroService.listHeroes(filter, {
    // Tetap pakai urutan posisi agar rapi
    order: { position: "ASC" } 
  })

  return res.status(200).json({ heroes: data })
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const heroService = req.scope.resolve<HeroService>("hero")
  
  const payload = req.body as any 

  let result;
  if (payload.id) {
    // --- PROSES EDIT ---
    // Kita pastikan ID dikirim dalam objek sesuai standar Medusa v2
    result = await heroService.updateHeroes(payload)
  } else {
    // --- PROSES TAMBAH BARU ---
    // Ambil data yang sudah ada untuk menentukan posisi terakhir
    const existing = await heroService.listHeroes({ 
      category: payload.category || "hero-banner" 
    })
    
    // Set posisi otomatis di paling akhir
    payload.position = existing.length 
    
    // Pastikan kategori tersimpan (kalau kosong, kasih default 'hero-banner')
    if (!payload.category) {
      payload.category = "hero-banner"
    }
    
    result = await heroService.createHeroes(payload)
  }

  return res.status(200).json({ success: true, hero: result })
}