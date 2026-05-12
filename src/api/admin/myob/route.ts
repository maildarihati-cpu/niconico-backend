import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const myobService = req.scope.resolve("myob")
    const existing = await myobService.listMyobs()
    
    console.log(`[MYOB Admin GET] Tarik data myob: ${existing.length} record(s)`)

    if (existing.length > 0) {
      console.log("[MYOB Admin GET] Data ditemukan, mengirim ke frontend")
      return res.status(200).json({ myob_content: existing[0] })
    }
    
    console.log("[MYOB Admin GET] Database myob kosong (first fetch)")
    return res.status(200).json({ myob_content: null })
  } catch (error) {
    console.error("[MYOB Admin GET Error] Gagal tarik data:", error)
    return res.status(500).json({ error: "Gagal menarik data", details: String(error) })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const myobService = req.scope.resolve("myob")
    const payload = req.body as any
    
    console.log("[MYOB Admin POST] Payload diterima:", JSON.stringify(payload).substring(0, 100))

    const existing = await myobService.listMyobs()
    let result;

    // Kalau data sudah ada, kita Update. Kalau belum ada, kita Create.
    if (existing.length > 0) {
      console.log(`[MYOB Admin POST] Update existing myob (id: ${existing[0].id})`)
      result = await myobService.updateMyobs({
        id: existing[0].id,
        ...payload
      })
    } else {
      console.log("[MYOB Admin POST] Create new myob record")
      result = await myobService.createMyobs(payload)
    }

    console.log("[MYOB Admin POST] Berhasil save ke database")
    return res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error("[MYOB Admin POST Error] Gagal save:", error)
    return res.status(500).json({ error: "Gagal menyimpan data", details: String(error) })
  }
}