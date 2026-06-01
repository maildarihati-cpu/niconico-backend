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
        // 🌟 OBAT AMPUH: Tambahkan credentials: "include" 
        // Supaya sesi Admin kita diakui oleh server Medusa!
        const res = await fetch(`/admin/customers?fields=*orders,*orders.total&limit=50`, {
          credentials: "include", 
          headers: {
            "Accept": "application/json"
          }
        })

        if (!res.ok) {
          console.error("HTTP Error:", res.status, await res.text())
          return
        }

        const response = await res.json()

        if (!response.customers) {
          console.log("No customers found in the response.")
          return
        }

        const calculatedCustomers = response.customers.map((customer: any) => {
          const totalSpent = customer.orders?.reduce((sum: number, order: any) => {
            return sum + (order.total || 0)
          }, 0) || 0

          return {
            ...customer,
            total_spent: totalSpent,
            order_count: customer.orders?.length || 0
          }
        })

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
                <Text className="text-ui-fg-subtle animate-pulse">Calculating total transactions...</Text>
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
                  {customer.email}
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