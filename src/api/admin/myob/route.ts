import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const myobService = req.scope.resolve("myob") as any; 
    
    // Gunakan fungsi otomatis bawaan Medusa V2
    const myobs = await myobService.listMyobs();
    
    // Karena konten MYOB biasanya cuma 1 baris di database, ambil index ke-0
    const content = myobs && myobs.length > 0 ? myobs[0] : null;
    
    res.status(200).json({ myob_content: content || {} })
  } catch (error) {
    res.status(500).json({ message: "Gagal memuat konten MYOB", error: String(error) })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  res.setHeader("Content-Type", "application/json");
  try {
    const myobService = req.scope.resolve("myob") as any; 
    
    // OBAT TYPESCRIPT: Tegaskan bahwa req.body adalah tipe Object
    const payload = req.body as Record<string, any>; 
    
    // Cek apakah data MYOB sudah ada di database
    const existingMyobs = await myobService.listMyobs();
    let updatedContent;

    if (existingMyobs && existingMyobs.length > 0) {
      // Kalau sudah ada, kita UPDATE data yang ada
      updatedContent = await myobService.updateMyobs({
        id: existingMyobs[0].id,
        ...payload
      });
    } else {
      // Kalau database kosong, kita CREATE baru
      updatedContent = await myobService.createMyobs(payload);
    }
    
    res.status(200).json({ message: "Berhasil update", myob_content: updatedContent })
  } catch (error) {
    console.error("[MYOB Save Error]", error)
    res.status(500).json({ message: "Gagal simpan konten", error: String(error) })
  }
}