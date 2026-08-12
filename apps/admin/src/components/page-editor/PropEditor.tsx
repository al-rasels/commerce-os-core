import type { PropSchema, SectionSchema } from "@commerceos/components"
import type { PageSection } from "@/lib/api/pages"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Database, X, Ban, Plus, Eye, EyeOff, Sparkles, Image as ImageIcon } from "lucide-react"
import { RichTextEditor } from "@/components/RichTextEditor"
import { sanitizeHtml } from "@commerceos/components"
import { Badge } from "@/components/ui/badge"

interface PropEditorProps {
  schema: SectionSchema
  section: PageSection
  onChange: (key: string, value: unknown) => void
  onRulesChange: (rules: { if: string; action: 'show' | 'hide' }[]) => void
  onStylesChange: (styles: Record<string, string>) => void
}

export function PropEditor({ schema, section, onChange, onRulesChange, onStylesChange }: PropEditorProps) {
  const renderPropInput = (propSchema: PropSchema) => {
    const value = section.props[propSchema.key]
    const isBound = value && typeof value === "object" && "$bind" in (value as any)
    const bindPath = isBound ? (value as any).$bind : ""
    const val = isBound ? "" : (value ?? propSchema.defaultValue ?? "")

    const toggleBind = () => {
      if (isBound) {
        onChange(propSchema.key, propSchema.defaultValue ?? "")
      } else {
        onChange(propSchema.key, { $bind: "product.title" })
      }
    }

    const renderHeader = () => (
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <Label className="text-xs font-semibold text-foreground">{propSchema.label}</Label>
          <code className="font-mono text-[10px] text-muted-foreground/70">{propSchema.key}</code>
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
        <div key={propSchema.key} className="flex flex-col gap-1.5 rounded-md border border-dashed border-primary/60 bg-primary/5 p-2.5 mb-4">
          {renderHeader()}
          <Input
            value={bindPath}
            placeholder="e.g. product.title or category.name"
            onChange={(e) => onChange(propSchema.key, { $bind: e.target.value })}
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

    switch (propSchema.type) {
      case "boolean":
        return (
          <div key={propSchema.key} className="flex items-center justify-between rounded-md border p-2.5 bg-card mb-4">
            <div className="flex flex-col gap-0.5">
              <Label className="text-xs font-semibold">{propSchema.label}</Label>
              {propSchema.description && (
                <span className="text-[11px] text-muted-foreground">{propSchema.description}</span>
              )}
            </div>
            <Switch checked={!!val} onCheckedChange={(checked) => onChange(propSchema.key, checked)} />
          </div>
        )
      case "select":
        return (
          <div key={propSchema.key} className="flex flex-col gap-1.5 mb-4">
            {renderHeader()}
            <Select value={String(val)} onValueChange={(v) => onChange(propSchema.key, v)}>
              <SelectTrigger className="w-full h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {propSchema.options?.map((opt: any) => (
                  <SelectItem key={opt.value} value={opt.value} className="text-xs">
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {propSchema.description && (
              <p className="text-[11px] text-muted-foreground">{propSchema.description}</p>
            )}
          </div>
        )
      case "number":
        return (
          <div key={propSchema.key} className="flex flex-col gap-1.5 mb-4">
            {renderHeader()}
            <Input
              type="number"
              value={val as number}
              placeholder={propSchema.placeholder}
              onChange={(e) => onChange(propSchema.key, Number(e.target.value))}
              className="h-8 text-xs font-mono"
            />
            {propSchema.description && (
              <p className="text-[11px] text-muted-foreground">{propSchema.description}</p>
            )}
          </div>
        )
      case "html":
        return (
          <div key={propSchema.key} className="flex flex-col gap-1.5 mb-4">
            {renderHeader()}
            <RichTextEditor
              value={String(val ?? "")}
              onChange={(html) => onChange(propSchema.key, sanitizeHtml(html))}
              placeholder={propSchema.placeholder}
            />
            {propSchema.description && (
              <p className="text-[11px] text-muted-foreground">{propSchema.description}</p>
            )}
          </div>
        )
      case "color":
        return (
          <div key={propSchema.key} className="flex flex-col gap-1.5 mb-4">
            {renderHeader()}
            <div className="flex gap-2 items-center">
              <input
                type="color"
                value={(val as string) || "#ffffff"}
                onChange={(e) => onChange(propSchema.key, e.target.value)}
                className="h-8 w-10 cursor-pointer rounded border border-input bg-transparent p-0.5"
              />
              <Input
                value={val as string}
                placeholder="#ffffff"
                onChange={(e) => onChange(propSchema.key, e.target.value)}
                className="font-mono text-xs h-8"
              />
            </div>
            {propSchema.description && (
              <p className="text-[11px] text-muted-foreground">{propSchema.description}</p>
            )}
          </div>
        )
      case "image":
        return (
          <div key={propSchema.key} className="flex flex-col gap-1.5 mb-4">
            {renderHeader()}
            <div className="relative flex items-center">
              <ImageIcon className="absolute left-2.5 size-3.5 text-muted-foreground" />
              <Input
                value={String(val ?? "")}
                placeholder={propSchema.placeholder || "https://images.unsplash.com/..."}
                onChange={(e) => onChange(propSchema.key, e.target.value)}
                className="h-8 pl-8 text-xs font-mono"
              />
            </div>
            {val && typeof val === "string" && val.startsWith("http") && (
              <div className="relative h-16 w-full overflow-hidden rounded-md border bg-muted/30">
                <img src={val} alt="Preview" className="h-full w-full object-cover" />
              </div>
            )}
            {propSchema.description && (
              <p className="text-[11px] text-muted-foreground">{propSchema.description}</p>
            )}
          </div>
        )
      case "string":
      default:
        return (
          <div key={propSchema.key} className="flex flex-col gap-1.5 mb-4">
            {renderHeader()}
            <Input
              value={String(val ?? "")}
              placeholder={propSchema.placeholder}
              onChange={(e) => onChange(propSchema.key, e.target.value)}
              className="h-8 text-xs"
            />
            {propSchema.description && (
              <p className="text-[11px] text-muted-foreground">{propSchema.description}</p>
            )}
          </div>
        )
    }
  }

  const styles = (section as any).options?.styles || {}

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-sm font-semibold">{schema.name}</h2>
        <p className="text-xs text-muted-foreground">{schema.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge variant="outline" className="text-[10px] font-mono">
            {section.component}
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1 text-[10px]">
            {section.visible ? <><Eye className="size-3" /> Visible</> : <><EyeOff className="size-3" /> Hidden</>}
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="content" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="styles">Styles</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="content" className="flex-1 pt-4 m-0 overflow-visible">
          {schema.props.length === 0 ? (
            <p className="text-sm text-muted-foreground">No content properties</p>
          ) : (
            schema.props.map(renderPropInput)
          )}
        </TabsContent>

        <TabsContent value="styles" className="flex-1 pt-4 m-0 overflow-visible">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label className="text-xs mb-1 block">Padding Top</Label>
                <Input 
                  placeholder="e.g. 4rem" 
                  value={styles.paddingTop || ''} 
                  onChange={e => onStylesChange({ ...styles, paddingTop: e.target.value })} 
                  className="h-8 text-xs"
                />
              </div>
              <div>
                <Label className="text-xs mb-1 block">Padding Bottom</Label>
                <Input 
                  placeholder="e.g. 4rem" 
                  value={styles.paddingBottom || ''} 
                  onChange={e => onStylesChange({ ...styles, paddingBottom: e.target.value })} 
                  className="h-8 text-xs"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Background Color</Label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={styles.backgroundColor || "#ffffff"}
                  onChange={e => onStylesChange({ ...styles, backgroundColor: e.target.value })}
                  className="h-8 w-10 p-0.5 cursor-pointer rounded border border-input"
                />
                <Input 
                  placeholder="e.g. #f3f4f6 or transparent" 
                  value={styles.backgroundColor || ''} 
                  onChange={e => onStylesChange({ ...styles, backgroundColor: e.target.value })} 
                  className="h-8 text-xs font-mono"
                />
              </div>
            </div>
            <div>
              <Label className="text-xs mb-1 block">Custom CSS Class</Label>
              <Input 
                placeholder="e.g. hidden md:block" 
                value={styles.customCssClass || ''} 
                onChange={e => onStylesChange({ ...styles, customCssClass: e.target.value })} 
                className="h-8 text-xs"
              />
              <p className="text-[10px] text-muted-foreground mt-1">Add Tailwind utility classes.</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="flex-1 pt-4 m-0 overflow-visible">
          <h3 className="text-sm font-semibold mb-2">Visibility Rules</h3>
          <div className="flex flex-col gap-3">
            {(section.rules || []).map((rule, idx) => (
              <div key={idx} className="flex flex-col gap-2 p-3 border rounded-md bg-muted/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold">Rule {idx + 1}</span>
                  <Button 
                    variant="ghost" 
                    size="icon-sm" 
                    className="h-6 w-6 text-destructive hover:bg-destructive/10"
                    onClick={() => {
                      const newRules = [...(section.rules || [])];
                      newRules.splice(idx, 1);
                      onRulesChange(newRules);
                    }}
                  >
                    <Ban className="size-3" />
                  </Button>
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-[10px] uppercase text-muted-foreground font-semibold mb-1 block">Condition (If)</label>
                    <input 
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="segment == 'vip'"
                      value={rule.if}
                      onChange={(e) => {
                        const newRules = [...(section.rules || [])];
                        newRules[idx].if = e.target.value;
                        onRulesChange(newRules);
                      }}
                    />
                  </div>
                  <div className="w-24">
                    <label className="text-[10px] uppercase text-muted-foreground font-semibold mb-1 block">Action</label>
                    <select 
                      className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      value={rule.action}
                      onChange={(e) => {
                        const newRules = [...(section.rules || [])];
                        newRules[idx].action = e.target.value as 'show' | 'hide';
                        onRulesChange(newRules);
                      }}
                    >
                      <option value="show">Show</option>
                      <option value="hide">Hide</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full text-xs h-8 mt-1 border-dashed"
              onClick={() => {
                const newRules = [...(section.rules || []), { if: '', action: 'hide' as const }];
                onRulesChange(newRules);
              }}
            >
              <Plus className="size-3 mr-1" /> Add Rule
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
