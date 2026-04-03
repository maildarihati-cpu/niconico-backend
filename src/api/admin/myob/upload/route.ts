import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export const POST = async (req: MedusaRequest & { files?: any[] }, res: MedusaResponse) => {
  try {
    const fileService = req.scope.resolve(Modules.FILE)
    const myobService = req.scope.resolve("myob") 

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Tidak ada file" }) // INI DIA TERSANGKANYA
    }

    const filesToUpload = req.files.map((file) => ({
      filename: `myob/${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
      mimeType: file.mimetype,
      content: file.buffer.toString("base64") 
    }))

    const uploadedFiles = await fileService.createFiles(filesToUpload)

    // SIMPAN KE TABEL GALERI SUPABASE
    if (uploadedFiles.length > 0) {
      await myobService.createMyobGalleries({ url: uploadedFiles[0].url })
    }

    res.status(200).json({ files: uploadedFiles })
  } catch (error) {
    res.status(500).json({ message: "Gagal upload" })
  }
}