import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useLocations } from "@/hooks/useInventory";

export default function LocationsListPage() {
  const { data: locations, isLoading } = useLocations();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Locations</h1>
          <p className="text-sm text-muted-foreground">Manage warehouses, retail stores, and fulfillment centers.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : locations?.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>No locations found.</p>
            <p className="text-xs">Click "Add Location" to create one.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-sm">
                <th className="py-2 px-3 font-medium">Location Name</th>
                <th className="py-2 px-3 font-medium">City</th>
                <th className="py-2 px-3 font-medium">Country</th>
                <th className="py-2 px-3 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {locations?.map((loc) => (
                <tr key={loc.id} className="border-b">
                  <td className="py-2 px-3">{loc.name}</td>
                  <td className="py-2 px-3">{loc.city || '-'}</td>
                  <td className="py-2 px-3">{loc.country || '-'}</td>
                  <td className="py-2 px-3 text-right">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${loc.is_active ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      {loc.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
