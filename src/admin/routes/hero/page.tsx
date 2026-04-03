import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Label, Text, Divider, toast } from "@medusajs/ui"
import { Plus, Image as ImageIcon, Trash, Save, LayoutDashboard, RefreshCcw } from "lucide-react" 
import { useState, useEffect } from "react"
import { MediaLibrary } from "../../components/media-library" 

const HeroAdminPage = () => {
  const [slides, setSlides] = useState([])
  const [globalTitle, setGlobalTitle] = useState("SIMPLY BE YOUR OWN")
  const [loading, setLoading] = useState(false)
  const MAX_SLIDES = 4

  const fetchData = async () => {
    const res = await fetch("http://localhost:9000/admin/hero")
    const data = await res.json()
    setSlides(data.heroes || [])
    if(data.setting) setGlobalTitle(data.setting.global_title)
  }

  useEffect(() => { fetchData() }, [])

  const saveGlobalTitle = async () => {
    setLoading(true)
    try {
      await fetch("http://localhost:9000/admin/hero/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: globalTitle })
      })
      toast.success("Branding text updated successfully!")
    } catch(err) {
      toast.error("Failed to update branding text")
    } finally {
      setLoading(false)
    }
  }

  const addImageSlide = async (url: string) => {
    await fetch("http://localhost:9000/admin/hero", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: url })
    })
    fetchData()
  }

  const updateImageSlide = async (id: string, url: string) => {
    await fetch(`http://localhost:9000/admin/hero/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: url })
    })
    fetchData()
  }

  const deleteSlide = async (id: string) => {
    if(!confirm("Remove this slide?")) return
    await fetch(`http://localhost:9000/admin/hero/${id}`, { method: "DELETE" })
    fetchData()
  }

  return (
    <Container className="flex flex-col gap-y-8 p-8">
      <div className="flex items-center justify-between border-b border-ui-border-base pb-4">
        <div>
          <Heading level="h1" className="flex items-center gap-2">
            <LayoutDashboard className="w-5 h-5 text-ui-fg-base" /> Hero Section
          </Heading>
          <Text className="text-ui-fg-subtle text-sm">Manage the main carousel visual for Niconico Resort.</Text>
        </div>
      </div>

      {/* FIX 1: Hapus bg-white, ganti jadi bg-ui-bg-base (Auto Dark/Light Mode) */}
      <div className="bg-ui-bg-base border border-ui-border-base rounded-xl p-6 shadow-sm">
        <Label className="text-xs font-semibold uppercase tracking-widest text-ui-fg-subtle mb-4 block">
          Central Branding Text
        </Label>
        <div className="flex gap-4 items-center">
          <Input 
            className="font-bold uppercase tracking-tighter text-xl h-12 w-full max-w-xl"
            value={globalTitle} 
            onChange={(e) => setGlobalTitle(e.target.value)}
            placeholder="Enter branding text..."
          />
          <Button onClick={saveGlobalTitle} isLoading={loading} variant="primary">
            <Save className="mr-2 w-4 h-4" /> Save Title
          </Button>
        </div>
      </div>

      <Divider className="border-ui-border-base" />

      {/* SECTION 2: SLIDE IMAGES */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <Heading level="h2" className="text-lg font-bold text-ui-fg-base">Background Slides ({slides.length}/{MAX_SLIDES})</Heading>
          {slides.length < MAX_SLIDES && (
             <MediaLibrary onSelect={addImageSlide} category="hero-banner" trigger={
               <Button size="small" variant="secondary"><Plus className="mr-2 w-4 h-4" /> Add Slide</Button>
             } />
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {slides.map((slide: any) => (
            <div key={slide.id} className="relative aspect-[9/14] rounded-xl overflow-hidden group border border-ui-border-base shadow-sm hover:shadow-md transition-all bg-ui-bg-subtle">
              <img src={slide.image_url} className="w-full h-full object-cover" alt="Banner" />
              
              {/* FIX 2: Overlay jangan bg-white, ganti ke bg-ui-bg-base/90 biar kontras */}
              <div className="absolute inset-0 bg-ui-bg-base/90 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-3 transition-opacity p-4 backdrop-blur-sm">
                <MediaLibrary 
                   onSelect={(url) => updateImageSlide(slide.id, url)} 
                   category="hero-banner"
                   trigger={
                <Button 
                  variant="secondary" 
                  size="small" 
                  className="w-full shadow-sm text-black font-bold hover:text-black"
                >
                  <RefreshCcw className="mr-2 w-3 h-3" /> Change
                </Button>
              }
                />
                <Button variant="danger" size="small" className="w-full" onClick={() => deleteSlide(slide.id)}>
                  <Trash className="mr-2 w-3 h-3" /> Delete
                </Button>
              </div>
            </div>
          ))}
          
          {Array.from({ length: MAX_SLIDES - slides.length }).map((_, i) => (
            <div key={`empty-${i}`} className="aspect-[9/14] border-2 border-dashed border-ui-border-base rounded-xl flex flex-col items-center justify-center bg-ui-bg-subtle text-ui-fg-muted">
               <ImageIcon size={32} className="mb-2 opacity-30" />
               <Text className="text-xs font-semibold uppercase tracking-widest opacity-50">Empty Slot</Text>
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({ label: "Hero Banner", icon: ImageIcon })
export default HeroAdminPage