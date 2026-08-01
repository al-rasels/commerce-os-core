import type { PropSchema } from "@commerceos/components"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Database, X } from "lucide-react"
import { RichTextEditor } from "@/components/RichTextEditor"
import { sanitizeHtml } from "@commerceos/components"

interface PropEditorProps {
  schema: PropSchema
  value: unknown
  onChange: (key: string, value: unknown) => void
}

export function PropEditor({ schema, value, onChange }: PropEditorProps) {
  const isBound = value && typeof value === "object" && "$bind" in (value as any)
  const bindPath = isBound ? (value as any).$bind : ""

  const val = isBound ? "" : (value ?? schema.defaultValue ?? "")

  const toggleBind = () => {
    if (isBound) {
      onChange(schema.key, schema.defaultValue ?? "")
    } else {
      onChange(schema.key, { $bind: "" })
    }
  }

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-1.5">
      <Label className="text-sm">{schema.label}</Label>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 text-muted-foreground hover:text-foreground"
        onClick={toggleBind}
        title={isBound ? "Remove data binding" : "Bind to data"}
      >
        {isBound ? <X className="h-3 w-3" /> : <Database className="h-3 w-3" />}
      </Button>
    </div>
  )

  const renderBoundInput = () => (
    <div className="flex flex-col gap-1.5">
      {renderHeader()}
      <Input
        value={bindPath}
        placeholder="e.g. product.title"
        onChange={(e) => onChange(schema.key, { $bind: e.target.value })}
        className="font-mono text-xs border-dashed border-primary"
      />
      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Data Bound</p>
    </div>
  )

  if (isBound) {
    return renderBoundInput()
  }

  switch (schema.type) {
    case "boolean":
      return (
        <div>
          {renderHeader()}
          <div className="flex items-center">
            <Switch checked={!!val} onCheckedChange={(checked) => onChange(schema.key, checked)} />
          </div>
        </div>
      )

    case "select":
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <Select
            value={String(val)}
            onValueChange={(v) => onChange(schema.key, v)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {schema.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )

    case "number":
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <Input
            type="number"
            value={val as number}
            placeholder={schema.placeholder}
            onChange={(e) => onChange(schema.key, Number(e.target.value))}
          />
        </div>
      )

    case "html":
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <RichTextEditor
            value={val as string}
            onChange={(html) => onChange(schema.key, sanitizeHtml(html))}
            placeholder={schema.placeholder}
          />
          {schema.description && (
            <p className="text-xs text-muted-foreground">{schema.description}</p>
          )}
        </div>
      )

    case "image":
    case "string":
    default:
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <Input
            value={val as string}
            placeholder={schema.placeholder}
            onChange={(e) => onChange(schema.key, e.target.value)}
          />
          {schema.description && (
            <p className="text-xs text-muted-foreground">{schema.description}</p>
          )}
        </div>
      )
  }
}
