import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fileService = req.scope.resolve("file") as any
  const heroService = req.scope.resolve("hero") as any
  
  const file = (req as any).file 
  const category = (req.body as any)?.category || "hero-banner"

  if (!file) {
    return res.status(400).json({ message: "Mana file-nya bos? Kosong nih!" })
  }

  try {
    // 1. Simpan fisik pakai create (standar v2)
    const uploadedFile = await fileService.create({
      file: file.buffer,
      fileName: file.originalname,
    })

    // 2. Daftar ke database
    const existingInStore = await heroService.listHeroes({ category })
    
    const heroRecord = await heroService.createHeroes({
      image_url: uploadedFile.url,
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
    return res.status(500).json({ message: "Gagal simpan ke storage atau database." })
  }
}