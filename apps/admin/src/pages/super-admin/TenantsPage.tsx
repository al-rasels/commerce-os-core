import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { superAdminApi } from '@/lib/api';
import { DataTable } from '@/components/ui/data-table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { ProvisionTenantDialog } from './ProvisionTenantDialog';

export function TenantsPage() {
  const [tenants, setTenants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadTenants = useCallback(() => {
    setError(null);
    superAdminApi.listTenants()
      .then((res) => setTenants(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadTenants();
  }, [loadTenants]);

  const columns = [
    {
      accessorKey: 'name',
      header: 'Tenant Name',
      cell: ({ row }: any) => (
        <Link to={`/super-admin/tenants/${row.original.id}`} className="font-medium text-primary hover:underline">
          {row.original.name}
        </Link>
      ),
    },
    {
      accessorKey: 'plan_id',
      header: 'Plan',
      cell: ({ row }: any) => <Badge variant="outline" className="capitalize">{row.original.plan_id}</Badge>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }: any) => (
        <Badge variant={row.original.status === 'active' ? 'default' : 'destructive'} className="capitalize">
          {row.original.status}
        </Badge>
      ),
    },
    {
      accessorKey: 'domains',
      header: 'Domains',
      cell: ({ row }: any) => row.original.domains.map((d: any) => d.domain).join(', '),
    },
    {
      accessorKey: 'created_at',
      header: 'Created',
      cell: ({ row }: any) => new Date(row.original.created_at).toLocaleDateString(),
    },
  ];

  if (loading) return <div>Loading tenants...</div>;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="size-4" />
        <AlertTitle>Failed to load tenants</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Super Admin: Tenants</h1>
        <ProvisionTenantDialog onProvisioned={loadTenants} />
      </div>
      
      <div className="border rounded-md">
        <DataTable columns={columns} data={tenants} />
      </div>
    </div>
  );
}
