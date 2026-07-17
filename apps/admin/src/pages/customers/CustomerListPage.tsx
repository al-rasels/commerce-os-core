import { useState } from "react"
import { Link } from "react-router-dom"
import { useCustomers } from "@/hooks/useCustomers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { Search, ChevronLeft, ChevronRight, Plus } from "lucide-react"

const PAGE_SIZE = 10

export default function CustomerListPage() {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)

  const { data, isLoading } = useCustomers({ search: search || undefined, page: page + 1, limit: PAGE_SIZE })

  const customers = data?.data ?? []
  const total = data?.total ?? 0
  const pageCount = Math.ceil(total / PAGE_SIZE)

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Customers</CardTitle>
          <Link to="/customers/new">
            <Button size="sm">
              <Plus className="size-4" />
              New Customer
            </Button>
          </Link>
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-8"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  Loading...
                </TableCell>
              </TableRow>
            ) : customers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No customers found
                </TableCell>
              </TableRow>
            ) : (
              customers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <Link to={`/customers/${customer.id}`} className="hover:underline">
                      {customer.email}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {[customer.first_name, customer.last_name].filter(Boolean).join(" ") || "—"}
                  </TableCell>
                  <TableCell>{customer._count?.orders ?? 0}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        {pageCount > 1 && (
          <div className="flex items-center justify-between pt-4 text-sm text-muted-foreground">
            <span>{total} customer{total !== 1 ? "s" : ""}</span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon-sm" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="size-4" />
              </Button>
              <span className="px-2">{page + 1} / {pageCount}</span>
              <Button variant="ghost" size="icon-sm" disabled={page >= pageCount - 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
