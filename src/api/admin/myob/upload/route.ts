import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { IFileModuleService } from "@medusajs/types"
import { Modules } from "@medusajs/utils"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");

  // Pakai File Module standar Medusa V2
  const fileModuleService: IFileModuleService = req.scope.resolve(Modules.FILE)
  const myobService = req.scope.resolve("myob") as any;
  
  const files = (req as any).files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "Tidak ada file yang diupload" })
  }

  try {
    // Siapkan data file untuk diupload
    const filePayloads = files.map((f: any) => ({
      filename: f.originalname,
      mimeType: f.mimetype,
      content: f.buffer,
    }));

    // createFiles selalu menghasilkan Array
    const uploadedFiles = await fileModuleService.createFiles(filePayloads);

    // Ambil file pertama dengan aman
    const firstFile = Array.isArray(uploadedFiles) ? uploadedFiles[0] : uploadedFiles;

    if (myobService.createMyobGalleries) {
       await myobService.createMyobGalleries({ url: firstFile.url })
    }

    // Kembalikan ke frontend dalam format array agar form bisa membacanya
    res.status(200).json({ files: Array.isArray(uploadedFiles) ? uploadedFiles : [uploadedFiles] })
  } catch (error) {
    console.error("[MYOB Upload Error]", error)
    res.status(500).json({ message: "Upload Gagal", error: String(error) })
  }
}