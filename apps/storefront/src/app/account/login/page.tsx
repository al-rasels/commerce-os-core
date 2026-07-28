'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, ShoppingBag } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
        } catch (err: unknown) {
            if (err instanceof Error) {
                const msg = err.message.toLowerCase();
                if (msg.includes('not found') || msg.includes('invalid credentials')) {
                    setError('Invalid email or password. Please try again.');
                } else if (msg.includes('suspended')) {
                    setError('Your account has been suspended. Contact support.');
                } else if (msg.includes('activated')) {
                    setError('Your account is not yet activated. Check your email.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 mb-4">
                        <ShoppingBag className="size-7 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                        Sign in to your account to continue
                    </p>
                </div>

                {error && (
                    <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-xl p-4 mb-6 text-sm flex items-start gap-3">
                        <span className="mt-0.5 size-4 rounded-full bg-destructive/20 flex items-center justify-center text-[10px] font-bold flex-shrink-0">!</span>
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                            <Link href="/account/forgot-password" className="text-xs text-primary hover:underline font-medium">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="h-11 pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                tabIndex={-1}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                    </div>

                    <Button type="submit" className="w-full h-11 rounded-xl" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                Signing in...
                            </span>
                        ) : (
                            'Sign In'
                        )}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-4 text-muted-foreground">New here?</span>
                    </div>
                </div>

                <Link href="/account/register">
                    <Button variant="outline" className="w-full h-11 rounded-xl">
                        Create an account
                    </Button>
                </Link>
            </div>
        </div>
    );
}