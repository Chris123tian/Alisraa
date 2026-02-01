'use client';

import { AdminGuard } from '@/components/auth/admin-guard';
import { PageHeader } from '@/components/page-header';
import { AdminChatView } from '@/components/admin/admin-chat-view';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminPage() {
  return (
    <AdminGuard>
      <PageHeader title="Admin Dashboard" breadcrumb={[{ href: '/admin', label: 'Admin' }]} />
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Welcome, Admin</CardTitle>
                <CardDescription>
                  This dashboard is only visible to administrators. To grant admin access, add a user's ID to the `roles_admin` collection in Firestore.
                </CardDescription>
              </CardHeader>
            </Card>
            <AdminChatView />
        </div>
      </section>
    </AdminGuard>
  );
}
