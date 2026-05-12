import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // Pakai as any biar terbebas dari jeratan ts error
  const heroService = req.scope.resolve("hero") as any
  
  const { category } = req.query as { category?: string }
  const filter = category ? { category } : { category: "hero-banner" }

  try {
    const data = await heroService.listHeroes(filter, {
      order: { position: "ASC" } 
    })
    
    // Ambil setting sekalian (buat Global Title)
    const settings = await heroService.listHeroSettings()
    const currentSetting = settings && settings.length > 0 ? settings[0] : null

    return res.status(200).json({ heroes: data, setting: currentSetting })
  } catch (error) {
    return res.status(500).json({ message: "Gagal menarik data hero", error: String(error) })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const heroService = req.scope.resolve("hero") as any
  const payload = req.body as Record<string, any> // OBAT TYPESCRIPT
  
  try {
    let result;
    if (payload.id) {
      // --- PROSES EDIT ---
      result = await heroService.updateHeroes(payload)
    } else {
      // --- PROSES TAMBAH BARU ---
      const category = payload.category || "hero-banner"
      const existing = await heroService.listHeroes({ category })
      
      result = await heroService.createHeroes({
        ...payload,
        category: category,
        position: existing.length
      })
    }

    return res.status(200).json({ success: true, hero: result })
  } catch (error) {
    console.error("[Hero Save Error]", error)
    return res.status(500).json({ message: "Gagal simpan hero", error: String(error) })
  }
}