import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CurrencyDollar } from "@medusajs/icons"
import { Container, Heading, Table, Text, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 

export default function CustomerSpentPage() {
  const [customersData, setCustomersData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  
  const navigate = useNavigate() 

  useEffect(() => {
    const fetchCustomerSpent = async () => {
      setIsLoading(true)
      setErrorMsg(null)
      try {
        // 🌟 RADAR ANTI-NYASAR!
        // Berdasarkan screenshot Bos, ini adalah alamat asli backend Medusa-nya:
        const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost"
        const baseUrl = isLocal ? "http://localhost:9000" : "https://api.niconicoresort.com"

        // Double Fetch ke alamat Backend yang BENAR
        const [customersRes, ordersRes] = await Promise.all([
          fetch(`${baseUrl}/admin/customers?limit=250`, {
            credentials: "include", 
            headers: { "Accept": "application/json" }
          }),
          fetch(`${baseUrl}/admin/orders?limit=1000`, {
            credentials: "include", 
            headers: { "Accept": "application/json" }
          })
        ])

        if (!customersRes.ok || !ordersRes.ok) {
          throw new Error("HTTP Error. Pastikan sesi Admin masih aktif (Tidak expired).")
        }

        const { customers } = await customersRes.json()
        const { orders } = await ordersRes.json()

        if (!customers || !orders) {
          setErrorMsg("Data tidak ditemukan di server.")
          return
        }

        // 🌟 KAWINKAN DATA
        const calculatedCustomers = customers.map((customer: any) => {
          const customerOrders = orders.filter((o: any) => o.customer_id === customer.id)
          const totalSpent = customerOrders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)

          return {
            ...customer,
            total_spent: totalSpent,
            order_count: customerOrders.length
          }
        })

        const sortedCustomers = calculatedCustomers.sort((a: any, b: any) => b.total_spent - a.total_spent)
        setCustomersData(sortedCustomers)
      } catch (error: any) {
        console.error("Failed to fetch Customer Spent data:", error)
        setErrorMsg(error.message || "Terjadi kesalahan saat menarik data.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCustomerSpent()
  }, [])

  return (
    <Container className="p-8">
      <div className="flex flex-col gap-y-2 mb-8">
        <Heading level="h1">Customer Spent</Heading>
        <Text className="text-ui-fg-subtle">
          Monitor total customer spending. Click a row to view their detailed order history.
        </Text>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Customer Email</Table.HeaderCell>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell className="text-center">Total Orders</Table.HeaderCell>
            <Table.HeaderCell className="text-right">Total Spent (IDR)</Table.HeaderCell>
            <Table.HeaderCell className="text-center">Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              <Table.Cell {...({ colSpan: 6 } as any)} className="text-center py-8">
                <Text className="text-ui-fg-subtle animate-pulse">Fetching and calculating records from api.niconicoresort.com...</Text>
              </Table.Cell>
            </Table.Row>
          ) : errorMsg ? (
             <Table.Row>
              <Table.Cell {...({ colSpan: 6 } as any)} className="text-center py-8">
                <Text className="text-ui-fg-error">{errorMsg}</Text>
              </Table.Cell>
            </Table.Row>
          ) : customersData.length > 0 ? (
            customersData.map((customer) => (
              <Table.Row 
                key={customer.id} 
                className="cursor-pointer hover:bg-ui-bg-base-hover transition-colors"
                onClick={() => navigate(`/a/customers/${customer.id}`)}
              >
                <Table.Cell className="font-medium text-ui-fg-interactive">
                  {customer.email || "-"}
                </Table.Cell>
                <Table.Cell>{customer.first_name || "-"}</Table.Cell>
                <Table.Cell>{customer.last_name || "-"}</Table.Cell>
                <Table.Cell className="text-center">{customer.order_count}</Table.Cell>
                <Table.Cell className="text-right font-bold">
                  Rp {customer.total_spent.toLocaleString("en-US")}
                </Table.Cell>
                <Table.Cell className="text-center">
                  <Button 
                    variant="secondary" 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      navigate(`/a/customers/${customer.id}`);
                    }}
                  >
                    View Profile
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell {...({ colSpan: 6 } as any)} className="text-center py-8">
                <Text className="text-ui-fg-subtle">No customer data found.</Text>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Container>
  )
}

export const config = defineRouteConfig({
  label: "Customer Spent",
  icon: CurrencyDollar,
})