import { createContext, useContext, useEffect, useRef, useCallback, useState, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ShortcutDef {
  key: string
  ctrlOrMeta: boolean
  description: string
  handler: () => void
}

interface KeyboardShortcutsContextType {
  registerShortcut: (id: string, def: ShortcutDef) => void
  unregisterShortcut: (id: string) => void
  shortcuts: Map<string, ShortcutDef>
}

const KeyboardShortcutsContext = createContext<KeyboardShortcutsContextType | null>(null)

export function KeyboardShortcutsProvider({ children }: { children: ReactNode }) {
  const shortcutsRef = useRef(new Map<string, ShortcutDef>())
  const [open, setOpen] = useState(false)
  const [, forceRender] = useState(0)

  const registerShortcut = useCallback((id: string, def: ShortcutDef) => {
    shortcutsRef.current.set(id, def)
    forceRender(n => n + 1)
  }, [])

  const unregisterShortcut = useCallback((id: string) => {
    shortcutsRef.current.delete(id)
    forceRender(n => n + 1)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '/' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(o => !o)
        return
      }

      for (const [, def] of shortcutsRef.current) {
        const mod = def.ctrlOrMeta ? (e.metaKey || e.ctrlKey) : true
        if (e.key.toLowerCase() === def.key.toLowerCase() && mod) {
          e.preventDefault()
          def.handler()
          return
        }
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [open])

  return (
    <KeyboardShortcutsContext.Provider value={{ registerShortcut, unregisterShortcut, shortcuts: shortcutsRef.current }}>
      {children}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-2xl animate-in fade-in zoom-in-95" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <X className="size-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {Array.from(shortcutsRef.current.entries()).length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">No shortcuts registered.</p>
              ) : (
                Array.from(shortcutsRef.current.entries()).map(([id, def]) => (
                  <div key={id} className="flex items-center justify-between py-1.5">
                    <span className="text-sm">{def.description}</span>
                    <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                      {def.ctrlOrMeta && <span className="text-xs">{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+'}</span>}
                      <span>{def.key.toUpperCase()}</span>
                    </kbd>
                  </div>
                ))
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-4 pt-3 border-t text-center">
              Press <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1 font-mono text-[10px] font-medium"><span className="text-xs">{navigator.platform.includes('Mac') ? '⌘' : 'Ctrl+'}</span>/</kbd> to open this panel.
            </p>
          </div>
        </div>
      )}
    </KeyboardShortcutsContext.Provider>
  )
}

export function useKeyboardShortcut(id: string, def: ShortcutDef) {
  const ctx = useContext(KeyboardShortcutsContext)
  if (!ctx) throw new Error('useKeyboardShortcut must be used within KeyboardShortcutsProvider')

  useEffect(() => {
    ctx.registerShortcut(id, def)
    return () => ctx.unregisterShortcut(id)
  }, [id, def.key, def.ctrlOrMeta, def.description, def.handler, ctx])
}
