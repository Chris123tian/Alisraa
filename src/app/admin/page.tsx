'use client';

import { AdminGuard } from '@/components/auth/admin-guard';
import { PageHeader } from '@/components/page-header';
import { AdminChatView } from '@/components/admin/admin-chat-view';
import { AdminShipmentManagement } from '@/components/admin/admin-shipment-management';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/hooks/use-language';

export default function AdminPage() {
  const { t } = useLanguage();

  return (
    <AdminGuard>
      <PageHeader title={t.admin.title} breadcrumb={[{ href: '/admin', label: t.nav.admin }]} />
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle>{t.admin.console}</CardTitle>
                <CardDescription>
                  {t.admin.consoleDesc}
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Tabs defaultValue="shipments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="shipments">{t.admin.shipmentTab}</TabsTrigger>
                <TabsTrigger value="messages">{t.admin.supportTab}</TabsTrigger>
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
