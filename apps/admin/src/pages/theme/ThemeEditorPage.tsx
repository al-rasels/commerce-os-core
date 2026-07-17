import { useState, useMemo, useRef } from "react"
import { useTheme, useSaveThemeOverride } from "@/hooks/useTheme"
import { defaultTokens } from "@commerceos/design-tokens"
import type { DesignTokens, ColorTokens } from "@commerceos/design-tokens"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Paintbrush,
  Type,
  Ruler,
  CornerDownRight,
  Box,
  Sun,
  Moon,
  Save,
  RotateCcw,
  AlertTriangle,
  Eye,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

type ColorMode = "light" | "dark"

type SectionKey = "colors" | "typography" | "spacing" | "radii" | "shadows"

interface SettingRowProps {
  label: string
  value: string
  type?: "color" | "text"
  onChange: (value: string) => void
  onReset?: () => void
}

function SettingRow({ label, value, type = "text", onChange, onReset }: SettingRowProps) {
  const id = label.toLowerCase().replace(/\s+/g, "-")
  return (
    <div className="flex items-center justify-between gap-3 py-1.5">
      <Label htmlFor={id} className="min-w-28 text-xs font-medium text-muted-foreground shrink-0">
        {label}
      </Label>
      <div className="flex items-center gap-1.5 flex-1">
        {type === "color" ? (
          <div className="flex items-center gap-1.5 flex-1">
            <div className="relative">
              <input
                id={id}
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="size-7 cursor-pointer rounded border p-0.5"
              />
            </div>
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="h-7 font-mono text-xs flex-1 min-w-0"
            />
          </div>
        ) : (
          <Input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-7 text-xs flex-1 min-w-0 font-mono"
          />
        )}
        {onReset && (
          <button
            onClick={onReset}
            className="size-5 flex items-center justify-center rounded text-muted-foreground hover:text-foreground shrink-0"
            title="Reset to default"
          >
            <RotateCcw className="size-3" />
          </button>
        )}
      </div>
    </div>
  )
}

function SectionCard({
  sectionKey,
  title,
  icon: Icon,
  defaultOpen = false,
  children,
}: {
  sectionKey: SectionKey
  title: string
  icon: typeof Paintbrush
  defaultOpen?: boolean
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen || sectionKey === "colors" || sectionKey === "typography")

  return (
    <Card>
      <CardHeader
        className="cursor-pointer select-none px-4 py-3"
        onClick={() => setOpen((v) => !v)}
      >
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="size-4 text-muted-foreground" />
          {title}
          <span className="ml-auto">
            {open ? <ChevronDown className="size-3.5 text-muted-foreground" /> : <ChevronRight className="size-3.5 text-muted-foreground" />}
          </span>
        </CardTitle>
      </CardHeader>
      {open && <CardContent className="px-4 pb-4 pt-0">{children}</CardContent>}
    </Card>
  )
}

