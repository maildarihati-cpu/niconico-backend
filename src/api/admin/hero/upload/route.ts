import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { IFileModuleService } from "@medusajs/types"
import { Modules } from "@medusajs/utils"
import HeroService from "../../../../modules/hero/service" // Pastikan path ke service benar

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const fileModuleService: IFileModuleService = req.scope.resolve(Modules.FILE)
  const heroService = req.scope.resolve<HeroService>("hero")
  
  // 1. Ambil file dari multer
  const file = (req as any).file 
  
  // 2. Ambil kategori dari body (dikirim oleh MediaLibrary Frontend)
  // Kalau kosong, kita kasih default 'hero-banner'
  const category = (req.body as any).category || "hero-banner"

  if (!file) {
    return res.status(400).json({ message: "Mana file-nya bos? Kosong nih!" })
  }

  try {
    // 3. Simpan file fisik ke Storage (Cloudflare R2 via File Module)
    const uploadedFile = await fileModuleService.createFiles({
      filename: file.originalname,
      mimeType: file.mimetype,
      content: file.buffer,
    })

    // 4. DAFTARKAN KE DATABASE HERO (Sebagai record Media Library)
    // Kita cek jumlah data di kategori ini untuk menentukan posisi urutan
    const existingInStore = await heroService.listHeroes({ category })
    
    const heroRecord = await heroService.createHeroes({
      image_url: uploadedFile.url,
      category: category,
      position: existingInStore.length,
    } as any)

    // 5. Kembalikan data lengkap ke Frontend
    return res.status(200).json({ 
      success: true, 
      url: heroRecord.image_url,
      id: heroRecord.id
    })
  } catch (error) {
    console.error("Upload Error:", error)
    return res.status(500).json({ message: "Gagal simpan ke storage atau database." })
  }
} 