'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, KeyRound, LogOut, Package, User, CheckCircle2, XCircle } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [mfaCode, setMfaCode] = useState('');
  const [mfaPassword, setMfaPassword] = useState('');
  const [mfaLoading, setMfaLoading] = useState(false);
  const [mfaQr, setMfaQr] = useState<string | null>(null);
  const [mfaSecret, setMfaSecret] = useState<string | null>(null);
  const [mfaError, setMfaError] = useState('');
  const [mfaStep, setMfaStep] = useState<'idle' | 'setup' | 'verify'>('idle');

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (!token) { router.replace('/account/login'); return; }
    api.auth.me().then(setUser).catch(() => router.replace('/account/login')).finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleMfaSetup = async () => {
    setMfaLoading(true);
    setMfaError('');
    try {
      const data = await api.auth.mfaSetup(user.id);
      setMfaQr(data.qr_code);
      setMfaSecret(data.secret);
      setMfaStep('setup');
    } catch (err: unknown) {
      setMfaError(err instanceof Error ? err.message : 'Setup failed');
    } finally {
      setMfaLoading(false);
    }
  };

  const handleMfaEnable = async () => {
    setMfaLoading(true);
    setMfaError('');
    try {
      await api.auth.mfaEnable(user.id, mfaCode);
      setUser({ ...user, mfa_enabled: true });
      setMfaStep('idle');
      setMfaQr(null);
      setMfaSecret(null);
      setMfaCode('');
    } catch (err: unknown) {
      setMfaError(err instanceof Error ? err.message : 'Enable failed');
    } finally {
      setMfaLoading(false);
    }
  };

  const handleMfaDisable = async () => {
    if (!mfaPassword) { setMfaError('Enter your password to disable 2FA'); return; }
    setMfaLoading(true);
    setMfaError('');
    try {
      await api.auth.mfaDisable(user.id, mfaPassword);
      setUser({ ...user, mfa_enabled: false });
      setMfaPassword('');
    } catch (err: unknown) {
      setMfaError(err instanceof Error ? err.message : 'Disable failed');
    } finally {
      setMfaLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  const mfaEnabled = user?.mfa_enabled === true;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Account</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Info
            </CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{user?.email || '...'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Order History
            </CardTitle>
            <CardDescription>View your past purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/account/orders">
              <Button className="w-full">View Orders</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Returns (RMA)
            </CardTitle>
            <CardDescription>Manage your product returns</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/account/returns">
              <Button variant="outline" className="w-full">View Returns</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Subscriptions
            </CardTitle>
            <CardDescription>Manage recurring orders</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/account/subscriptions">
              <Button variant="outline" className="w-full">Manage Subscriptions</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-primary" />
              Change Password
            </CardTitle>
            <CardDescription>Update your login credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/account/change-password">
              <Button variant="outline" className="w-full">Change Password</Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Two-Factor Auth
            </CardTitle>
            <CardDescription>
              {mfaEnabled ? '2FA is active on your account' : 'Add an extra layer of security'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mfaError && (
              <div className="bg-destructive/10 text-destructive rounded-lg p-3 text-sm">{mfaError}</div>
            )}

            {!mfaEnabled && mfaStep === 'idle' && (
              <Button onClick={handleMfaSetup} disabled={mfaLoading} variant="outline" className="w-full">
                {mfaLoading ? 'Setting up...' : 'Enable 2FA'}
              </Button>
            )}

            {!mfaEnabled && mfaStep === 'setup' && mfaQr && (
              <div className="space-y-4">
                <img src={mfaQr} alt="Scan with authenticator app" className="mx-auto w-48 h-48 border rounded-lg" />
                {mfaSecret && (
                  <p className="text-xs text-center text-muted-foreground break-all bg-muted p-2 rounded">
                    Secret: {mfaSecret}
                  </p>
                )}
                <p className="text-sm text-muted-foreground text-center">
                  Scan with your authenticator app, then enter the 6-digit code below.
                </p>
                <div className="flex gap-2">
                  <Input
                    placeholder="000000"
                    value={mfaCode}
                    onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                  <Button onClick={handleMfaEnable} disabled={mfaLoading || mfaCode.length !== 6}>
                    {mfaLoading ? '...' : 'Verify'}
                  </Button>
                </div>
                <button
                  onClick={() => { setMfaStep('idle'); setMfaQr(null); setMfaSecret(null); setMfaCode(''); setMfaError(''); }}
                  className="w-full text-xs text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </button>
              </div>
            )}

            {mfaEnabled && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle2 className="w-4 h-4" />
                  2FA is enabled
                </div>
                <Input
                  type="password"
                  placeholder="Enter your password to disable"
                  value={mfaPassword}
                  onChange={(e) => setMfaPassword(e.target.value)}
                  className="text-sm"
                />
                <Button
                  onClick={handleMfaDisable}
                  disabled={mfaLoading || !mfaPassword}
                  variant="outline"
                  className="w-full text-destructive border-destructive/30 hover:bg-destructive/10"
                >
                  {mfaLoading ? '...' : 'Disable 2FA'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
