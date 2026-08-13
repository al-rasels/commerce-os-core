import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authApi } from '@/lib/api/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

/**
 * Two-factor authentication (TOTP) management for the signed-in admin user.
 * Uses the same backend flow as the storefront: setup (QR) → verify → enable,
 * or disable with the account password.
 */
export default function SecurityPage() {
  const { user } = useAuth();
  const userId = user?.id ?? '';

  const [enabled, setEnabled] = useState(false);
  const [checking, setChecking] = useState(true);
  const [showQr, setShowQr] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (!userId) return;
    authApi
      .me()
      .then((me) => mounted && setEnabled(!!me.mfa_configured))
      .catch(() => mounted && setEnabled(false))
      .finally(() => mounted && setChecking(false));
    return () => {
      mounted = false;
    };
  }, [userId]);

  async function handleSetup() {
    setBusy(true);
    try {
      const { qr_code } = await authApi.mfaSetup(userId);
      setQrCode(qr_code);
      setShowQr(true);
      setCode('');
    } catch (err: any) {
      toast.error(err.message || 'Failed to start MFA setup');
    } finally {
      setBusy(false);
    }
  }

  async function handleEnable() {
    if (!code.trim()) return;
    setBusy(true);
    try {
      await authApi.mfaEnable(userId, code.trim());
      setEnabled(true);
      setShowQr(false);
      setCode('');
      toast.success('Two-factor authentication enabled');
    } catch (err: any) {
      toast.error(err.message || 'Invalid verification code');
    } finally {
      setBusy(false);
    }
  }

  async function handleDisable() {
    if (!password) return;
    setBusy(true);
    try {
      await authApi.mfaDisable(userId, password);
      setEnabled(false);
      setPassword('');
      toast.success('Two-factor authentication disabled');
    } catch (err: any) {
      toast.error(err.message || 'Incorrect password');
    } finally {
      setBusy(false);
    }
  }

  if (checking) {
    return (
      <div className="p-8 text-muted-foreground text-sm">Checking security settings…</div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            {enabled
              ? 'Your account is protected by a time-based one-time password.'
              : 'Add an extra layer of security to your admin account.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!enabled && !showQr && (
            <Button onClick={handleSetup} disabled={busy || !userId}>
              {busy ? 'Setting up…' : 'Set up two-factor authentication'}
            </Button>
          )}

          {showQr && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 flex items-center gap-4">
                {/* QR code image is data-URI generated server-side */}
                <img
                  src={qrCode}
                  alt="Scan with your authenticator app"
                  className="h-32 w-32 rounded border"
                />
                <p className="text-sm text-muted-foreground">
                  Scan this QR code with your authenticator app, then enter the
                  6-digit code below to confirm.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mfa-code">Verification code</Label>
                <div className="flex gap-2">
                  <Input
                    id="mfa-code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="000000"
                    className="max-w-[10rem] font-mono"
                  />
                  <Button onClick={handleEnable} disabled={busy || code.trim().length < 6}>
                    {busy ? 'Verifying…' : 'Enable'}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {enabled && (
            <div className="space-y-2">
              <Label htmlFor="mfa-password">Enter your password to disable</Label>
              <div className="flex gap-2">
                <Input
                  id="mfa-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Account password"
                  className="max-w-[16rem]"
                />
                <Button variant="outline" onClick={handleDisable} disabled={busy || !password}>
                  {busy ? 'Disabling…' : 'Disable'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}