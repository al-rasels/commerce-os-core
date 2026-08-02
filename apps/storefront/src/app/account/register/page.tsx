'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Loader2, ShoppingBag, Check, X } from 'lucide-react';

const CheckIcon = ({ ok }: { ok: boolean }) =>
    ok ? <Check className="size-3 text-green-500" /> : <X className="size-3 text-muted-foreground/40" />;

export default function RegisterPage() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordChecks = {
        length: password.length >= 8,
        upper: /[A-Z]/.test(password),
        lower: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        match: confirmPassword.length > 0 && password === confirmPassword,
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Please enter your name');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);
        try {
            const result = await api.auth.register(email, password, name);
            if (result.access_token) {
                localStorage.setItem('auth_token', result.access_token);
                localStorage.setItem('user', JSON.stringify(result.user));
                router.push('/account/orders');
            } else {
                router.push('/account/login');
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                const msg = err.message.toLowerCase();
                if (msg.includes('already registered')) {
                    setError('An account with this email already exists. Try signing in.');
                } else {
                    setError(err.message);
                }
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-primary/10 mb-4">
                        <ShoppingBag className="size-7 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
                    <p className="text-muted-foreground mt-1.5 text-sm">
                        Start shopping and managing your orders
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
                        <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            autoComplete="name"
                            className="h-11"
                        />
                    </div>

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
                        <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Create a strong password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                autoComplete="new-password"
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
                        {password.length > 0 && (
                            <div className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground mt-2">
                                <span className={`flex items-center gap-1.5 ${passwordChecks.length ? 'text-green-600' : ''}`}>
                                    <CheckIcon ok={passwordChecks.length} /> 8+ chars
                                </span>
                                <span className={`flex items-center gap-1.5 ${passwordChecks.upper ? 'text-green-600' : ''}`}>
                                    <CheckIcon ok={passwordChecks.upper} /> Upper
                                </span>
                                <span className={`flex items-center gap-1.5 ${passwordChecks.lower ? 'text-green-600' : ''}`}>
                                    <CheckIcon ok={passwordChecks.lower} /> Lower
                                </span>
                                <span className={`flex items-center gap-1.5 ${passwordChecks.number ? 'text-green-600' : ''}`}>
                                    <CheckIcon ok={passwordChecks.number} /> Number
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                        <div className="relative">
                            <Input
                                id="confirmPassword"
                                type={showConfirm ? 'text' : 'password'}
                                placeholder="Re-enter your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                autoComplete="new-password"
                                className={`h-11 pr-10 ${confirmPassword.length > 0 ? (passwordChecks.match ? 'border-green-500/50' : 'border-destructive/50') : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                tabIndex={-1}
                                aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
                            >
                                {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                        </div>
                        {confirmPassword.length > 0 && (
                            <p className={`text-xs mt-1 flex items-center gap-1.5 ${passwordChecks.match ? 'text-green-600' : 'text-destructive'}`}>
                                {passwordChecks.match ? (
                                    <><Check className="size-3" /> Passwords match</>
                                ) : (
                                    <><X className="size-3" /> Passwords do not match</>
                                )}
                            </p>
                        )}
                    </div>

                    <Button type="submit" className="w-full h-11 rounded-xl" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <Loader2 className="size-4 animate-spin" />
                                Creating account...
                            </span>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-4 text-muted-foreground">Already have an account?</span>
                    </div>
                </div>

                <Link href="/account/login">
                    <Button variant="outline" className="w-full h-11 rounded-xl">
                        Sign in
                    </Button>
                </Link>
            </div>
        </div>
    );
}
