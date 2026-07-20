'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Package, ArrowLeft, LogOut } from 'lucide-react';

export default function OrderHistoryPage() {
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth_token');
        const userData = localStorage.getItem('user');
        if (!token || !userData) {
            router.push('/account/login');
            return;
        }
        setUser(JSON.parse(userData));
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            const userData = JSON.parse(localStorage.getItem('user') || '{}');
            const data = await api.orders.listByEmail(userData.email || '');
            setOrders(Array.isArray(data) ? data : []);
        } catch {
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        router.push('/');
    };

    if (loading) {
        return (
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-muted-foreground">Loading orders...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-3xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">My Orders</h1>
                    {user && (
                        <p className="text-sm text-muted-foreground mt-1">
                            {user.email}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <Link href="/">
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="size-4" />
                            Shop
                        </Button>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="size-4" />
                        Sign Out
                    </Button>
                </div>
            </div>

            {orders.length === 0 ? (
                <div className="text-center py-16 border rounded-lg">
                    <Package className="size-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground text-lg mb-2">No orders yet</p>
                    <p className="text-sm text-muted-foreground mb-6">
                        When you place an order, it will appear here.
                    </p>
                    <Link href="/">
                        <Button>Start Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order: any) => (
                        <div
                            key={order.id}
                            className="border rounded-lg p-6 hover:border-primary/50 transition-colors"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="font-mono text-xs text-muted-foreground">
                                        {order.id}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${order.status === 'paid' || order.status === 'fulfilled'
                                                ? 'bg-green-100 text-green-800'
                                                : order.status === 'cancelled'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                    <p className="font-semibold mt-1">
                                        {(order.total_cents / 100).toFixed(2)} {order.currency}
                                    </p>
                                </div>
                            </div>
                            {(order.items ?? []).length > 0 && (
                                <div className="border-t pt-4 space-y-2">
                                    {order.items.map((item: any) => (
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
                    ))}
                </div>
            )}
        </div>
    );
}