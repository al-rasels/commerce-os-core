import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function TenantDetailPage() {
  const { id } = useParams();
  const [tenant, setTenant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    if (!id) return;
    setLoading(true);
    api.superAdmin.getTenant(id)
      .then(setTenant)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [id]);

  const handleSuspend = async () => {
    if (!id) return;
    await api.superAdmin.suspendTenant(id);
    load();
  };

  const handleToggleFlag = async (key: string, is_enabled: boolean) => {
    if (!id) return;
    await api.superAdmin.toggleFlag(id, key, !is_enabled);
    load();
  };

  if (loading) return <div>Loading...</div>;
  if (!tenant) return <div>Tenant not found</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{tenant.name}</h1>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="capitalize">{tenant.plan_id} Plan</Badge>
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
