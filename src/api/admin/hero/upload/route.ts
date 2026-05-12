import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const fileService = req.scope.resolve("file") as any; 
    const heroService = req.scope.resolve("hero") as any;
    
    const file = (req as any).file;
    if (!file) {
      return res.status(400).json({ message: "File kosong" });
    }

    // 🌟 KUNCI UPLOAD: Medusa V2 minta di-passing ke dalam Array [ { } ]
    const uploadedFiles = await fileService.createFiles([{
      filename: file.originalname,
      mimeType: file.mimetype,
      content: file.buffer,
    }]);

    // Ambil URL-nya dengan aman dari Array
    const finalUrl = Array.isArray(uploadedFiles) ? uploadedFiles[0].url : uploadedFiles.url;

    // Daftarkan ke database hero
    const category = (req.body as Record<string, any>)?.category || "hero-banner";
    const existing = await heroService.listHeroes({ category });
    
    const heroRecord = await heroService.createHeroes({
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