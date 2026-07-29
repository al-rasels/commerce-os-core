import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function PriceListsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Price Lists</h1>
          <p className="text-sm text-muted-foreground">Manage volume discounts and wholesale pricing structures.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Price List
        </Button>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <p>The backend API for Price Lists is pending implementation.</p>
          <p className="text-xs">Phase 1 MVP - B2B Scaffold</p>
        </div>
      </div>
    </div>
  );
}
