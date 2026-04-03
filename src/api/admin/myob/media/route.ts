import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const myobService = req.scope.resolve("myob")
    
    // Tarik langsung dari tabel galeri kita, bukan dari File Provider Medusa
    const galleries = await myobService.listMyobGalleries()

    // Urutkan dari yang terbaru (dibalik)
    res.status(200).json({ files: galleries.reverse() })
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat galeri" })
  }
}