import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const heroService = req.scope.resolve("hero") as any;
    const category = (req.query.category as string) || "hero-banner";

    // 🌟 DETEKSI OTOMATIS: Biar server gak crash karena beda 1 huruf
    const listMethod = typeof heroService.listHeroes === 'function' ? 'listHeroes' : 'listHeros';
    const settingsMethod = typeof heroService.listHeroSettings === 'function' ? 'listHeroSettings' : 'listHero_settings';

    // Tarik data
    const rawData = await heroService[listMethod]({ category });
    
    // Urutkan manual biar gak bikin error database
    const sortedData = (rawData || []).sort((a: any, b: any) => (a.position || 0) - (b.position || 0));

    // Tarik setting global title
    let currentSetting = null;
    if (typeof heroService[settingsMethod] === 'function') {
      const settings = await heroService[settingsMethod]();
      currentSetting = settings && settings.length > 0 ? settings[0] : null;
    }

    return res.status(200).json({ heroes: sortedData, setting: currentSetting })
  } catch (error) {
    console.error("GET Hero Error:", error);
    return res.status(500).json({ heroes: [], message: "Gagal menarik data" })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const heroService = req.scope.resolve("hero") as any;
    const payload = req.body as Record<string, any>;
    
    const category = payload.category || "hero-banner";
    const listMethod = typeof heroService.listHeroes === 'function' ? 'listHeroes' : 'listHeros';
    const createMethod = typeof heroService.createHeroes === 'function' ? 'createHeroes' : 'createHeros';

    const existing = await heroService[listMethod]({ category });
    
    const result = await heroService[createMethod]({
      ...payload,
      category: category,
      position: existing ? existing.length : 0
    });

    return res.status(200).json({ success: true, hero: result })
  } catch (error) {
    console.error("POST Hero Error:", error);
    return res.status(500).json({ message: "Gagal simpan hero" })
  }
}