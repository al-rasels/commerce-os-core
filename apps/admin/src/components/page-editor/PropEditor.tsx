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
import { Database, X, Image as ImageIcon, Sparkles } from "lucide-react"
import { RichTextEditor } from "@/components/RichTextEditor"
import { sanitizeHtml } from "@commerceos/components"

interface PropEditorProps {
  schema: PropSchema
  value: unknown
  onChange: (key: string, value: unknown) => void
}

export function PropEditor({ schema, value, onChange }: PropEditorProps) {
  const isBound = value && typeof value === "object" && "$bind" in (value as Record<string, unknown>)
  const bindPath = isBound ? String((value as Record<string, unknown>).$bind ?? "") : ""

  const val = isBound ? "" : (value ?? schema.defaultValue ?? "")

  const toggleBind = () => {
    if (isBound) {
      onChange(schema.key, schema.defaultValue ?? "")
    } else {
      onChange(schema.key, { $bind: "product.title" })
    }
  }

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-1">
      <div className="flex items-center gap-1.5">
        <Label className="text-xs font-semibold text-foreground">{schema.label}</Label>
        <code className="font-mono text-[10px] text-muted-foreground/70">{schema.key}</code>
      </div>
      <Button
        variant={isBound ? "default" : "ghost"}
        size="icon-xs"
        className={`h-5 px-1.5 text-[10px] gap-1 font-mono ${
          isBound ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
        }`}
        onClick={toggleBind}
        title={isBound ? "Remove dynamic data binding" : "Bind to context variable ($bind)"}
      >
        {isBound ? <X className="size-3" /> : <Database className="size-3" />}
        {isBound ? "Bound" : "Bind"}
      </Button>
    </div>
  )

  if (isBound) {
    return (
      <div className="flex flex-col gap-1.5 rounded-md border border-dashed border-primary/60 bg-primary/5 p-2.5">
        {renderHeader()}
        <Input
          value={bindPath}
          placeholder="e.g. product.title or category.name"
          onChange={(e) => onChange(schema.key, { $bind: e.target.value })}
          className="font-mono text-xs border-primary/40 bg-background shadow-2xs h-8"
        />
        <div className="flex items-center justify-between text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1 text-primary font-medium">
            <Sparkles className="size-3" /> Dynamically resolved from context
          </span>
          <span className="font-mono">$bind</span>
        </div>
      </div>
    )
  }

  switch (schema.type) {
    case "boolean":
      return (
        <div className="flex items-center justify-between rounded-md border p-2.5 bg-card">
          <div className="flex flex-col gap-0.5">
            <Label className="text-xs font-semibold">{schema.label}</Label>
            {schema.description && (
              <span className="text-[11px] text-muted-foreground">{schema.description}</span>
            )}
          </div>
          <Switch checked={!!val} onCheckedChange={(checked) => onChange(schema.key, checked)} />
        </div>
      )

    case "select":
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <Select value={String(val)} onValueChange={(v) => onChange(schema.key, v)}>
            <SelectTrigger className="w-full h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {schema.options?.map((opt) => (
                <SelectItem key={opt.value} value={opt.value} className="text-xs">
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {schema.description && (
            <p className="text-[11px] text-muted-foreground">{schema.description}</p>
          )}
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
            className="h-8 text-xs font-mono"
          />
          {schema.description && (
            <p className="text-[11px] text-muted-foreground">{schema.description}</p>
          )}
        </div>
      )

    case "html":
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <RichTextEditor
            value={String(val ?? "")}
            onChange={(html) => onChange(schema.key, sanitizeHtml(html))}
            placeholder={schema.placeholder}
          />
          {schema.description && (
            <p className="text-[11px] text-muted-foreground">{schema.description}</p>
          )}
        </div>
      )

    case "image":
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <div className="relative flex items-center">
            <ImageIcon className="absolute left-2.5 size-3.5 text-muted-foreground" />
            <Input
              value={String(val ?? "")}
              placeholder={schema.placeholder || "https://images.unsplash.com/..."}
              onChange={(e) => onChange(schema.key, e.target.value)}
              className="h-8 pl-8 text-xs font-mono"
            />
          </div>
          {val && typeof val === "string" && val.startsWith("http") && (
            <div className="relative h-16 w-full overflow-hidden rounded-md border bg-muted/30">
              <img src={val} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
          {schema.description && (
            <p className="text-[11px] text-muted-foreground">{schema.description}</p>
          )}
        </div>
      )

    case "string":
    default:
      return (
        <div className="flex flex-col gap-1.5">
          {renderHeader()}
          <Input
            value={String(val ?? "")}
            placeholder={schema.placeholder}
            onChange={(e) => onChange(schema.key, e.target.value)}
            className="h-8 text-xs"
          />
          {schema.description && (
            <p className="text-[11px] text-muted-foreground">{schema.description}</p>
          )}
        </div>
      )
  }
}
