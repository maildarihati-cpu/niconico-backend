import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const fileService = req.scope.resolve(Modules.FILE) as any;
    const heroService = req.scope.resolve("hero") as any;
    
    const file = (req as any).file;
    const category = (req.body as any)?.category || "hero-banner";

    if (!file) return res.status(400).json({ message: "File kosong" });

    // 🌟 PERBAIKAN: createFiles selalu format Array di v2
    const uploadedFiles = await fileService.createFiles([{
      filename: file.originalname,
      mimeType: file.mimetype,
      content: file.buffer,
    }]);

    // Ambil dengan aman
    const finalUrl = Array.isArray(uploadedFiles) ? uploadedFiles[0].url : uploadedFiles.url;

    // Deteksi Method
    const listMethod = typeof heroService.listHeroes === 'function' ? 'listHeroes' : 'listHeros';
    const createMethod = typeof heroService.createHeroes === 'function' ? 'createHeroes' : 'createHeros';

    const existing = await heroService[listMethod]({ category });
    
    const heroRecord = await heroService[createMethod]({
      image_url: finalUrl,
      category: category,
      position: existing ? existing.length : 0,
    });

    return res.status(200).json({ success: true, url: heroRecord.image_url, id: heroRecord.id })
  } catch (error) {
    console.error("Hero Upload Error:", error);
    return res.status(500).json({ message: "Upload Gagal" })
  }
}