import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const myobService = req.scope.resolve("myob") as any; 
    
    // Gunakan fungsi otomatis listMyobGalleries dari Medusa V2
    if (!myobService.listMyobGalleries) {
      return res.status(500).json({ message: "Service method tidak ditemukan" })
    }
    
    const galleries = await myobService.listMyobGalleries()
    const sortedGalleries = galleries && galleries.length > 0 ? galleries.reverse() : []
    
    res.status(200).json({ files: sortedGalleries })
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat galeri", error: String(error) })
  }
}