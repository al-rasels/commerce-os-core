import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { useCompanyProfiles } from "@/hooks/useB2B";

export default function CompanyProfilesListPage() {
  const { data: profiles, isLoading } = useCompanyProfiles();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Company Profiles</h1>
          <p className="text-sm text-muted-foreground">Manage B2B wholesale customers and their net terms.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Company
        </Button>
      </div>

      {isLoading ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : profiles?.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-muted-foreground">
          <div className="flex flex-col items-center gap-2">
            <p>No company profiles found.</p>
            <p className="text-xs">Click "Add Company" to create one.</p>
          </div>
        </div>
      ) : (
        <div className="rounded-md border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50 text-left text-sm">
                <th className="py-2 px-3 font-medium">Company Name</th>
                <th className="py-2 px-3 font-medium">Status</th>
                <th className="py-2 px-3 font-medium">Credit Limit</th>
                <th className="py-2 px-3 font-medium text-right">Payment Terms</th>
              </tr>
            </thead>
            <tbody>
              {profiles?.map((profile) => (
                <tr key={profile.id} className="border-b">
                  <td className="py-2 px-3">{profile.name}</td>
                  <td className="py-2 px-3 capitalize">{profile.status}</td>
                  <td className="py-2 px-3">
                    {profile.credit_limit_cents
                      ? `$${(profile.credit_limit_cents / 100).toFixed(2)}`
                      : 'None'}
                  </td>
                  <td className="py-2 px-3 text-right">{profile.payment_terms}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
