import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Button, Table, Text, FocusModal, Label, Input, Textarea, Select, toast, Avatar } from "@medusajs/ui"
import { MessageSquareQuote, Plus, Trash, Pencil, Image as ImageIcon, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { MediaLibrary } from "../../components/media-library"

// --- DATABASE BENDERA & NEGARA LENGKAP (WP STYLE) ---
const countries = [
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
].sort((a, b) => a.name.localeCompare(b.name))

const StoryTellerAdmin = () => {
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    customer_name: "",
    country_code: "US",
    country_name: "United States",
    rating: 5,
    review_text: "",
    image_url: ""
  })

  const fetchReviews = async () => {
    try {
      const res = await fetch("http://localhost:9000/admin/reviews")
      const data = await res.json()
      setReviews(data.reviews || [])
    } catch (err) {
      console.error("Gagal ambil data review", err)
    }
  }

  useEffect(() => { fetchReviews() }, [])

  const handleEdit = (rev: any) => {
    setEditingId(rev.id)
    setFormData({
      customer_name: rev.customer_name || "",
      country_code: rev.country_code || "US",
      country_name: rev.country_name || "United States",
      rating: rev.rating || 5,
      review_text: rev.review_text || "",
      image_url: rev.image_url || ""
    })
    setIsOpen(true)
  }

  const handleSave = async () => {
    if (!formData.image_url) return toast.error("Select photo first!")
    setLoading(true)
    try {
      const url = editingId 
        ? `http://localhost:9000/admin/reviews/${editingId}` 
        : "http://localhost:9000/admin/reviews"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      if (!res.ok) throw new Error()

      toast.success(editingId ? "Story updated!" : "Story added!")
      setIsOpen(false)
      setEditingId(null)
      fetchReviews()
      setFormData({ customer_name: "", country_code: "US", country_name: "United States", rating: 5, review_text: "", image_url: "" })
    } catch (err) {
      toast.error("Failed to save to backend")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus cerita kustomer ini?")) return
    await fetch(`http://localhost:9000/admin/reviews/${id}`, { method: "DELETE" })
    toast.success("Deleted")
    fetchReviews()
  }

  return (
    <Container className="flex flex-col gap-y-8 p-8 bg-ui-bg-base">
      
      {/* HEADER CMS */}
      <div className="flex items-center justify-between border-b border-ui-border-base pb-6">
        <div>
          <Heading level="h1" className="flex items-center gap-2 font-bold tracking-tighter text-ui-fg-base uppercase">
            <MessageSquareQuote className="w-6 h-6 text-[#ED5725]" /> Our Story Teller
          </Heading>
          <Text className="text-ui-fg-subtle text-xs mt-1 uppercase tracking-widest font-medium">Customer Experience CMS — Niconico Resort</Text>
        </div>
        
        <Button variant="primary" size="small" className="bg-[#ED5725] hover:bg-black" onClick={() => {
            setEditingId(null)
            setFormData({ customer_name: "", country_code: "US", country_name: "United States", rating: 5, review_text: "", image_url: "" })
            setIsOpen(true)
        }}>
            <Plus className="mr-2 w-4 h-4" /> New Story
        </Button>
      </div>

      <FocusModal open={isOpen} onOpenChange={setIsOpen}>
          <FocusModal.Content>
            <FocusModal.Header>
              <div className="flex items-center justify-between w-full px-4">
                <FocusModal.Title className="uppercase font-bold tracking-widest text-sm">
                    {editingId ? "Update Story" : "Add New Story"}
                </FocusModal.Title>
                <div className="flex gap-x-2">
                  <FocusModal.Close asChild><Button variant="secondary">Cancel</Button></FocusModal.Close>
                  <Button variant="primary" onClick={handleSave} isLoading={loading} className="bg-[#ED5725]">
                    {editingId ? "Save Changes" : "Publish Story"}
                  </Button>
                </div>
              </div>
            </FocusModal.Header>

            <FocusModal.Body className="p-12 flex flex-col gap-y-8 max-w-3xl mx-auto w-full">
              
              {/* PHOTO PICKER */}
              <div className="flex flex-col gap-y-3">
                <Label className="uppercase font-bold text-[10px] tracking-[0.2em] text-ui-fg-subtle">Customer Portrait</Label>
                <MediaLibrary category="reviews" onSelect={(url) => setFormData(p => ({...p, image_url: url}))} trigger={
                    <div className="relative w-40 h-40 rounded-3xl overflow-hidden border-2 border-dashed border-ui-border-base flex items-center justify-center cursor-pointer group hover:border-[#ED5725] bg-ui-bg-subtle transition-all">
                      {formData.image_url ? (
                        <img src={formData.image_url} className="w-full h-full object-cover shadow-xl" />
                      ) : (
                        <div className="text-center"><ImageIcon className="mx-auto mb-1 text-ui-fg-muted" /><Text size="xsmall">Select Image</Text></div>
                      )}
                    </div>
                } />
              </div>

              {/* DETAILS */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-y-2">
                  <Label className="uppercase font-bold text-[10px] tracking-widest">Full Name</Label>
                  <Input value={formData.customer_name} onChange={(e) => setFormData(p => ({...p, customer_name: e.target.value}))} />
                </div>
                <div className="flex flex-col gap-y-2">
                  <Label className="uppercase font-bold text-[10px] tracking-widest">Rating (1-5)</Label>
                  <Input type="number" min="1" max="5" value={formData.rating} onChange={(e) => setFormData(p => ({...p, rating: parseInt(e.target.value)}))} />
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <Label className="uppercase font-bold text-[10px] tracking-widest">Country / Origin</Label>
                <Select value={formData.country_code} onValueChange={(val) => {
                  const country = countries.find(c => c.code === val)
                  if(country) setFormData(p => ({...p, country_code: val, country_name: country.name}))
                }}>
                  <Select.Trigger><Select.Value /></Select.Trigger>
                  <Select.Content>
                    {countries.map(c => (
                      <Select.Item key={c.code} value={c.code}>
                        {c.flag} {c.name}
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select>
              </div>

              <div className="flex flex-col gap-y-2">
                <Label className="uppercase font-bold text-[10px] tracking-widest">The Review</Label>
                <Textarea rows={6} value={formData.review_text} onChange={(e) => setFormData(p => ({...p, review_text: e.target.value}))} />
              </div>
            </FocusModal.Body>
          </FocusModal.Content>
      </FocusModal>

      {/* TABLE */}
      <Table>
        <Table.Header>
          <Table.Row className="bg-ui-bg-subtle">
            <Table.HeaderCell className="text-[10px] uppercase font-bold tracking-widest">Customer</Table.HeaderCell>
            <Table.HeaderCell className="text-[10px] uppercase font-bold tracking-widest">Origin</Table.HeaderCell>
            <Table.HeaderCell className="text-[10px] uppercase font-bold tracking-widest">Rating</Table.HeaderCell>
            <Table.HeaderCell className="text-right text-[10px] uppercase font-bold tracking-widest">Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reviews.map((rev) => (
            <Table.Row key={rev.id}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <Avatar src={rev.image_url} fallback={rev.customer_name[0]} size="small" />
                  <Text className="font-bold text-sm">{rev.customer_name}</Text>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <span>{countries.find(c => c.code === rev.country_code)?.flag}</span>
                  <Text size="small" className="text-ui-fg-subtle">{rev.country_name}</Text>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div className="flex text-orange-400">
                  {[...Array(rev.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
              </Table.Cell>
              <Table.Cell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" size="small" onClick={() => handleEdit(rev)}><Pencil size={14}/></Button>
                  <Button variant="secondary" size="small" onClick={() => handleDelete(rev.id)} className="text-red-500"><Trash size={14}/></Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {reviews.length === 0 && (
            <Table.Row>
              {/* @ts-ignore - colSpan fix for Medusa UI */}
              <Table.Cell colSpan={4} className="text-center py-20 uppercase font-bold text-ui-fg-muted text-[10px] tracking-widest">
                No stories yet. Start adding your global proof.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineRouteConfig({ label: "Story Teller", icon: MessageSquareQuote })
export default StoryTellerAdmin