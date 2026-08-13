'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useAuthStore } from '@/lib/auth-store';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/empty-state';
import { Package, ArrowLeft, LogOut } from 'lucide-react';

interface OrderItem {
  id: string;
  variant?: { name: string; price_cents: number };
  quantity: number;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_cents: number;
  currency: string;
  items: OrderItem[];
}

const statusLabels: Record<string, { label: string; variant: 'secondary' | 'default' | 'destructive' | 'outline' }> = {
  pending: { label: 'Pending', variant: 'secondary' },
  paid: { label: 'Paid', variant: 'default' },
  fulfilled: { label: 'Fulfilled', variant: 'default' },
  cancelled: { label: 'Cancelled', variant: 'destructive' },
  refunded: { label: 'Refunded', variant: 'outline' },
};

export default function OrderHistoryPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const loadOrders = async () => {
        try {
            const data = await api.orders.listByEmail(user?.email || '');
            setOrders(Array.isArray(data) ? data : []);
        } catch {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            router.push('/account/login');
            return;
        }
        loadOrders();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-6 py-16 max-w-3xl">
                <div className="animate-pulse space-y-6">
                    <div className="h-8 bg-muted rounded w-36" />
                    <div className="h-4 bg-muted rounded w-64" />
                    <div className="space-y-4 mt-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-32 bg-muted rounded-xl" />
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8 max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
                    {user && (
                        <p className="text-sm text-muted-foreground mt-1">
                            {user.email}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Link href="/">
                        <button className="inline-flex h-9 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium text-foreground hover:bg-muted transition-colors gap-1.5">
                            <ArrowLeft className="size-4" />
                            Shop
                        </button>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="inline-flex h-9 items-center justify-center rounded-lg px-3 text-sm font-medium text-foreground hover:bg-muted transition-colors gap-1.5"
                    >
                        <LogOut className="size-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {orders.length === 0 ? (
                <EmptyState
                    icon={<Package className="size-full p-2.5" />}
                    title="No orders yet"
                    description="When you place an order, it will appear here."
                    size="lg"
                    action={
                        <Link
                            href="/"
                            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
                        >
                            Start Shopping
                        </Link>
                    }
                />
            ) : (
                <div className="space-y-4">
                    {orders.map((order: Order) => {
                        const statusInfo = statusLabels[order.status] || { label: order.status, variant: 'outline' as const };
                        return (
                            <div
                                key={order.id}
                                className="bg-background rounded-xl p-6 border border-border/50 shadow-sm hover:border-border transition-colors"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="space-y-1">
                                        <p className="font-mono text-xs text-muted-foreground">
                                            #{order.id.slice(0, 8)}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.created_at).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </p>
                                    </div>
                                    <div className="text-right space-y-1">
                                        <Badge variant={statusInfo.variant}>
                                            {statusInfo.label}
                                        </Badge>
                                        <p className="font-semibold">
                                            {(order.total_cents / 100).toFixed(2)} {order.currency}
                                        </p>
                                    </div>
                                </div>
                                {(order.items ?? []).length > 0 && (
                                    <div className="border-t border-border/50 pt-4 space-y-2">
                                        {order.items.map((item: OrderItem) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between text-sm"
                                            >
                                                <span className="text-muted-foreground">
                                                    {item.variant?.name || 'Item'} x{item.quantity}
                                                </span>
                                                <span>
                                                    {order.currency}{' '}
                                                    {(
                                                        ((item.variant?.price_cents ?? 0) *
                                                            item.quantity) /
                                                        100
                                                    ).toFixed(2)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
