import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function DraftOrdersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Draft Orders</h1>
          <p className="text-sm text-muted-foreground">Manage B2B wholesale order approvals and quotes.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Draft
        </Button>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <p>The backend API for Draft Orders is pending implementation.</p>
          <p className="text-xs">Phase 1 MVP - B2B Scaffold</p>
        </div>
      </div>
    </div>
  );
}
