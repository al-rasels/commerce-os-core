'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, ArrowLeft } from 'lucide-react';

function MfaForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mfaToken = searchParams.get('token') || '';
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mfaToken) {
      setError('Invalid or expired MFA session. Please log in again.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const result = await api.auth.mfaVerify(mfaToken, code);
      if (result.access_token) {
        localStorage.setItem('auth_token', result.access_token);
        localStorage.setItem('user', JSON.stringify(result.user));
        router.push('/account/orders');
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Two-Factor Authentication</h1>
        <p className="text-muted-foreground">
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="code">Authentication Code</Label>
          <Input
            id="code"
            type="text"
            inputMode="numeric"
            placeholder="000000"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            required
            maxLength={6}
            className="h-12 text-center text-2xl tracking-widest font-mono"
          />
        </div>
        <Button type="submit" className="w-full h-12" disabled={loading || code.length !== 6}>
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground mt-6">
        <Link href="/account/login" className="text-primary hover:underline inline-flex items-center gap-1">
          <ArrowLeft className="w-3 h-3" />
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default function MfaPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center"><p className="text-muted-foreground">Loading...</p></div>}>
      <MfaForm />
    </Suspense>
  );
}
