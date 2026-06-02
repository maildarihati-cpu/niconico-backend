import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Container, Heading, Text, } from "@medusajs/ui"
import { useEffect, useState, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"

import { 
  ChartBar, 
  Users, 
  ShoppingBag, 
  Percent, 
  FileSpreadsheet, 
  FileText, 
  Calendar,
  AlertTriangle
} from "lucide-react"

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  
  // Date Filters
  const [startDate, setStartDate] = useState<string>("2026-05-01")
  const [endDate, setEndDate] = useState<string>("2026-06-01")
  
  // Real Data State
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    revenueChange: 0,
    aov: 0,
    liveVisitors: 0,
    bounceRate: 0,
    cartAbandonment: 0
  })

  const [salesTrend, setSalesTrend] = useState<any[]>([])
  const [trafficSources, setTrafficSources] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [topPages, setTopPages] = useState<any[]>([])

  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false)
  const [exportSelection, setExportSelection] = useState({
    financial: true,
    traffic: true,
    products: true
  })

  const dashboardRef = useRef<HTMLDivElement>(null)

  // 🌟 PURE REAL DATA ENGINE
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      setLoading(true)
      try {
        const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost"
        const baseUrl = isLocal ? "http://localhost:9000" : "https://api.niconicoresort.com"
        
        // 1. FETCH REAL MEDUSA ORDERS
        const ordersRes = await fetch(`${baseUrl}/admin/orders?limit=1000&fields=id,total,created_at`, { credentials: "include" })
        if (!ordersRes.ok) throw new Error("Failed to fetch transaction data from Medusa.")
        
        const { orders } = await ordersRes.json()
        
        const filteredOrders = orders?.filter((o: any) => {
          const orderDate = o.created_at.split("T")[0]
          return orderDate >= startDate && orderDate <= endDate
        }) || []

        const totalRev = filteredOrders.reduce((sum: number, o: any) => sum + (o.total || 0), 0)
        const calculatedAov = filteredOrders.length > 0 ? totalRev / filteredOrders.length : 0

        const groupedByDate = filteredOrders.reduce((acc: any, order: any) => {
          const d = order.created_at.split("T")[0]
          acc[d] = (acc[d] || 0) + (order.total || 0)
          return acc
        }, {})

        const realTrendData = Object.entries(groupedByDate)
          .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
          .map(([date, total]) => ({ name: date, Current: total, Previous: 0 }))

        setSalesTrend(realTrendData)

        // 2. FETCH REAL POSTHOG DATA (MENGGUNAKAN API US CLOUD)
        let liveVis = 0
        let bRate = 0
        let cAbandon = 0
        let realTrafficSources: any[] = []
        let realTopProducts: any[] = []
        let realTopPages: any[] = []

        const posthogToken = process.env.MEDUSA_ADMIN_POSTHOG_PERSONAL_TOKEN
        const posthogProjectID = process.env.MEDUSA_ADMIN_POSTHOG_PROJECT_ID

        if (posthogToken && posthogProjectID) {
          const phHeaders = { "Authorization": `Bearer ${posthogToken}` }
          const phBaseUrl = "https://us.i.posthog.com/api/projects"

          try {
            // A. Tarik Pengunjung Live (5 Menit Terakhir)
            const liveRes = await fetch(`${phBaseUrl}/${posthogProjectID}/events/?event=$pageview&date_from=-5m`, { headers: phHeaders })
            if (liveRes.ok) {
              const liveData = await liveRes.json()
              const uniqueSessions = new Set(liveData.results?.map((r: any) => r.distinct_id))
              liveVis = uniqueSessions.size
            }

            // B. Tarik Halaman Terpopuler & Atribusi Trafik
            const pagesRes = await fetch(`${phBaseUrl}/${posthogProjectID}/events/?event=$pageview&date_from=${startDate}&date_to=${endDate}&limit=500`, { headers: phHeaders })
            if (pagesRes.ok) {
              const pagesData = await pagesRes.json()
              const pageCounts: Record<string, number> = {}
              const sourceCounts: Record<string, number> = {}

              pagesData.results?.forEach((r: any) => {
                const url = r.properties?.$pathname || "Unknown"
                pageCounts[url] = (pageCounts[url] || 0) + 1

                let source = r.properties?.$referring_domain || "Direct"
                if (source.includes("google")) source = "Google Organic"
                if (source.includes("instagram") || source.includes("facebook")) source = "Meta Ads (FB/IG)"
                sourceCounts[source] = (sourceCounts[source] || 0) + 1
              })
              
              realTopPages = Object.entries(pageCounts)
                .map(([path, Views]) => ({ path, Views }))
                .sort((a: any, b: any) => b.Views - a.Views).slice(0, 5)

              realTrafficSources = Object.entries(sourceCounts)
                .map(([source, Visitors]) => ({ source, Visitors }))
                .sort((a: any, b: any) => b.Visitors - a.Visitors).slice(0, 4)
            }
          } catch (e) {
            console.error("Gagal menyedot data dari API PostHog:", e)
          }
        }

        setMetrics({
          totalRevenue: totalRev, revenueChange: 0, aov: calculatedAov,
          liveVisitors: liveVis, bounceRate: bRate, cartAbandonment: cAbandon
        })

        if (realTrafficSources.length > 0) setTrafficSources(realTrafficSources)
        if (realTopPages.length > 0) setTopPages(realTopPages)

        setError(null)
      } catch (err: any) {
        setError(err.message || "Failed to compile analytics data.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [startDate, endDate])

  const handleExportExcel = async () => {
    const XLSX = await import("xlsx")
    const wb = XLSX.utils.book_new()

    if (exportSelection.financial) {
      const financialData = [
        ["Metric", "Value"],
        ["Total Revenue (IDR)", metrics.totalRevenue],
        ["Average Order Value (IDR)", metrics.aov],
        ["Cart Abandonment Rate (%)", `${metrics.cartAbandonment}%`]
      ]
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(financialData), "Financials")
    }

    if (exportSelection.traffic && trafficSources.length > 0) {
      const trafficData = [["Source", "Visitors"]].concat(trafficSources.map((t: any) => [t.source, t.Visitors]))
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(trafficData), "Traffic")
    }

    if (exportSelection.products && topProducts.length > 0) {
      const prodData = [["Product Name", "Views", "Added To Cart"]].concat(topProducts.map((p: any) => [p.name, p.Views, p.Added]))
      XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(prodData), "Products")
    }

    XLSX.writeFile(wb, `Niconico_Report_${startDate}_to_${endDate}.xlsx`)
    setIsExportModalOpen(false)
  }

  const handleExportPDF = async () => {
    const html2canvas = (await import("html2canvas")).default
    const { jsPDF } = await import("jspdf")

    if (dashboardRef.current) {
      const canvas = await html2canvas(dashboardRef.current, { scale: 2 })
      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF("p", "mm", "a4")
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`Niconico_Executive_Report_${startDate}.pdf`)
    }
    setIsExportModalOpen(false)
  }

  if (loading && salesTrend.length === 0) {
    return (
      <Container className="p-8 text-center py-20 bg-white">
        <Text className="animate-pulse text-gray-800 font-medium">Loading analytics data...</Text>
      </Container>
    )
  }

  return (
    <div ref={dashboardRef} className="flex flex-col gap-y-8 p-8 bg-[#F9F9F9] min-h-screen text-gray-900">
      
      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center gap-x-3 text-red-700 text-sm">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <p><strong>Notice:</strong> {error}</p>
        </div>
      )}

      {/* HEADER UTAMA */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-4 border-b border-gray-200 pb-6">
        <div className="flex flex-col gap-y-1">
          <Heading level="h1" className="font-black text-gray-900 tracking-tight text-3xl">Analytics</Heading>
          <Text className="text-gray-500 text-sm">Monitor live website behaviors and core financial infrastructure insights.</Text>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-md border border-gray-300 shadow-sm">
            <Calendar className="text-gray-600 w-4 h-4" />
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              onClick={(e) => e.currentTarget.showPicker()} 
              className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded px-2 py-1 outline-none font-bold text-gray-900 cursor-pointer w-[120px] transition-colors" 
            />
            <span className="text-gray-500 text-xs font-medium">to</span>
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              onClick={(e) => e.currentTarget.showPicker()} 
              className="text-xs bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded px-2 py-1 outline-none font-bold text-gray-900 cursor-pointer w-[120px] transition-colors" 
            />
          </div>
          
          <button onClick={() => setIsExportModalOpen(true)} className="flex items-center gap-x-2 bg-white border border-gray-300 px-4 py-2 rounded-md text-sm font-bold text-gray-900 hover:bg-gray-50 shadow-sm transition-colors">
            <FileSpreadsheet className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* RAK METRIK */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Text className="text-gray-500 text-xs font-bold tracking-wider uppercase">Gross Revenue</Text>
              <ShoppingBag className="text-gray-400 w-5 h-5" />
            </div>
            <Heading level="h2" className="font-extrabold text-xl text-gray-900">Rp {metrics.totalRevenue.toLocaleString("id-ID")}</Heading>
          </div>
          <div className="flex items-center gap-x-1 mt-4 text-xs font-semibold text-gray-500">
            <span>Real data from Medusa API</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border-l-4 border-l-[#E60000] border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Text className="text-[#E60000] text-xs font-black tracking-wider uppercase flex items-center gap-x-1.5">
                <span className="w-2 h-2 rounded-full bg-[#E60000] animate-ping"></span> Live Traffic
              </Text>
              <Users className="text-[#E60000] w-5 h-5" />
            </div>
            <Heading level="h2" className="font-black text-2xl text-gray-900">{metrics.liveVisitors}</Heading>
          </div>
          <Text className="text-xs text-gray-500 mt-4">Active browsing sessions on storefront.</Text>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Text className="text-gray-500 text-xs font-bold tracking-wider uppercase">Average Order Value</Text>
              <Percent className="text-gray-400 w-5 h-5" />
            </div>
            <Heading level="h2" className="font-extrabold text-xl text-gray-900">Rp {metrics.aov.toLocaleString("id-ID")}</Heading>
          </div>
          <Text className="text-xs text-gray-500 mt-4">Average transaction capital value.</Text>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <Text className="text-gray-500 text-xs font-bold tracking-wider uppercase">Store Bounce Rate</Text>
              <Percent className="text-gray-400 w-5 h-5" />
            </div>
            <Heading level="h2" className="font-extrabold text-xl text-gray-900">{metrics.bounceRate}%</Heading>
          </div>
          <Text className="text-xs text-gray-500 mt-4">Percentage of single-page visits.</Text>
        </div>
      </div>

      {/* GRAFIK */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm lg:col-span-2">
          <div className="mb-6">
            <Heading level="h3" className="text-base font-bold text-gray-900">Sales Comparison Trend</Heading>
            <Text className="text-xs text-gray-500">Historical financial performance based on actual completed orders.</Text>
          </div>
          <div className="h-72">
            {salesTrend.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888888" fontSize={11} />
                  <YAxis stroke="#888888" fontSize={11} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Line type="monotone" dataKey="Current" stroke="#000000" strokeWidth={3} activeDot={{ r: 8 }} name="Current Period" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg">
                <Text className="text-gray-400 text-sm font-medium">No transaction data available for this period.</Text>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="mb-6">
            <Heading level="h3" className="text-base font-bold text-gray-900">Traffic Acquisition Channels</Heading>
            <Text className="text-xs text-gray-500">Identified click sources routed from external networks.</Text>
          </div>
          <div className="h-72">
            {trafficSources.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={trafficSources} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" stroke="#888888" fontSize={10} />
                  <YAxis dataKey="source" type="category" stroke="#000000" fontSize={10} width={100} />
                  <Tooltip />
                  <Bar dataKey="Visitors" fill="#000000" radius={[0, 4, 4, 0]} barSize={15} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 text-center">
                <AlertTriangle className="w-6 h-6 text-gray-300 mb-2" />
                <Text className="text-gray-400 text-xs font-medium">PostHog Analytics is waiting for traffic data.<br/>Awaiting API Integration Sync.</Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DETAIL TABEL */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <Heading level="h3" className="text-base font-bold text-gray-900 mb-4">Product Interaction Integrity</Heading>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="text-xs uppercase bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4 text-center">Views</th>
                  <th className="py-3 px-4 text-center">Add To Cart</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {topProducts.length > 0 ? topProducts.map((p: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">{p.name}</td>
                    <td className="py-3 px-4 text-center">{p.Views}</td>
                    <td className="py-3 px-4 text-center text-green-600 font-bold">{p.Added}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-gray-400 text-xs">No product interaction data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <Heading level="h3" className="text-base font-bold text-gray-900 mb-4">Top Traversed Storefront URLs</Heading>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-700">
              <thead className="text-xs uppercase bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Page Path</th>
                  <th className="py-3 px-4 text-right">Pageviews</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {topPages.length > 0 ? topPages.map((page: any, idx: number) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs text-blue-600">{page.path}</td>
                    <td className="py-3 px-4 text-right text-gray-900 font-bold">{page.Views.toLocaleString()}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={2} className="py-8 text-center text-gray-400 text-xs">No pageview data found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* MODAL EXPORT */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 w-full max-w-sm shadow-2xl flex flex-col gap-y-4">
            <div>
              <Heading level="h3" className="text-base font-bold text-gray-900">Configure Export File</Heading>
              <Text className="text-xs text-gray-500">Check explicitly which report structures to prepare.</Text>
            </div>
            
            <div className="flex flex-col gap-y-3 py-3 border-y border-gray-100">
              <label className="flex items-center gap-x-3 text-sm font-bold text-gray-800 cursor-pointer">
                <input type="checkbox" checked={exportSelection.financial} onChange={(e) => setExportSelection({...exportSelection, financial: e.target.checked})} className="rounded text-black focus:ring-black w-4 h-4" />
                Financial Performance Metrics
              </label>
              <label className="flex items-center gap-x-3 text-sm font-bold text-gray-800 cursor-pointer">
                <input type="checkbox" checked={exportSelection.traffic} onChange={(e) => setExportSelection({...exportSelection, traffic: e.target.checked})} className="rounded text-black focus:ring-black w-4 h-4" />
                Traffic Attribution Datasets
              </label>
              <label className="flex items-center gap-x-3 text-sm font-bold text-gray-800 cursor-pointer">
                <input type="checkbox" checked={exportSelection.products} onChange={(e) => setExportSelection({...exportSelection, products: e.target.checked})} className="rounded text-black focus:ring-black w-4 h-4" />
                Product Engagement Logs
              </label>
            </div>

            <div className="flex flex-col gap-y-2 mt-2">
              <button onClick={handleExportExcel} className="w-full flex items-center justify-center gap-x-2 bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                <FileSpreadsheet className="w-4 h-4" /> Download Excel (.xlsx)
              </button>
              <button onClick={handleExportPDF} className="w-full flex items-center justify-center gap-x-2 bg-black hover:bg-gray-900 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">
                <FileText className="w-4 h-4" /> Download PDF (.pdf)
              </button>
              <button onClick={() => setIsExportModalOpen(false)} className="w-full py-2 text-sm font-bold text-gray-500 hover:text-gray-900">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export const config = defineRouteConfig({
  label: "Analytics",
  icon: ChartBar,
})