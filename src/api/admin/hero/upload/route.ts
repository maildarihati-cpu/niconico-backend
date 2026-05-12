import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { IFileModuleService } from "@medusajs/types"
import { Modules } from "@medusajs/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fileModuleService: IFileModuleService = req.scope.resolve(Modules.FILE)
  const heroService = req.scope.resolve("hero") as any
  
  const file = (req as any).file 
  const category = (req.body as any)?.category || "hero-banner"

  if (!file) {
    return res.status(400).json({ message: "File kosong, Bos!" })
  }

  try {
    // 🌟 PERBAIKAN: createFiles mengembalikan array
    const uploadedFiles = await fileModuleService.createFiles({
      filename: file.originalname,
      mimeType: file.mimetype,
      content: file.buffer,
    })

    // Ambil file pertama dari array hasil upload
    const resultFile = Array.isArray(uploadedFiles) ? uploadedFiles[0] : uploadedFiles

    const existingInStore = await heroService.listHeroes({ category })
    
    const heroRecord = await heroService.createHeroes({
      image_url: resultFile.url, // Sekarang ambil .url dari index 0
      category: category,
      position: existingInStore.length,
    })

    return res.status(200).json({ 
      success: true, 
      url: heroRecord.image_url,
      id: heroRecord.id
    })
  } catch (error) {
    console.error("Hero Upload Error:", error)
    return res.status(500).json({ message: "Gagal simpan ke database." })
  }
}