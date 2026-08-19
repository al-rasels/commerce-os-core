import React, { useState, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { PAGE_KEY_CATALOG, type PageKeyCatalogEntry } from "@commerceos/shared-types";
import { Search, LayoutTemplate, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateLibraryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (pageKey: string) => void;
}

export function TemplateLibraryModal({
  open,
  onOpenChange,
  onSelectTemplate,
}: TemplateLibraryModalProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Standard", "Fashion", "Tech", "B2B", "Beauty", "Grocery", "Luxury", "Digital"];

  const filtered = useMemo(() => {
    return PAGE_KEY_CATALOG.filter((entry) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        !q ||
        entry.label.toLowerCase().includes(q) ||
        entry.description.toLowerCase().includes(q) ||
        entry.key.toLowerCase().includes(q);
      const matchesCategory = activeCategory === "All" || entry.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="size-5 text-primary" />
            <DialogTitle className="text-lg">Pre-Built Template Library</DialogTitle>
          </div>
          <DialogDescription className="text-xs">
            Select a pre-built industry template to initialize or replace your current layout.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2 flex-1 overflow-hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search templates by industry, name, or key..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 pl-8 text-xs"
            />
          </div>

          <div className="flex flex-wrap gap-1 border-b pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-2.5 py-1 text-[11px] rounded-md font-medium transition-colors",
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <ScrollArea className="flex-1 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
              {filtered.map((tmpl: PageKeyCatalogEntry) => (
                <div
                  key={tmpl.key}
                  onClick={() => {
                    onSelectTemplate(tmpl.key);
                    onOpenChange(false);
                  }}
                  className="group flex flex-col justify-between p-3.5 rounded-xl border bg-card hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="size-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                        <LayoutTemplate className="size-4" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                          {tmpl.label}
                        </h4>
                        <span className="font-mono text-[9px] text-muted-foreground">
                          {tmpl.route}
                        </span>
                      </div>
                    </div>
                    {tmpl.category && (
                      <Badge variant="outline" className="text-[9px] font-mono">
                        {tmpl.category}
                      </Badge>
                    )}
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-2 line-clamp-2">
                    {tmpl.description}
                  </p>
                  <div className="mt-3 pt-2 border-t flex items-center justify-between text-[10px] text-primary font-semibold">
                    <span>Load Template</span>
                    <CheckCircle2 className="size-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}
