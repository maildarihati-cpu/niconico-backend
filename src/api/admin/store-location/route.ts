import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// GET: Ambil semua data store untuk ditampilkan di tabel admin
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const storeLocationService = req.scope.resolve("storeLocation")
  const store_locations = await storeLocationService.listStoreLocations({}, {
    order: { created_at: "DESC" } // Urutkan dari yang terbaru
  })
  
  res.json({ store_locations })
}

// POST: Tambah store baru
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const storeLocationService = req.scope.resolve("storeLocation")
  const data = req.body as any

  const newStore = await storeLocationService.createStoreLocations({
    name: data.name,
    address: data.address,
    image_main: data.image_main,
    image_sub1: data.image_sub1 || null,
    image_sub2: data.image_sub2 || null,
    maps_link: data.maps_link || null,
    wa_link: data.wa_link || null,
    is_featured: data.is_featured || false
  })

  res.json({ store: newStore })
}