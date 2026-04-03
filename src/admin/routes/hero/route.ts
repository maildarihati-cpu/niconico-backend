import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
// 1. IMPORT SERVICE NYA UNTUK KASIH TAHU TYPESCRIPT
import HeroService from "../../../modules/hero/service"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  // 2. TAMBAHKAN <HeroService> SETELAH RESOLVE
  const heroService = req.scope.resolve<HeroService>("hero")
  
  const data = await heroService.listHeroes({}, {
    order: { rank: "ASC" }
  })
  
  return res.status(200).json({ heroes: data })
}