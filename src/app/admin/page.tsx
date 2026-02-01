'use client';

import { AdminGuard } from '@/components/auth/admin-guard';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <AdminGuard>
      <PageHeader title="Admin Dashboard" breadcrumb={[{ href: '/admin', label: 'Admin' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome, Admin</CardTitle>
                    <CardDescription>This is your dashboard. More features are coming soon.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Future features will include:</p>
                    <ul className="list-disc pl-6 mt-4">
                        <li>Viewing and replying to chat messages.</li>
                        <li>Generating and managing shipment tracking codes.</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
      </section>
    </AdminGuard>
  );
}