function PreviewCard({ resolvedTokens, mode }: { resolvedTokens: DesignTokens; mode: ColorMode }) {
  const previewRef = useRef<HTMLDivElement>(null)
  const c = resolvedTokens.colors[mode]
  const t = resolvedTokens.typography

  const cssVars = useMemo(() => ({
    "--p-surface": c.surface,
    "--p-surface-muted": c.surfaceMuted,
    "--p-text": c.text,
    "--p-text-muted": c.textMuted,
    "--p-border": c.border,
    "--p-primary": c.primary,
    "--p-primary-contrast": c.primaryContrast,
    "--p-accent": c.accent,
    "--p-accent-contrast": c.accentContrast,
    "--p-success": c.success,
    "--p-success-contrast": c.successContrast,
    "--p-warning": c.warning,
    "--p-warning-contrast": c.warningContrast,
    "--p-error": c.error,
    "--p-error-contrast": c.errorContrast,
    "--p-radius": resolvedTokens.radii.md,
    "--p-radius-lg": resolvedTokens.radii.lg,
    "--p-shadow": resolvedTokens.shadows.md,
    "--p-font-sans": t.fontFamilies.sans,
    "--p-font-heading": t.fontFamilies.heading,
    "--p-font-mono": t.fontFamilies.mono,
  } as React.CSSProperties), [c, resolvedTokens])

  return (
    <div
      ref={previewRef}
      style={cssVars}
      className="flex flex-col gap-4 rounded-xl p-5"
      data-mode={mode}
    >
      <style>{`
        .theme-preview {
          font-family: var(--p-font-sans);
          background: var(--p-surface);
          color: var(--p-text);
          border: 1px solid var(--p-border);
          border-radius: var(--p-radius-lg);
        }
        .theme-preview h1, .theme-preview h2, .theme-preview h3 {
          font-family: var(--p-font-heading);
        }
        .theme-preview .preview-surface-muted { background: var(--p-surface-muted); }
        .theme-preview .preview-text-muted { color: var(--p-text-muted); }
      `}</style>
      <div className="theme-preview overflow-hidden">
        <div className="flex items-center justify-between border-b border-[var(--p-border)] px-5 py-3">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded" style={{ background: "var(--p-primary)" }} />
            <span className="text-sm font-semibold">Storefront</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs preview-text-muted">Catalog</span>
            <span className="text-xs preview-text-muted">Cart</span>
            <div className="size-6 rounded-full" style={{ background: "var(--p-accent)" }} />
          </div>
        </div>
        <div className="p-5">
          <div className="mb-4">
            <Badge style={{ background: "var(--p-accent)", color: "var(--p-accent-contrast)" }}>
              New Arrival
            </Badge>
          </div>
          <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "var(--p-font-heading)" }}>
            Summer Collection
          </h1>
          <p className="text-sm preview-text-muted mb-5">
            Lightweight designs for warm days
          </p>
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="preview-surface-muted rounded-lg p-3"
                style={{ borderRadius: "var(--p-radius)" }}
              >
                <div
                  className="w-full aspect-square rounded-md mb-2"
                  style={{ background: `var(--p-border)` }}
                />
                <div className="h-2 rounded w-3/4 mb-1" style={{ background: "var(--p-text)" }} />
                <div className="h-2 rounded w-1/2" style={{ background: "var(--p-text-muted)" }} />
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 rounded-lg px-4 py-2 text-sm font-medium border-none cursor-pointer"
              style={{
                background: "var(--p-primary)",
                color: "var(--p-primary-contrast)",
                borderRadius: "var(--p-radius-lg)",
              }}
            >
              Shop Now
            </button>
            <button
              className="flex-1 rounded-lg px-4 py-2 text-sm font-medium border cursor-pointer"
              style={{
                background: "transparent",
                color: "var(--p-text)",
                borderColor: "var(--p-border)",
                borderRadius: "var(--p-radius-lg)",
              }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      <div className="theme-preview p-4">
        <h2 className="text-base font-semibold mb-3">Component Preview</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="rounded-full px-3 py-1 text-xs font-medium" style={{ background: "var(--p-primary)", color: "var(--p-primary-contrast)" }}>
            Badge
          </span>
          <span className="rounded-full px-3 py-1 text-xs font-medium border" style={{ borderColor: "var(--p-border)", color: "var(--p-text)" }}>
            Outline
          </span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <div className="size-8 rounded-full" style={{ background: "var(--p-accent)" }} />
          <div className="flex-1">
            <div className="h-2 rounded w-24 mb-1" style={{ background: "var(--p-text)" }} />
            <div className="h-2 rounded w-32" style={{ background: "var(--p-text-muted)" }} />
          </div>
        </div>
        <div className="rounded-lg p-3" style={{ background: "var(--p-success)", color: "var(--p-success-contrast)" }}>
          <span className="text-sm font-medium">Order confirmed ✓</span>
        </div>
        <div className="rounded-lg p-3 mt-2" style={{ background: "var(--p-error)", color: "var(--p-error-contrast)" }}>
          <span className="text-sm font-medium">Payment failed ✗</span>
        </div>
      </div>

      <div className="theme-preview p-4">
        <h2 className="text-base font-semibold mb-3">Typography Scale</h2>
        {(["2xl", "xl", "lg", "base", "sm", "xs"] as const).map((s) => {
          const val = resolvedTokens.typography.fontSizes[s]
          return (
            <div key={s} className="flex items-center gap-3 py-0.5">
              <span className="w-8 text-xs preview-text-muted uppercase">{s}</span>
              <span style={{ fontSize: val }} className="truncate">
                The quick brown fox
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ColorsSection({
  colors,
  onChange,
  defaultColors,
}: {
  colors: ColorTokens
  onChange: (key: keyof ColorTokens, value: string) => void
  defaultColors: ColorTokens
}) {
  const entries = Object.entries(colors) as [keyof ColorTokens, string][]
  return (
    <div className="space-y-0.5">
      {entries.map(([key, value]) => (
        <SettingRow
          key={key}
          label={key}
          value={value}
          type="color"
          onChange={(v) => onChange(key, v)}
          onReset={value !== defaultColors[key] ? () => onChange(key, defaultColors[key]) : undefined}
        />
      ))}
    </div>
  )
}

function TypographySection({
  typography,
  onChange,
  defaultTypography,
}: {
  typography: DesignTokens["typography"]
  onChange: (path: string[], value: string) => void
  defaultTypography: DesignTokens["typography"]
}) {
  const subSections: { key: keyof typeof typography; label: string }[] = [
    { key: "fontFamilies", label: "Font Families" },
    { key: "fontSizes", label: "Font Sizes" },
    { key: "fontWeights", label: "Font Weights" },
    { key: "lineHeights", label: "Line Heights" },
    { key: "letterSpacings", label: "Letter Spacings" },
  ]

  return (
    <div className="space-y-4">
      {subSections.map(({ key, label }) => {
        const group = typography[key] as Record<string, string>
        const defaults = defaultTypography[key] as Record<string, string>
        return (
          <div key={key}>
            <h4 className="text-xs font-medium text-muted-foreground mb-1 uppercase tracking-wider">{label}</h4>
            <div className="space-y-0.5">
              {Object.entries(group).map(([k, v]) => (
                <SettingRow
                  key={k}
                  label={k}
                  value={v}
                  onChange={(nv) => onChange([key, k], nv)}
                  onReset={v !== defaults[k] ? () => onChange([key, k], defaults[k]) : undefined}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function FlattenedSection({
  group,
  defaults,
  onChange,
}: {
  group: Record<string, string>
  defaults: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  const keys = Object.keys(group)
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-0.5">
      {keys.slice(0, 12).map((key) => (
        <SettingRow
          key={key}
          label={key}
          value={group[key]}
          onChange={(v) => onChange(key, v)}
          onReset={group[key] !== defaults[key] ? () => onChange(key, defaults[key]) : undefined}
        />
      ))}
      {keys.length > 12 && (
        <details className="col-span-2 mt-1">
          <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
            Show all {keys.length} values
          </summary>
          <div className="mt-1 space-y-0.5 col-span-2">
            {keys.slice(12).map((key) => (
              <SettingRow
                key={key}
                label={key}
                value={group[key]}
                onChange={(v) => onChange(key, v)}
                onReset={group[key] !== defaults[key] ? () => onChange(key, defaults[key]) : undefined}
              />
            ))}
          </div>
        </details>
      )}
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="flex gap-6 h-[calc(100vh-5rem)]">
      <div className="w-[420px] shrink-0 space-y-4 overflow-auto pr-2">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="px-4 py-3">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent className="px-4 pb-4 space-y-2">
              {[1, 2, 3].map((j) => (
                <Skeleton key={j} className="h-7 w-full" />
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex-1">
        <Skeleton className="h-full w-full rounded-xl" />
      </div>
    </div>
  )
}

function deepMergeDesignTokens(base: DesignTokens, override: Record<string, unknown>): DesignTokens {
  const merged = structuredClone(base)
  const ov = override as Partial<DesignTokens>
  if (ov.colors) {
    if (ov.colors.light) Object.assign(merged.colors.light, ov.colors.light)
    if (ov.colors.dark) Object.assign(merged.colors.dark, ov.colors.dark)
  }
  if (ov.typography) {
    if (ov.typography.fontFamilies) Object.assign(merged.typography.fontFamilies, ov.typography.fontFamilies)
    if (ov.typography.fontSizes) Object.assign(merged.typography.fontSizes, ov.typography.fontSizes)
    if (ov.typography.fontWeights) Object.assign(merged.typography.fontWeights, ov.typography.fontWeights)
    if (ov.typography.lineHeights) Object.assign(merged.typography.lineHeights, ov.typography.lineHeights)
    if (ov.typography.letterSpacings) Object.assign(merged.typography.letterSpacings, ov.typography.letterSpacings)
  }
  if (ov.spacing) Object.assign(merged.spacing, ov.spacing)
  if (ov.radii) Object.assign(merged.radii, ov.radii)
  if (ov.shadows) Object.assign(merged.shadows, ov.shadows)
  return merged
}

export default function ThemeEditorPage() {
  const { data: resolved, isLoading, isError, error } = useTheme()
  const saveOverride = useSaveThemeOverride()

  const [mode, setMode] = useState<ColorMode>("light")
  const [draftOverride, setDraftOverride] = useState<Record<string, unknown>>({})
  const [dirty, setDirty] = useState(false)
  const [saving, setSaving] = useState(false)

  const baseTokens = useMemo(() => {
    if (!resolved?.tokens) return defaultTokens
    return deepMergeDesignTokens(defaultTokens, resolved.tokens as Record<string, unknown>)
  }, [resolved])

  const resolvedTokens = useMemo(() => {
    return deepMergeDesignTokens(baseTokens, draftOverride)
  }, [baseTokens, draftOverride])

  function setOverride(path: string[], value: string) {
    setDraftOverride((prev) => {
      const next = structuredClone(prev) as Record<string, unknown>
      let obj = next
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i]
        if (!obj[key] || typeof obj[key] !== "object") obj[key] = {}
        obj = obj[key] as Record<string, unknown>
      }
      obj[path[path.length - 1]] = value
      return next
    })
    setDirty(true)
  }

  function setColorsOverride(key: keyof ColorTokens, value: string) {
    setOverride(["colors", mode, key], value)
  }

  function setTypographyOverride(path: string[], value: string) {
    setOverride(["typography", ...path], value)
  }

  function setSpacingOverride(key: string, value: string) {
    setOverride(["spacing", key], value)
  }

  function setRadiiOverride(key: string, value: string) {
    setOverride(["radii", key], value)
  }

  function setShadowsOverride(key: string, value: string) {
    setOverride(["shadows", key], value)
  }

  function resetAll() {
    setDraftOverride({})
    setDirty(true)
  }

  async function handleSave() {
    if (!resolved?.id) return
    setSaving(true)
    try {
      await saveOverride.mutateAsync({
        themeBaseId: resolved.id,
        overridesJson: draftOverride,
      })
      setDirty(false)
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <LoadingSkeleton />
  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle>Failed to load theme</AlertTitle>
        <AlertDescription>{(error as Error)?.message ?? "Unknown error"}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4.5rem)]">
      <header className="flex items-center justify-between shrink-0 mb-4">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-semibold">Theme Editor</h1>
          <Badge variant="secondary" className="text-xs font-mono">
            v{resolved?.version ?? "?"}
          </Badge>
          {resolved?.conflicts && resolved.conflicts.length > 0 && (
            <Badge variant="destructive" className="text-xs gap-1">
              <AlertTriangle className="size-3" />
              {resolved.conflicts.length} conflict{resolved.conflicts.length > 1 ? "s" : ""}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={resetAll} disabled={!dirty}>
            <RotateCcw className="size-3.5" />
            Reset edits
          </Button>
          <Button size="sm" onClick={handleSave} disabled={!dirty || saving}>
            <Save className="size-3.5" />
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </header>

      {resolved?.conflicts && resolved.conflicts.length > 0 && (
        <Alert className="mb-4">
          <AlertTriangle className="size-4" />
          <AlertTitle className="text-sm">Conflicts Detected</AlertTitle>
          <AlertDescription className="text-xs">
            The following tokens from the base theme conflict with existing overrides and have been excluded:
            <ul className="mt-1 list-disc pl-4">
              {resolved.conflicts.map((c: string) => (
                <li key={c} className="font-mono text-xs">{c}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-6 flex-1 min-h-0">
        <ScrollArea className="w-[440px] shrink-0 pr-3">
          <div className="space-y-3">
            <SectionCard sectionKey="colors" title="Colors" icon={Paintbrush} defaultOpen>
              <Tabs value={mode} onValueChange={(v) => setMode(v as ColorMode)} className="mb-3">
                <TabsList className="h-8">
                  <TabsTrigger value="light" className="text-xs gap-1">
                    <Sun className="size-3" />
                    Light
                  </TabsTrigger>
                  <TabsTrigger value="dark" className="text-xs gap-1">
                    <Moon className="size-3" />
                    Dark
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <ColorsSection
                colors={resolvedTokens.colors[mode]}
                onChange={setColorsOverride}
                defaultColors={baseTokens.colors[mode]}
              />
            </SectionCard>

            <SectionCard sectionKey="typography" title="Typography" icon={Type} defaultOpen>
              <TypographySection
                typography={resolvedTokens.typography}
                onChange={setTypographyOverride}
                defaultTypography={baseTokens.typography}
              />
            </SectionCard>

            <SectionCard sectionKey="spacing" title="Spacing" icon={Ruler}>
              <FlattenedSection
                group={resolvedTokens.spacing as unknown as Record<string, string>}
                defaults={baseTokens.spacing as unknown as Record<string, string>}
                onChange={setSpacingOverride}
              />
            </SectionCard>

            <SectionCard sectionKey="radii" title="Corners" icon={CornerDownRight}>
              <FlattenedSection
                group={resolvedTokens.radii as unknown as Record<string, string>}
                defaults={baseTokens.radii as unknown as Record<string, string>}
                onChange={setRadiiOverride}
              />
            </SectionCard>

            <SectionCard sectionKey="shadows" title="Shadows" icon={Box}>
              <FlattenedSection
                group={resolvedTokens.shadows as unknown as Record<string, string>}
                defaults={baseTokens.shadows as unknown as Record<string, string>}
                onChange={setShadowsOverride}
              />
            </SectionCard>
          </div>
        </ScrollArea>

        <ScrollArea className="flex-1">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
              <Eye className="size-3.5" />
              Preview
              <Badge variant="outline" className="text-[10px] gap-1 ml-auto">
                {mode === "light" ? <Sun className="size-3" /> : <Moon className="size-3" />}
                {mode === "light" ? "Light" : "Dark"}
              </Badge>
            </div>
            <PreviewCard resolvedTokens={resolvedTokens} mode={mode} />
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
