import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ReturnsListPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Returns (RMA)</h1>
          <p className="text-sm text-muted-foreground">Manage customer return requests and condition grading.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Return
        </Button>
      </div>
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
        <div className="flex flex-col items-center gap-2">
          <p>The backend API for Returns is pending implementation.</p>
          <p className="text-xs">Phase 1 MVP - Returns Scaffold</p>
        </div>
      </div>
    </div>
  );
}
