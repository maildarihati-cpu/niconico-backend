import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

// 1. OPTIONS: Wajib ada buat ngasih izin CORS ke browser Next.js
export async function OPTIONS(req: MedusaRequest, res: MedusaResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.status(200).send()
}

// 2. GET: Tarik data Store
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  // Kasih izin CORS juga di respon GET-nya
  res.setHeader("Access-Control-Allow-Origin", "*")
  
  try {
    const storeLocationService = req.scope.resolve("storeLocation")
    
    // Tarik maksimal 3 data yang di-ceklis "Featured"
    const store_locations = await storeLocationService.listStoreLocations({
      is_featured: true
    }, { 
      take: 3 
    })

    // Hitung total semua store yang ada
    const [, count] = await storeLocationService.listAndCountStoreLocations()

    res.json({ store_locations, count })
  } catch (error) {
    res.status(500).json({ error: "Gagal narik data" })
  }
}