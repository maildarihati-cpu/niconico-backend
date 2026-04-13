import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Table, Text, FocusModal, Label, Input, Textarea, toast, Avatar, Switch } from "@medusajs/ui"
import { MapPin, Plus, Trash, Pencil, Image as ImageIcon } from "lucide-react"
import { useState, useEffect } from "react"
// Sesuaikan path import MediaLibrary bos
import { MediaLibrary } from "../../components/media-library" 

const StoreLocationsAdmin = () => {
  const [stores, setStores] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    image_main: "",
    image_sub1: "",
    image_sub2: "",
    maps_link: "",
    wa_link: "",
    is_featured: false
  })

  // GET DATA
  const fetchStores = async () => {
    try {
      // Pastikan bos udah bikin route GET di src/api/admin/store-locations/route.ts
      const res = await fetch("http://localhost:9000/admin/store-location")
      const data = await res.json()
      setStores(data.store_locations || [])
    } catch (err) {
      console.error("Gagal ambil data store", err)
    }
  }

  useEffect(() => { fetchStores() }, [])

  // BUKA MODAL EDIT
  const handleEdit = (store: any) => {
    setEditingId(store.id)
    setFormData({
      name: store.name || "",
      address: store.address || "",
      image_main: store.image_main || "",
      image_sub1: store.image_sub1 || "",
      image_sub2: store.image_sub2 || "",
      maps_link: store.maps_link || "",
      wa_link: store.wa_link || "",
      is_featured: store.is_featured || false
    })
    setIsOpen(true)
  }

  // SAVE / UPDATE DATA
  const handleSave = async () => {
    if (!formData.name) return toast.error("Store Name required!")
    if (!formData.address) return toast.error("Address required!")
    if (!formData.image_main) return toast.error("Main Image required!")

    setLoading(true)
    try {
      const url = editingId 
        ? `http://localhost:9000/admin/store-location/${editingId}` 
        : "http://localhost:9000/admin/store-location"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error()

      toast.success(editingId ? "Store updated!" : "Store added!")
      setIsOpen(false)
      setEditingId(null)
      fetchStores()
      resetForm()
    } catch (err) {
      toast.error("Failed to save to backend")
    } finally {
      setLoading(false)
    }
  }

  // DELETE DATA
  const handleDelete = async (id: string) => {
    if (!confirm("Hapus store ini?")) return
    try {
      await fetch(`http://localhost:9000/admin/store-location/${id}`, { method: "DELETE" })
      toast.success("Store Deleted")
      fetchStores()
    } catch (err) {
      toast.error("Failed to delete")
    }
  }

  // TOGGLE FEATURED (Limit Max 3)
  const handleToggleFeatured = async (store: any, checked: boolean) => {
    const currentFeatured = stores.filter(s => s.is_featured).length;
    
    // Validasi Frontend: Kalau mau nyalain tapi udah 3, tolak!
    if (checked && currentFeatured >= 3) {
        toast.error("Limit Reached! Max 3 stores can be featured.");
        return;
    }

    try {
        const res = await fetch(`http://localhost:9000/admin/store-location/${store.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ is_featured: checked })
        });
        if (!res.ok) throw new Error();
        toast.success(checked ? "Store Featured!" : "Store Un-featured");
        fetchStores(); // Refresh tabel
    } catch (err) {
        toast.error("Failed to update status");
    }
  }

  const resetForm = () => {
    setFormData({ name: "", address: "", image_main: "", image_sub1: "", image_sub2: "", maps_link: "", wa_link: "", is_featured: false })
  }

  return (
    <Container className="flex flex-col gap-y-8 p-8 bg-ui-bg-base">
      
      {/* HEADER CMS */}
      <div className="flex items-center justify-between border-b border-ui-border-base pb-6">
        <div>
          <Heading level="h1" className="flex items-center gap-2 font-bold tracking-tighter text-ui-fg-base uppercase">
            <MapPin className="w-6 h-6 text-[#ED5725]" /> Store Locations
          </Heading>
          <Text className="text-ui-fg-subtle text-xs mt-1 uppercase tracking-widest font-medium">Retail CMS — Niconico Resort</Text>
        </div>
        
        <Button variant="primary" size="small" className="bg-[#ED5725] hover:bg-black" onClick={() => {
            setEditingId(null)
            resetForm()
            setIsOpen(true)
        }}>
            <Plus className="mr-2 w-4 h-4" /> Add Store
        </Button>
      </div>

      <FocusModal open={isOpen} onOpenChange={setIsOpen}>
          <FocusModal.Content>
            <FocusModal.Header>
              <div className="flex items-center justify-between w-full px-4">
                <FocusModal.Title className="uppercase font-bold tracking-widest text-sm">
                    {editingId ? "Update Store Location" : "Add New Store"}
                </FocusModal.Title>
                <div className="flex gap-x-2">
                  <FocusModal.Close asChild><Button variant="secondary">Cancel</Button></FocusModal.Close>
                  <Button variant="primary" onClick={handleSave} isLoading={loading} className="bg-[#ED5725]">
                    {editingId ? "Save Changes" : "Publish Store"}
                  </Button>
                </div>
              </div>
            </FocusModal.Header>

            <FocusModal.Body className="p-12 flex flex-col gap-y-10 max-w-4xl mx-auto w-full overflow-y-auto">
              
              {/* PHOTO PICKERS (1 Besar, 2 Kecil) */}
              <div className="flex flex-col gap-y-4">
                <Label className="uppercase font-bold text-[10px] tracking-[0.2em] text-ui-fg-subtle border-b pb-2">Store Gallery</Label>
                <div className="grid grid-cols-3 gap-6">
                  {/* MAIN IMAGE */}
                  <div className="col-span-1 flex flex-col gap-y-2">
                    <Label className="uppercase font-bold text-[10px] tracking-widest text-[#ED5725]">Main Image *</Label>
                    <MediaLibrary category="store" onSelect={(url) => setFormData(p => ({...p, image_main: url}))} trigger={
                        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border-2 border-dashed border-ui-border-base flex items-center justify-center cursor-pointer group hover:border-[#ED5725] bg-ui-bg-subtle transition-all">
                          {formData.image_main ? <img src={formData.image_main} className="w-full h-full object-cover shadow-sm" /> : <div className="text-center"><ImageIcon className="mx-auto mb-1 text-ui-fg-muted" /><Text size="xsmall">Select Main</Text></div>}
                        </div>
                    } />
                  </div>
                  {/* SUB IMAGES */}
                  <div className="col-span-2 grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-y-2">
                       <Label className="uppercase font-bold text-[10px] tracking-widest">Sub Image 1</Label>
                       <MediaLibrary category="store" onSelect={(url) => setFormData(p => ({...p, image_sub1: url}))} trigger={
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-ui-border-base flex items-center justify-center cursor-pointer group hover:border-[#ED5725] bg-ui-bg-subtle transition-all">
                            {formData.image_sub1 ? <img src={formData.image_sub1} className="w-full h-full object-cover" /> : <div className="text-center"><ImageIcon className="mx-auto mb-1 text-ui-fg-muted" /></div>}
                          </div>
                      } />
                    </div>
                    <div className="flex flex-col gap-y-2">
                       <Label className="uppercase font-bold text-[10px] tracking-widest">Sub Image 2</Label>
                       <MediaLibrary category="store" onSelect={(url) => setFormData(p => ({...p, image_sub2: url}))} trigger={
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 border-dashed border-ui-border-base flex items-center justify-center cursor-pointer group hover:border-[#ED5725] bg-ui-bg-subtle transition-all">
                            {formData.image_sub2 ? <img src={formData.image_sub2} className="w-full h-full object-cover" /> : <div className="text-center"><ImageIcon className="mx-auto mb-1 text-ui-fg-muted" /></div>}
                          </div>
                      } />
                    </div>
                  </div>
                </div>
              </div>

              {/* STORE DETAILS */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-y-2">
                  <Label className="uppercase font-bold text-[10px] tracking-widest">Store Name (ex: CANGGU)</Label>
                  <Input value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="uppercase font-bold text-[10px] tracking-widest">WhatsApp Number / Link</Label>
                  <Input placeholder="6281234..." value={formData.wa_link} onChange={(e) => setFormData(p => ({...p, wa_link: e.target.value}))} />
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <Label className="uppercase font-bold text-[10px] tracking-widest">Google Maps Link</Label>
                <Input placeholder="https://maps.google.com/..." value={formData.maps_link} onChange={(e) => setFormData(p => ({...p, maps_link: e.target.value}))} />
              </div>

              <div className="flex flex-col gap-y-2">
                <Label className="uppercase font-bold text-[10px] tracking-widest">Full Address</Label>
                <Textarea rows={3} value={formData.address} onChange={(e) => setFormData(p => ({...p, address: e.target.value}))} />
              </div>
            </FocusModal.Body>
          </FocusModal.Content>
      </FocusModal>

      {/* TABLE */}
      <Table>
        <Table.Header>
          <Table.Row className="bg-ui-bg-subtle">
            <Table.HeaderCell className="text-[10px] uppercase font-bold tracking-widest">Store Info</Table.HeaderCell>
            <Table.HeaderCell className="text-[10px] uppercase font-bold tracking-widest text-center">Featured (Home)</Table.HeaderCell>
            <Table.HeaderCell className="text-right text-[10px] uppercase font-bold tracking-widest">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {stores.map((store) => (
            <Table.Row key={store.id}>
              <Table.Cell>
                <div className="flex items-center gap-4">
                  <Avatar src={store.image_main} fallback={store.name[0]} size="large" variant="squared" />
                  <div>
                    <Text className="font-bold text-sm uppercase text-[#ED5725]">{store.name}</Text>
                    <Text size="xsmall" className="text-ui-fg-subtle line-clamp-1 max-w-[400px]">{store.address}</Text>
                  </div>
                </div>
              </Table.Cell>
              <Table.Cell className="text-center">
                <div className="flex justify-center">
                  <Switch 
                    checked={store.is_featured} 
                    onCheckedChange={(checked) => handleToggleFeatured(store, checked)}
                  />
                </div>
              </Table.Cell>
              <Table.Cell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="small" onClick={() => handleEdit(store)}><Pencil size={14}/></Button>
                  <Button variant="secondary" size="small" onClick={() => handleDelete(store.id)} className="text-red-500"><Trash size={14}/></Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {stores.length === 0 && (
            <Table.Row>
                {/* @ts-ignore */}
              <Table.Cell colSpan={3} className="text-center py-20 uppercase font-bold text-ui-fg-muted text-[10px] tracking-widest">
                No stores registered. Start adding your retail locations.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineRouteConfig({ label: "Store Locations", icon: MapPin })
export default StoreLocationsAdmin