import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const heroService = req.scope.resolve("hero") as any;
    const category = (req.query.category as string) || "hero-banner";

    // Pastikan pakai metode listHeroes sesuai struktur model bos
    const rawData = await heroService.listHeroes({ category });
    
    // Urutkan manual (sangat aman, gak akan bikin crash database)
    const sortedData = (rawData || []).sort((a: any, b: any) => (a.position || 0) - (b.position || 0));

    // Coba tarik setting, kalau kosong ya diabaikan, gak bikin error
    let currentSetting = null;
    try {
      const settings = await heroService.listHeroSettings();
      currentSetting = settings && settings.length > 0 ? settings[0] : null;
    } catch (e) {
      console.log("Setting belum ada, abaikan.");
    }

    return res.status(200).json({ heroes: sortedData, setting: currentSetting })
  } catch (error: any) {
    console.error("GET Hero Error:", error);
    return res.status(500).json({ heroes: [], message: error.message })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const heroService = req.scope.resolve("hero") as any;
    const payload = req.body as Record<string, any>;
    
    if (payload.id) {
       const updated = await heroService.updateHeroes(payload);
       return res.status(200).json({ success: true, hero: updated });
    } else {
       const category = payload.category || "hero-banner";
       const existing = await heroService.listHeroes({ category });
       
       const created = await heroService.createHeroes({
         ...payload,
         category: category,
         position: existing ? existing.length : 0
       });
       return res.status(200).json({ success: true, hero: created });
    }
  } catch (error: any) {
    console.error("POST Hero Error:", error);
    return res.status(500).json({ message: error.message })
  }
}