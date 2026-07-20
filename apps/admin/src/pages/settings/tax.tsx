import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

export function TaxSettingsPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRules = () => {
    setLoading(true);
    api.tax.list()
      .then(setRules)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRules();
  }, []);

  if (loading) return <div>Loading tax rules...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Taxes</h1>
          <p className="text-muted-foreground">Manage your tax rates and regions.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Tax Rate
        </Button>
      </div>

      <div className="grid gap-4">
        {rules.map((rule) => (
          <Card key={rule.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div>
                <CardTitle>{rule.name}</CardTitle>
                <CardDescription className="capitalize">
                  {rule.type === 'flat' ? 'Flat Percentage' : `Region: ${rule.region}`}
                </CardDescription>
              </div>
              <Badge variant={rule.is_active ? 'default' : 'secondary'}>
                {rule.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm mt-2">
                <p className="font-semibold text-lg">{rule.rate}%</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {rules.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center mb-4">No tax rules configured.</p>
              <Button variant="outline">Create your first tax rule</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
