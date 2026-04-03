import { useState, useEffect, useRef } from "react";
import { Container, Heading, Text, Button, Input, Select, Textarea, toast, Tabs } from "@medusajs/ui";
import { defineRouteConfig } from "@medusajs/admin-sdk";
import { BuildingStorefront } from "@medusajs/icons";

export default function MyobAdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // State Upload & Gallery
  const [isUploadingMedia, setIsUploadingMedia] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState<any[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);

  const mediaInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    contentType: "video",
    mediaUrl: "",
    posterUrl: "",
    heading: "",
    quoteVerbatim: "",
    buttonText: "",
    buttonLink: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/admin/myob?t=${new Date().getTime()}`);
        const data = await response.json();
        
        if (data.myob_content) {
          const db = data.myob_content;
          // TERJEMAHKAN KEMBALI: Backend (Ular) -> Frontend (Unta)
          setFormData({
            contentType: db.content_type || "image",
            mediaUrl: db.media_url || "",
            posterUrl: db.poster_url || "",
            heading: db.heading || "",
            quoteVerbatim: db.quote_verbatim || "",
            buttonText: db.button_text || "",
            buttonLink: db.button_link || "",
          });
        }
      } catch (error) {
        console.error("Gagal menarik data:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  // Fungsi Tarik Galeri
  const fetchGallery = async () => {
    setIsLoadingGallery(true); // <--- 1. NYALAKAN LOADING DI SINI
    try {
      const res = await fetch("/admin/myob/media");
      const data = await res.json();
      setGalleryFiles(data.files || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingGallery(false); // <--- 2. MATIKAN LOADING DI SINI
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload ke Folder myob/
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "mediaUrl" | "posterUrl") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (targetField === "mediaUrl") setIsUploadingMedia(true);

    try {
      const uploadData = new FormData();
      uploadData.append("files", file);

      // Tembak ke API Tahap 1 kita
      const response = await fetch("/admin/myob/upload", {
        method: "POST",
        body: uploadData, 
      });

      if (!response.ok) throw new Error("Gagal upload");
      const data = await response.json();
      
      setFormData((prev) => ({ ...prev, [targetField]: data.files[0].url }));
      toast.success("Upload Berhasil", { description: "File masuk ke folder myob/" });
    } catch (error) {
      toast.error("Upload Gagal");
    } finally {
      if (targetField === "mediaUrl") setIsUploadingMedia(false);
      e.target.value = "";
    }
  };

  // Simpan ke Supabase
  const handleSave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // 1. TERJEMAHKAN BAHASA FRONTEND KE BACKEND (Snake Case)
      const payload = {
        content_type: formData.contentType,
        media_url: formData.mediaUrl,
        poster_url: formData.posterUrl,
        heading: formData.heading,
        quote_verbatim: formData.quoteVerbatim,
        button_text: formData.buttonText,
        button_link: formData.buttonLink,
      };

      // 2. KIRIM DATA YANG SUDAH DITERJEMAHKAN
      const response = await fetch(`/admin/myob`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), 
      });

      if (!response.ok) {
        // Biar kalau gagal lagi, kita tahu persis alasannya dari backend
        const errData = await response.json();
        console.error("Alasan Backend Menolak:", errData);
        throw new Error("Gagal menyimpan");
      }
      
      toast.success("Berhasil Disimpan!");
    } catch (error) {
      toast.error("Gagal Menyimpan");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) return <Container className="p-8"><Text>Memuat...</Text></Container>;

  return (
    <Container className="p-8 max-w-4xl mx-auto flex flex-col gap-y-8">
      <div>
        <Heading level="h1">Pengaturan Private Label</Heading>
        <Text className="text-ui-fg-subtle">Atur konten "Make Your Own Brand"</Text>
      </div>

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-2">
          <Text size="small" weight="plus">Tipe Media Utama</Text>
          <Select value={formData.contentType} onValueChange={(v) => setFormData((prev) => ({ ...prev, contentType: v }))}>
            <Select.Trigger><Select.Value /></Select.Trigger>
            <Select.Content>
              <Select.Item value="video">Video (Auto-play)</Select.Item>
              <Select.Item value="image">Gambar Statis</Select.Item>
            </Select.Content>
          </Select>
        </div>

        {/* MEDIA MANAGER (TAB SYSTEM) */}
        <div className="border border-ui-border-base rounded-lg p-4 bg-ui-bg-subtle">
          <Text size="small" weight="plus" className="mb-4">Media Manager (Main File)</Text>
          
          <Tabs defaultValue="upload" onValueChange={(val) => { if (val === 'gallery') fetchGallery() }}>
            <Tabs.List>
              <Tabs.Trigger value="upload">Upload Baru</Tabs.Trigger>
              <Tabs.Trigger value="gallery">Pilih dari Galeri MYOB</Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="upload" className="pt-4 flex flex-col gap-y-4">
              <input type="file" className="hidden" ref={mediaInputRef} onChange={(e) => handleFileUpload(e, "mediaUrl")} />
              <Button variant="secondary" isLoading={isUploadingMedia} onClick={() => mediaInputRef.current?.click()}>
                + Upload File ke Folder myob/
              </Button>
            </Tabs.Content>

            <Tabs.Content value="gallery" className="pt-4">
                {isLoadingGallery ? (
                 <div className="flex justify-center p-8"><Text className="animate-pulse">Sedang memuat gambar dari Supabase...</Text></div>
              ) : (
                 <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto p-2">
                   {/* ... kodingan gambar galleryFiles.map yang tadi ... */}
                 </div>
              )}
              <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto p-2">
                {galleryFiles.length === 0 ? <Text className="text-ui-fg-muted">Galeri kosong.</Text> : 
                  galleryFiles.map((f, i) => (
                    <div 
                      key={i} 
                      onClick={() => setFormData(prev => ({...prev, mediaUrl: f.url}))}
                      className={`relative cursor-pointer border rounded flex flex-col items-center justify-center overflow-hidden h-24 transition-all hover:border-blue-500
                        ${formData.mediaUrl === f.url ? 'border-blue-500 ring-2 ring-blue-500' : 'border-ui-border-base'}`}
                    >
                      {/* INI DIA MANTRA UNTUK MEMUNCULKAN GAMBARNYA */}
                      {f.url.toLowerCase().endsWith('.mp4') ? (
                         <video src={f.url} className="absolute inset-0 w-full h-full object-cover" />
                      ) : (
                         <img src={f.url} alt="Gallery" className="absolute inset-0 w-full h-full object-cover" />
                      )}

                      {/* Label Terpilih */}
                      {formData.mediaUrl === f.url && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center z-10">
                           <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">Terpilih</div>
                        </div>
                      )}
                    </div>
                  ))
                }
              </div>
            </Tabs.Content>
          </Tabs>

          <div className="mt-4 pt-4 border-t border-ui-border-base flex flex-col gap-1">
            <Text size="xsmall" weight="plus">File Aktif Saat Ini:</Text>
            <Text size="xsmall" className="text-emerald-600 truncate">{formData.mediaUrl || "Belum ada"}</Text>
          </div>
        </div>

        <div className="h-px w-full bg-ui-border-base my-2"></div>

        <div className="flex flex-col gap-y-2">
          <Text size="small" weight="plus">Judul Utama (Heading)</Text>
          <Input name="heading" value={formData.heading} onChange={handleChange} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Text size="small" weight="plus">Teks Deskripsi / Kutipan</Text>
          <Textarea name="quoteVerbatim" value={formData.quoteVerbatim} onChange={handleChange} rows={4} />
        </div>

        <div className="flex flex-col gap-y-2">
          <Text size="small" weight="plus">Teks & Link Tombol</Text>
          <div className="grid grid-cols-2 gap-4">
            <Input name="buttonText" placeholder="Teks Tombol" value={formData.buttonText} onChange={handleChange} />
            <Input name="buttonLink" placeholder="/link-tujuan" value={formData.buttonLink} onChange={handleChange} />
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-4">
        <Button 
          type="button" 
          variant="primary" 
          size="base" 
          isLoading={isLoading} 
          onClick={handleSave}
        >
          Simpan Perubahan
        </Button>
      </div>
    </Container>
  );
}

export const config = defineRouteConfig({
  label: "Private Label",
  icon: BuildingStorefront,
});