import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Input, Label, Text, Divider, toast } from "@medusajs/ui"
import { Plus, Image as ImageIcon, Trash, Save, LayoutDashboard, RefreshCcw } from "lucide-react" 
import { useState, useEffect, useCallback } from "react"
import { MediaLibrary } from "../../components/media-library" 

const BACKEND_URL = typeof window !== "undefined" && window.location.hostname === "localhost" 
  ? "http://localhost:9000" 
  : "https://niconico-backend-production.up.railway.app"

const getImageUrl = (url: string | null) => {
  if (!url) return "";
  if (url.startsWith("http")) return url; 
  const cleanPath = url.startsWith("/") ? url : `/${url}`;
  return `${BACKEND_URL}${cleanPath}`;
}

// 🌟 FUNGSI PENYEDOT TOKEN MEDUSA V2 (MASTER KEY ANTI 401)
const getAuthHeaders = () => {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (typeof document !== "undefined") {
    // Medusa V2 menyembunyikan token di dalam cookie, kita sedot dan jadikan Bearer Token
    const jwtMatch = document.cookie.match(/(?:^|;)\s*_medusa_jwt=([^;]*)/);
    const adminMatch = document.cookie.match(/(?:^|;)\s*medusa_admin_token=([^;]*)/);
    const token = (jwtMatch && jwtMatch[1]) || (adminMatch && adminMatch[1]);
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  return headers;
};

const HeroAdminPage = () => {
  const [slides, setSlides] = useState<any[]>([])
  const [globalTitle, setGlobalTitle] = useState("SIMPLY BE YOUR OWN")
  const [loading, setLoading] = useState(false)
  const MAX_SLIDES = 4

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/admin/hero`, {
        method: "GET",
        credentials: "include",
        headers: getAuthHeaders() // 🌟 INJEKSI KUNCI DI SINI
      })
      if (!res.ok) throw new Error("Gagal tarik data")
      
      const data = await res.json()
      setSlides(data.heroes || [])
      if (data.setting) setGlobalTitle(data.setting.global_title)
    } catch (err) {
      console.error("Fetch Error:", err)
    }
  }, [])

  useEffect(() => { 
    fetchData() 
  }, [fetchData])

  const saveGlobalTitle = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND_URL}/admin/hero/settings`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(), // 🌟 INJEKSI KUNCI DI SINI
        body: JSON.stringify({ title: globalTitle })
      })
      
      if (!res.ok) throw new Error("Gagal update setting")
      toast.success("Branding text updated successfully!")
    } catch (err) {
      toast.error("Failed to update branding text")
    } finally {
      setLoading(false)
    }
  }

  const addImageSlide = async (url: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/admin/hero`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(), // 🌟 INJEKSI KUNCI DI SINI
        body: JSON.stringify({ image_url: url })
      })
      
      if (!res.ok) throw new Error("Gagal add slide")
      fetchData()
      toast.success("Slide added successfully!")
    } catch (err) {
      toast.error("Failed to add slide")
    }
  }

  const updateImageSlide = async (id: string, url: string) => {
    try {
      const res = await fetch(`${BACKEND_URL}/admin/hero/${id}`, {
        method: "POST", 
        credentials: "include",
        headers: getAuthHeaders(), // 🌟 INJEKSI KUNCI DI SINI
        body: JSON.stringify({ image_url: url })
      })
      
      if (!res.ok) throw new Error("Gagal update slide")
      fetchData()
      toast.success("Slide updated successfully!")
    } catch (err) {
      toast.error("Failed to update slide")
    }
  }

  const deleteSlide = async (id: string) => {
    if (!confirm("Remove this slide?")) return
    try {
      const res = await fetch(`${BACKEND_URL}/admin/hero/${id}`, { 
        method: "DELETE",
        credentials: "include",
        headers: getAuthHeaders() // 🌟 INJEKSI KUNCI DI SINI
      })
      
      if (!res.ok) throw new Error("Delete failed")
      fetchData()
      toast.success("Slide removed successfully!")
    } catch (err) {
      toast.error("Failed to delete slide")
    }
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
              
              <img src={getImageUrl(slide.image_url)} className="w-full h-full object-cover" alt="Banner" />
              
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