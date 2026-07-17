import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table"
import { FileEdit, Layout } from "lucide-react"

const knownPages = [
  { key: "home", label: "Home", description: "Main landing page" },
  { key: "about", label: "About", description: "About us page" },
  { key: "contact", label: "Contact", description: "Contact form and information" },
  { key: "faq", label: "FAQ", description: "Frequently asked questions" },
  { key: "shipping", label: "Shipping", description: "Shipping policy" },
  { key: "returns", label: "Returns", description: "Return policy" },
]

export default function PageLayoutListPage() {
  const navigate = useNavigate()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layout className="size-5 text-muted-foreground" />
            <CardTitle>Page Layouts</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-28">Status</TableHead>
              <TableHead className="w-20 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {knownPages.map((page) => (
              <TableRow key={page.key}>
                <TableCell className="font-medium capitalize">{page.label}</TableCell>
                <TableCell className="text-muted-foreground">{page.description}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-xs">Draft</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => navigate(`/settings/pages/${page.key}`)}
                    title={`Edit ${page.label}`}
                  >
                    <FileEdit className="size-3.5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
