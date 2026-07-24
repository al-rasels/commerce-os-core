import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templatesApi } from '@/lib/api/templates';
import type { TemplateBase } from '@/lib/api/templates';
import { superAdminApi } from '@/lib/api/superAdmin';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Check, ChevronLeft, Store, Sparkles, PackageOpen } from 'lucide-react';

const colorSchemeMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' }> = {
  warm: { label: 'Warm', variant: 'default' },
  cool: { label: 'Cool', variant: 'secondary' },
  neutral: { label: 'Neutral', variant: 'outline' },
};

function getCategoryCount(template: TemplateBase): number {
  return template.layout_json?.categories?.length ?? 0;
}

function getSampleProductCount(template: TemplateBase): number {
  return template.layout_json?.sample_products?.length ?? 0;
}

function getPageLayouts(template: TemplateBase): Record<string, unknown[]> {
  return (template.layout_json?.page_layouts ?? {}) as Record<string, unknown[]>;
}

function getSectionCount(template: TemplateBase): number {
  const layouts = getPageLayouts(template);
  return Object.values(layouts).reduce((sum, sections) => sum + (Array.isArray(sections) ? sections.length : 0), 0);
}

const pageLayoutLabels: Record<string, string> = {
  homepage: 'Homepage',
  products: 'Category / Listing',
  product_detail: 'Product Detail',
  cart: 'Cart',
  checkout: 'Checkout',
  account: 'Account',
  about: 'About Us',
  contact: 'Contact',
  lookbook: 'Lookbook',
};

function TemplateCard({
  template,
  selected,
  onSelect,
}: {
  template: TemplateBase;
  selected: boolean;
  onSelect: () => void;
}) {
  const colorScheme = template.layout_json?.theme?.colorScheme;
  const primaryColor = template.layout_json?.theme?.primary ?? '#6366f1';
  const schemeInfo = colorSchemeMap[colorScheme] ?? { label: 'Neutral', variant: 'outline' as const };
  const layouts = getPageLayouts(template);
  const layoutKeys = Object.keys(layouts);
  const totalSections = getSectionCount(template);

  return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-lg overflow-hidden ${selected ? 'ring-2 ring-primary shadow-xl' : ''}`}
      onClick={onSelect}
    >
      <div className="h-2" style={{ background: `linear-gradient(90deg, ${primaryColor}, ${primaryColor}88)` }} />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <CardDescription className="mt-1 line-clamp-2">{template.description}</CardDescription>
          </div>
          {selected && (
            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center shrink-0 ml-2">
              <Check className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Badge variant={schemeInfo.variant}>{schemeInfo.label}</Badge>
          <Badge variant="outline">{getCategoryCount(template)} categories</Badge>
          <Badge variant="outline">{getSampleProductCount(template)} products</Badge>
          <Badge variant="outline">{totalSections} sections</Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {layoutKeys.map((key) => (
            <span key={key} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {pageLayoutLabels[key] ?? key} · {Array.isArray(layouts[key]) ? layouts[key].length : 0}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type Step = 'template' | 'details' | 'review';

export function CreateStoreWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('template');
  const [templates, setTemplates] = useState<TemplateBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [provisioning, setProvisioning] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [storeName, setStoreName] = useState('');
  const [storeDomain, setStoreDomain] = useState('');
  const [planId, setPlanId] = useState('starter');

  useEffect(() => {
    templatesApi.list()
      .then(setTemplates)
      .finally(() => setLoading(false));
  }, []);

  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId);

  const progressValue = step === 'template' ? 33 : step === 'details' ? 66 : 100;

  async function handleProvision() {
    if (!selectedTemplateId || !storeName || !storeDomain) return;
    setProvisioning(true);
    try {
      await superAdminApi.provisionTenant({
        name: storeName,
        domain: storeDomain,
        plan_id: planId,
        template_id: selectedTemplateId,
      });
      navigate('/super-admin/tenants');
    } finally {
      setProvisioning(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <div className="grid gap-4 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-full mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Create a New Store</h1>
        <p className="text-muted-foreground">Set up a new tenant with a pre-built template in minutes.</p>
      </div>

      <Progress value={progressValue} className="w-full" />

      {step === 'template' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Choose a Template
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Pick a starting template that matches your store type. You can customize everything later.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {templates.map((t) => (
              <TemplateCard
                key={t.id}
                template={t}
                selected={selectedTemplateId === t.id}
                onSelect={() => setSelectedTemplateId(t.id)}
              />
            ))}
          </div>

          <div className="flex justify-end">
            <Button
              disabled={!selectedTemplateId}
              onClick={() => setStep('details')}
            >
              Next: Store Details
            </Button>
          </div>
        </div>
      )}

      {step === 'details' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Store className="h-5 w-5" />
              Store Details
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your store name and domain.
            </p>
          </div>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input
                  id="store-name"
                  placeholder="My Store"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="store-domain">Domain</Label>
                <Input
                  id="store-domain"
                  placeholder="mystore.localhost"
                  value={storeDomain}
                  onChange={(e) => setStoreDomain(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Use subdomain format (e.g., mystore.localhost). Live domains must be configured via DNS.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="plan-id">Plan</Label>
                <Select value={planId} onValueChange={(v) => v && setPlanId(v)}>
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
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('template')}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button
              disabled={!storeName || !storeDomain}
              onClick={() => setStep('review')}
            >
              Next: Review
            </Button>
          </div>
        </div>
      )}

      {step === 'review' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <PackageOpen className="h-5 w-5" />
              Review & Provision
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Review your selections before creating the store.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Store Name</span>
                  <p className="font-medium">{storeName}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Domain</span>
                  <p className="font-medium">{storeDomain}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Plan</span>
                  <p className="font-medium capitalize">{planId}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Template</span>
                  <p className="font-medium">{selectedTemplate?.name}</p>
                </div>
              </div>

              {selectedTemplate && (
                <>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Template includes:</p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{getCategoryCount(selectedTemplate)} categories</Badge>
                      <Badge variant="outline">{getSampleProductCount(selectedTemplate)} sample products</Badge>
                      <Badge variant="outline">{getSectionCount(selectedTemplate)} total sections</Badge>
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-2">Page layouts:</p>
                    <div className="space-y-1.5">
                      {Object.entries(getPageLayouts(selectedTemplate)).map(([key, sections]) => (
                        <div key={key} className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{pageLayoutLabels[key] ?? key}</span>
                          <Badge variant="outline" className="text-xs">
                            {Array.isArray(sections) ? sections.length : 0} sections
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <p className="text-sm font-medium mb-1">Template</p>
                    <div className="flex items-center gap-3 text-sm">
                      <Badge variant="outline">
                        {colorSchemeMap[selectedTemplate.layout_json?.theme?.colorScheme]?.label ?? 'Neutral'}
                      </Badge>
                      <span className="text-muted-foreground">v{selectedTemplate.version}</span>
                    </div>
                    {selectedTemplate.description && (
                      <p className="text-sm text-muted-foreground mt-2">{selectedTemplate.description}</p>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('details')}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
            <Button onClick={handleProvision} disabled={provisioning}>
              {provisioning ? 'Creating Store...' : 'Create Store'}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
