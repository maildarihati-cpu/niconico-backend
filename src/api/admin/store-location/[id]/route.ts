import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// PUT: Untuk Update Data keseluruhan DAN Toggle Switch "Featured"
export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const storeLocationService = req.scope.resolve("storeLocation")
  const { id } = req.params // Ambil ID dari URL
  const data = req.body as any

  const updatedStore = await storeLocationService.updateStoreLocations({
    id,
    ...data // Update field apa saja yang dikirim dari frontend (termasuk is_featured)
  })

  res.json({ store: updatedStore })
}

// DELETE: Untuk Hapus Store
export async function DELETE(req: MedusaRequest, res: MedusaResponse) {
  const storeLocationService = req.scope.resolve("storeLocation")
  const { id } = req.params

  await storeLocationService.deleteStoreLocations(id)

  res.json({ success: true, message: "Store deleted" })
}