import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const files = (req as any).files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Tidak ada file yang diupload" })
    }

    const fileService = req.scope.resolve("file") as any; 
    
    const uploadedFiles = await Promise.all(
      files.map(async (f: any) => {
        // Medusa V2 pakai fungsi 'create' untuk file
        return await fileService.create({
          file: f.buffer,
          fileName: f.originalname,
        })
      })
    )

    const myobService = req.scope.resolve("myob") as any; 
    
    // Gunakan fungsi bawaan Medusa V2 untuk model MyobGallery
    if (myobService.createMyobGalleries) {
       await myobService.createMyobGalleries({ url: uploadedFiles[0].url })
    }

    res.status(200).json({ files: uploadedFiles })
  } catch (error) {
    console.error("[MYOB Upload Error]", error)
    res.status(500).json({ message: "Upload Gagal", error: String(error) })
  }
}