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

interface PropEditorProps {
  schema: PropSchema
  value: unknown
  onChange: (key: string, value: unknown) => void
}

export function PropEditor({ schema, value, onChange }: PropEditorProps) {
  const val = value ?? schema.defaultValue ?? ""

  switch (schema.type) {
    case "boolean":
      return (
        <div className="flex items-center justify-between">
          <Label className="text-sm">{schema.label}</Label>
          <Switch checked={!!val} onCheckedChange={(checked) => onChange(schema.key, checked)} />
        </div>
      )

    case "select":
      return (
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm">{schema.label}</Label>
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
          <Label className="text-sm">{schema.label}</Label>
          <Input
            type="number"
            value={val as number}
            placeholder={schema.placeholder}
            onChange={(e) => onChange(schema.key, Number(e.target.value))}
          />
        </div>
      )

    case "image":
    case "string":
    default:
      return (
        <div className="flex flex-col gap-1.5">
          <Label className="text-sm">{schema.label}</Label>
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
