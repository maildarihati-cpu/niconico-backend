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
        // 🌟 PERBAIKAN 1: Hapus import SDK, kita pakai fetch bawaan browser!
        // Karena jalan di Admin, ini otomatis ter-otentikasi.
        const res = await fetch(`/admin/customers?fields=*orders,*orders.total&limit=50`)
        const response = await res.json()

        if (!response.customers) return

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

        // 🌟 PERBAIKAN 2: Tambahkan tipe data (a: any, b: any) biar TypeScript gak ngomel
        const sortedCustomers = calculatedCustomers.sort((a: any, b: any) => b.total_spent - a.total_spent)
        setCustomersData(sortedCustomers)
      } catch (error) {
        console.error("Gagal menarik data Customer Spent:", error)
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
          Pantau total pembelanjaan kustomer. Klik baris kustomer untuk melihat detail pesanan mereka.
        </Text>
      </div>

      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Email Kustomer</Table.HeaderCell>
            <Table.HeaderCell>Nama Depan</Table.HeaderCell>
            <Table.HeaderCell>Nama Belakang</Table.HeaderCell>
            <Table.HeaderCell className="text-center">Total Order</Table.HeaderCell>
            <Table.HeaderCell className="text-right">Total Spent (Rp)</Table.HeaderCell>
            <Table.HeaderCell className="text-center">Aksi</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {isLoading ? (
            <Table.Row>
              {/* 🌟 PERBAIKAN 3: Akali TypeScript dengan (...{ colSpan: 6 } as any) */}
              <Table.Cell {...({ colSpan: 6 } as any)} className="text-center py-8">
                <Text className="text-ui-fg-subtle animate-pulse">Menghitung total transaksi...</Text>
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
                  {customer.total_spent.toLocaleString("id-ID")}
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
                    Lihat Profil
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              {/* 🌟 PERBAIKAN 3: Akali TypeScript dengan (...{ colSpan: 6 } as any) */}
              <Table.Cell {...({ colSpan: 6 } as any)} className="text-center py-8">
                <Text className="text-ui-fg-subtle">Belum ada data kustomer.</Text>
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