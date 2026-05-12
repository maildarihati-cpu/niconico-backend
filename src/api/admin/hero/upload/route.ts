import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const fileService = req.scope.resolve(Modules.FILE) as any;
    const heroService = req.scope.resolve("hero") as any;
    
    // 🌟 PERBAIKAN: Tangkap sebagai "files" (Array), bukan "file" (Single)
    const files = (req as any).files;
    const category = (req.body as any)?.category || "hero-banner";

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "File kosong" });
    }

    // Eksekusi upload ke Storage Medusa
    const uploadedFiles = await fileService.createFiles([{
      filename: files[0].originalname,
      mimeType: files[0].mimetype,
      content: files[0].buffer,
    }]);

    const finalUrl = Array.isArray(uploadedFiles) ? uploadedFiles[0].url : uploadedFiles.url;

    const listMethod = typeof heroService.listHeroes === 'function' ? 'listHeroes' : 'listHeros';
    const createMethod = typeof heroService.createHeroes === 'function' ? 'createHeroes' : 'createHeros';

    const existing = await heroService[listMethod]({ category });
    
    const heroRecord = await heroService[createMethod]({
      image_url: finalUrl,
      category: category,
      position: existing ? existing.length : 0,
    });

    return res.status(200).json({ success: true, url: heroRecord.image_url, id: heroRecord.id })
  } catch (error: any) {
    console.error("Hero Upload Error:", error);
    return res.status(500).json({ message: error.message })
  }
}