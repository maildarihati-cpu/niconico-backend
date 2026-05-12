import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const heroService = req.scope.resolve("hero") as any;
    const payload = req.body as { title: string };
    
    const listMethod = typeof heroService.listHeroSettings === 'function' ? 'listHeroSettings' : 'listHero_settings';
    const updateMethod = typeof heroService.updateHeroSettings === 'function' ? 'updateHeroSettings' : 'updateHero_settings';
    const createMethod = typeof heroService.createHeroSettings === 'function' ? 'createHeroSettings' : 'createHero_settings';

    const existing = await heroService[listMethod]();

    if (existing && existing.length > 0) {
      await heroService[updateMethod]({ id: existing[0].id, global_title: payload.title });
    } else {
      await heroService[createMethod]({ global_title: payload.title });
    }

    return res.status(200).json({ success: true })
  } catch (error) {
    console.error("Hero Settings Error:", error);
    return res.status(500).json({ message: "Gagal simpan title" })
  }
}