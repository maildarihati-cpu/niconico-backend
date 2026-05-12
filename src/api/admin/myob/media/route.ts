import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const myobService = req.scope.resolve("myob")
    
    // Tarik langsung dari tabel galeri kita, bukan dari File Provider Medusa
    const galleries = await myobService.listMyobGalleries()
    
    console.log(`[MYOB Media] Berhasil tarik ${galleries.length} file dari myob_gallery`)

    // Urutkan dari yang terbaru (dibalik)
    res.status(200).json({ files: galleries.reverse() })
  } catch (error) {
    console.error("[MYOB Media Error] Gagal tarik galeri:", error)
    res.status(500).json({ message: "Gagal memuat galeri", error: String(error) })
  }
}