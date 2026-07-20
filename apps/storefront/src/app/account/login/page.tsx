'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const result = await api.auth.login(email, password);
            if (result.access_token) {
                localStorage.setItem('auth_token', result.access_token);
                localStorage.setItem('user', JSON.stringify(result.user));
                router.push('/account/orders');
            } else if (result.mfa_required) {
                router.push(`/account/mfa?token=${result.mfa_token}`);
            }
        } catch (err: any) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-16 max-w-md">
            <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>

            {error && (
                <div className="bg-destructive/10 text-destructive rounded-lg p-4 mb-6 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Don't have an account?{' '}
                <Link href="/account/register" className="text-primary hover:underline">
                    Create one
                </Link>
            </p>
        </div>
    );
}