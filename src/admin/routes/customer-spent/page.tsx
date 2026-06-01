import { defineRouteConfig } from "@medusajs/admin-sdk"
import { CurrencyDollar } from "@medusajs/icons"
import { Container, Heading, Table, Text, Button } from "@medusajs/ui"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom" 

export default function CustomerSpentPage() {
  const [customersData, setCustomersData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  const navigate = useNavigate() 

  useEffect(() => {
    const fetchCustomerSpent = async () => {
      setIsLoading(true)
      try {
        // 🌟 SENSOR OTOMATIS: Anti Nyasar!
        // Jika jalan di localhost tapi BUKAN di port 9000 (berarti lagi di server Dev Admin), arahkan ke 9000.
        // Jika sudah di-deploy (Production), gunakan alamat bawaannya ("").
        const isLocalDev = typeof window !== "undefined" && window.location.hostname === "localhost" && window.location.port !== "9000"
        const baseUrl = isLocalDev ? "http://localhost:9000" : ""

        // Double Fetch: Tarik Kustomer & Tarik Order (Medusa tidak bisa memblokir ini)
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
          throw new Error("HTTP Error saat menarik data dari API")
        }

        const { customers } = await customersRes.json()
        const { orders } = await ordersRes.json()

        if (!customers || !orders) return

        // 🌟 KAWINKAN DATA: Hitung total order berdasarkan customer_id
        const calculatedCustomers = customers.map((customer: any) => {
          const customerOrders = orders.filter((o: any) => o.customer_id === customer.id)
          
          const totalSpent = customerOrders.reduce((sum: number, order: any) => {
            return sum + (order.total || 0)
          }, 0)

          return {
            ...customer,
            total_spent: totalSpent,
            order_count: customerOrders.length
          }
        })

        // Urutkan dari Sultan tertinggi ke terendah
        const sortedCustomers = calculatedCustomers.sort((a: any, b: any) => b.total_spent - a.total_spent)
        setCustomersData(sortedCustomers)
      } catch (error) {
        console.error("Failed to fetch Customer Spent data:", error)
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
                <Text className="text-ui-fg-subtle animate-pulse">Fetching and calculating records...</Text>
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