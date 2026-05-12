import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const DELETE = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const { id } = req.params;
    const heroService = req.scope.resolve("hero") as any;
    
    const deleteMethod = typeof heroService.deleteHeroes === 'function' ? 'deleteHeroes' : 'deleteHeros';
    await heroService[deleteMethod](id);
    
    return res.status(200).json({ success: true })
  } catch (error) {
    return res.status(500).json({ message: "Gagal menghapus" })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const { id } = req.params;
    const heroService = req.scope.resolve("hero") as any;
    const payload = req.body as Record<string, any>;
    
    const updateMethod = typeof heroService.updateHeroes === 'function' ? 'updateHeroes' : 'updateHeros';
    
    const result = await heroService[updateMethod]({ id, ...payload });
    return res.status(200).json({ success: true, hero: result })
  } catch (error) {
    return res.status(500).json({ message: "Gagal update" })
  }
}

export const OPTIONS = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  return res.status(200).end();
}