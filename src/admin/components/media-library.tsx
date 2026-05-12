import { Button, FocusModal, Heading, Text, toast } from "@medusajs/ui"
import { Image as ImageIcon, UploadCloud, CheckCircle2, Loader2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"

// 🌟 URL PASTI AMAN: process.env tidak jalan di browser Vite, jadi kita deteksi manual.
const BACKEND_URL = typeof window !== "undefined" && window.location.hostname === "localhost" 
  ? "http://localhost:9000" 
  : "https://niconico-backend.railway.app"; 

interface HeroFile {
  id: string
  image_url: string
}

interface MediaLibraryProps {
  onSelect: (url: string) => void
  category?: string 
  trigger?: React.ReactNode 
}

export const MediaLibrary = ({ onSelect, category, trigger }: MediaLibraryProps) => {
  const [files, setFiles] = useState<HeroFile[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)

  const fetchFiles = useCallback(async () => {
    setLoading(true)
    try {
      const baseUrl = `${BACKEND_URL}/admin/hero`
      const url = category ? `${baseUrl}?category=${category}` : baseUrl
        
      const res = await fetch(url, {
        method: "GET",
        credentials: "include" // 🌟 WAJIB TEMBUS CORS
      })
      if (!res.ok) throw new Error("Gagal tarik list")
      const data = await res.json()
      setFiles(data.heroes || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [category])

  useEffect(() => { fetchFiles() }, [fetchFiles])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return
    setIsUploading(true)
    
    const formData = new FormData() 
    // 🌟 PERBAIKAN: Ubah jadi "files" (Array), samakan persis dengan MYOB
    formData.append("files", e.target.files[0])
    formData.append("category", category || "hero-banner")

    try {
      const res = await fetch(`${BACKEND_URL}/admin/hero/upload`, {
        method: "POST",
        credentials: "include", // 🌟 WAJIB TEMBUS CORS
        body: formData
      })
      
      if (!res.ok) throw new Error("Upload failed")
      
      const data = await res.json()
      if (data.url) {
        setSelectedUrl(data.url)
        fetchFiles()
        toast.success("Berhasil upload gambar!")
      }
    } catch (err) {
      toast.error("Gagal upload")
    } finally {
      setIsUploading(false)
    }
  }

  const handleConfirm = () => {
    if (!selectedUrl) return
    onSelect(selectedUrl)
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(event);
  }

  return (
    <FocusModal>
      <FocusModal.Trigger asChild>
        {trigger ? trigger : (
          <div className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center hover:bg-ui-bg-subtle cursor-pointer transition-all border-ui-border-base bg-ui-bg-base group">
            <ImageIcon className="text-ui-fg-muted mb-2" />
            <Text className="text-ui-fg-subtle text-xs text-center uppercase font-bold tracking-widest">Select Media</Text>
          </div>
        )}
      </FocusModal.Trigger>
      
      <FocusModal.Content>
        <FocusModal.Header>
          <div className="flex items-center justify-between w-full px-4">
            <div>
              <FocusModal.Title>Media Library</FocusModal.Title>
              <FocusModal.Description>Assets for: {category || "Global"}</FocusModal.Description>
            </div>
            <div className="flex gap-x-2">
              <FocusModal.Close asChild><Button variant="secondary">Cancel</Button></FocusModal.Close>
              <Button variant="primary" disabled={!selectedUrl || isUploading} onClick={handleConfirm}>
                Confirm Selection
              </Button>
            </div>
          </div>
        </FocusModal.Header>

        <FocusModal.Body className="p-8 overflow-y-auto bg-ui-bg-subtle">
          <div className="flex items-center justify-between mb-8 bg-ui-bg-base p-4 rounded-xl border border-ui-border-base shadow-sm">
            <Heading level="h2" className="text-sm font-bold uppercase tracking-widest">
              Folder: {category?.toUpperCase() || "HERO"}
            </Heading>
            
            <label className="cursor-pointer bg-[#000000] text-[#FFFFFF] px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-all shadow-sm">
              {isUploading ? <Loader2 className="animate-spin w-4 h-4" /> : <UploadCloud size={16} />}
              <span className="text-[10px] font-bold uppercase tracking-widest">{isUploading ? "Uploading..." : "Upload New"}</span>
              <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={isUploading} />
            </label>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center p-20 gap-2">
              <Loader2 className="animate-spin text-ui-fg-muted" />
              <Text size="small" className="text-ui-fg-subtle font-bold uppercase tracking-widest">Syncing Assets...</Text>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  onClick={() => setSelectedUrl(file.image_url)} 
                  className={`relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all bg-ui-bg-base ${
                    selectedUrl === file.image_url 
                      ? 'border-[#0028FF] ring-4 ring-[#0028FF]/10' 
                      : 'border-transparent hover:border-ui-border-strong'
                  }`}
                >
                  <img src={file.image_url} className="w-full h-full object-cover" alt="Asset" />
                  {selectedUrl === file.image_url && (
                    <div className="absolute top-2 right-2 bg-[#0028FF] rounded-full p-1 shadow-lg">
                      <CheckCircle2 size={14} className="text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </FocusModal.Body>
      </FocusModal.Content>
    </FocusModal>
  )
}