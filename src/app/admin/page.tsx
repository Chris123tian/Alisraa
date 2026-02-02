
'use client';

import { AdminGuard } from '@/components/auth/admin-guard';
import { PageHeader } from '@/components/page-header';
import { AdminChatView } from '@/components/admin/admin-chat-view';
import { AdminShipmentManagement } from '@/components/admin/admin-shipment-management';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  return (
    <AdminGuard>
      <PageHeader title="Admin Dashboard" breadcrumb={[{ href: '/admin', label: 'Admin' }]} />
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle>Al-Israa Management Console</CardTitle>
                <CardDescription>
                  Manage clients, generate tracking codes, and monitor live support messages.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Tabs defaultValue="shipments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="shipments">Shipment Tracking</TabsTrigger>
                <TabsTrigger value="messages">Live Support Messages</TabsTrigger>
              </TabsList>
              
              <TabsContent value="shipments">
                <AdminShipmentManagement />
              </TabsContent>
              
              <TabsContent value="messages">
                <AdminChatView />
              </TabsContent>
            </Tabs>
        </div>
      </section>
    </AdminGuard>
  );
}
