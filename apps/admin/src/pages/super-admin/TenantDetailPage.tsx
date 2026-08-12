import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { superAdminApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export function TenantDetailPage() {
  const { id } = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [updatingPlan, setUpdatingPlan] = useState(false);

  const load = useCallback(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    superAdminApi.getTenant(id)
      .then(setTenant)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSuspend = async () => {
    if (!id) return;
    try {
      await superAdminApi.suspendTenant(id);
      load();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleToggleFlag = async (key: string, is_enabled: boolean) => {
    if (!id) return;
    try {
      await superAdminApi.toggleFlag(id, key, !is_enabled);
      load();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleUpdatePlan = async () => {
    if (!id || !selectedPlan) return;
    setUpdatingPlan(true);
    try {
      await superAdminApi.updatePlan(id, selectedPlan);
      toast.success('Plan updated successfully');
      setIsPlanDialogOpen(false);
      load();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update plan');
    } finally {
      setUpdatingPlan(false);
    }
  };

  if (error) return <div className="text-destructive font-medium p-4">{error}</div>;
  if (loading) return <div>Loading...</div>;
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
          <div className="flex gap-2 mt-2 items-center">
            <Badge variant="outline" className="capitalize">{tenant.plan_id} Plan</Badge>
            
            <Dialog open={isPlanDialogOpen} onOpenChange={setIsPlanDialogOpen}>
              <DialogTrigger render={<Button variant="link" size="sm" className="h-auto p-0 text-muted-foreground" onClick={() => setSelectedPlan(tenant.plan_id)}>Change</Button>} />
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Tenant Plan</DialogTitle>
                  <DialogDescription>
                    Update the billing plan for {tenant.name}. This takes effect immediately.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="plan-id">New Plan</Label>
                    <Select value={selectedPlan} onValueChange={(v) => v && setSelectedPlan(v)}>
                      <SelectTrigger id="plan-id">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="starter">Starter</SelectItem>
                        <SelectItem value="growth">Growth</SelectItem>
                        <SelectItem value="enterprise">Enterprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsPlanDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleUpdatePlan} disabled={updatingPlan}>
                    {updatingPlan ? 'Saving...' : 'Save Changes'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Badge variant={tenant.status === 'active' ? 'default' : 'destructive'} className="capitalize">{tenant.status}</Badge>
          </div>
        </div>
        <Button variant="destructive" onClick={handleSuspend} disabled={tenant.status === 'suspended'}>
          Suspend Tenant
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Domains</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tenant.domains.map((d: any) => (
                <li key={d.id} className="flex justify-between items-center border p-2 rounded">
                  <span>{d.domain}</span>
                  {d.is_primary && <Badge variant="secondary">Primary</Badge>}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Feature Flags</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tenant.flags.map((f: any) => (
                <li key={f.id} className="flex justify-between items-center border p-2 rounded">
                  <span className="font-mono text-sm">{f.key}</span>
                  <Button size="sm" variant={f.is_enabled ? 'default' : 'outline'} onClick={() => handleToggleFlag(f.key, f.is_enabled)}>
                    {f.is_enabled ? 'Enabled' : 'Disabled'}
                  </Button>
                </li>
              ))}
              {tenant.flags.length === 0 && <p className="text-muted-foreground text-sm">No specific overrides.</p>}
            </ul>
            <Button variant="outline" size="sm" className="mt-4 w-full">Add Flag Override</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
