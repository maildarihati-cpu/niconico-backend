import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export const POST = async (req: MedusaRequest & { files?: any[] }, res: MedusaResponse) => {
  // Pastikan response content-type selalu JSON
  res.setHeader("Content-Type", "application/json");
  
  try {
    const fileService = req.scope.resolve(Modules.FILE)
    const myobService = req.scope.resolve("myob") 

    if (!req.files || req.files.length === 0) {
      console.error("[MYOB Upload] Tidak ada file di request.files. req.files:", req.files)
      return res.status(400).json({ message: "Tidak ada file" })
    }

    console.log(`[MYOB Upload] Memproses ${req.files.length} file(s)`)
    console.log(`[MYOB Upload] File info:`, req.files.map((f: any) => ({ name: f.originalname, size: f.size })))

    const filesToUpload = req.files.map((file) => ({
      filename: `myob/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
      mimeType: file.mimetype,
      content: file.buffer.toString("base64") 
    }))

    const uploadedFiles = await fileService.createFiles(filesToUpload)
    
    if (!uploadedFiles || uploadedFiles.length === 0) {
      console.error("[MYOB Upload] fileService.createFiles() mengembalikan array kosong")
      return res.status(500).json({ message: "File tidak terupload ke storage" })
    }

    console.log(`[MYOB Upload] File berhasil upload ke storage. URL: ${uploadedFiles[0].url}`)

    // SIMPAN KE TABEL GALERI
    if (uploadedFiles.length > 0) {
      try {
        await myobService.createMyobGalleries({ url: uploadedFiles[0].url })
        console.log("[MYOB Upload] Berhasil simpan ke tabel myob_gallery")
      } catch (dbError) {
        console.error("[MYOB Upload] GAGAL simpan ke myob_gallery:", dbError)
        // Jangan return error, file sudah terupload, hanya galeri yang gagal
      }
    }

    res.status(200).json({ files: uploadedFiles })
  } catch (error) {
    console.error("[MYOB Upload Error] Error detail:", error)
    res.status(500).json({ message: "Gagal upload", error: String(error) })
  }
}