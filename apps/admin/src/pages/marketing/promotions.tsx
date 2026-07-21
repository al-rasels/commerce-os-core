import { useEffect, useState } from 'react';
import { promotionsApi } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus } from 'lucide-react';

export function PromotionsPage() {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPromotions = () => {
    setLoading(true);
    promotionsApi.list()
      .then(setPromotions)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPromotions();
  }, []);

  if (loading) return <div>Loading promotions...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Promotions</h1>
          <p className="text-muted-foreground">Manage discount codes and special offers.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Promotion
        </Button>
      </div>

      <div className="grid gap-4">
        {promotions.map((promo) => (
          <Card key={promo.id}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <div>
                <CardTitle className="font-mono text-xl">{promo.code}</CardTitle>
                <CardDescription className="capitalize mt-1">
                  {promo.type === 'percentage' ? 'Percentage Discount' : 'Fixed Amount'}
                </CardDescription>
              </div>
              <Badge variant={promo.is_active ? 'default' : 'secondary'}>
                {promo.is_active ? 'Active' : 'Inactive'}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-sm mt-2 grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-lg">
                    {promo.type === 'percentage' ? `${promo.value}% Off` : `$${(promo.value / 100).toFixed(2)} Off`}
                  </p>
                  <p className="text-muted-foreground">Uses: {promo.uses} {promo.max_uses ? `/ ${promo.max_uses}` : ''}</p>
                </div>
                <div className="text-right">
                  {promo.min_order && (
                    <p className="text-muted-foreground">Min Order: ${(promo.min_order / 100).toFixed(2)}</p>
                  )}
                  {promo.expires_at && (
                    <p className="text-muted-foreground text-xs mt-1">
                      Expires: {new Date(promo.expires_at).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground">Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {promotions.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground text-center mb-4">No promotions created yet.</p>
              <Button variant="outline">Create your first promotion</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
