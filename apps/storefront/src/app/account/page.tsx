import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">My Account</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Profile Info</CardTitle>
            <CardDescription>Manage your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">customer@example.com</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">Edit Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>View your past purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground text-center py-6">
              No orders found.
            </div>
            <Link href="/products" className="block w-full">
              <Button className="w-full">Start Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
