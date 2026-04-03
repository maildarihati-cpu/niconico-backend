import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const myobService = req.scope.resolve("myob")
    const existing = await myobService.listMyobs()

    if (existing.length > 0) {
      return res.status(200).json({ myob_content: existing[0] })
    }
    return res.status(200).json({ myob_content: null })
  } catch (error) {
    return res.status(500).json({ error: "Gagal menarik data" })
  }
}

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const myobService = req.scope.resolve("myob")
    const payload = req.body as any

    const existing = await myobService.listMyobs()
    let result;

    // Kalau data sudah ada, kita Update. Kalau belum ada, kita Create.
    if (existing.length > 0) {
      result = await myobService.updateMyobs({
        id: existing[0].id,
        ...payload
      })
    } else {
      result = await myobService.createMyobs(payload)
    }

    return res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "Gagal menyimpan data" })
  }
}