import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  console.log("=== [2] HALAMAN DI-REFRESH, NARIK DATA... ===")
  
  try {
    const myobService = req.scope.resolve("myob")
    const existing = await myobService.listMyobs()

    // KAMERA 2: Intip apa yang dikembalikan oleh Supabase
    console.log("Data yang ditarik dari DB:", existing)

    if (existing.length > 0) {
      const data = existing[0]
      res.status(200).json({
        myob_content: {
          contentType: data.content_type,
          mediaUrl: data.media_url,
          posterUrl: data.poster_url,
          heading: data.heading,
          quoteVerbatim: data.quote_verbatim,
          buttonText: data.button_text,
          buttonLink: data.button_link
        }
      })
    } else {
      console.log("Data masih kosong di DB!")
      res.status(200).json({ myob_content: null })
    }
  } catch (error) {
    console.error("=== ERROR GET ===", error)
    res.status(500).json({ error: "Gagal menarik data" })
  }
}