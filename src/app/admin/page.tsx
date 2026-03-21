'use client';

import { AdminGuard } from '@/components/auth/admin-guard';
import { PageHeader } from '@/components/page-header';
import { AdminChatView } from '@/components/admin/admin-chat-view';
import { AdminShipmentManagement } from '@/components/admin/admin-shipment-management';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from '@/hooks/use-language';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';

export default function AdminPage() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  const { isAdmin } = useAdmin();

  const messagesQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return collection(firestore, 'chat_messages');
  }, [firestore, isAdmin]);

  const { data: messages } = useCollection(messagesQuery);
  const messageCount = messages?.length || 0;

  return (
    <AdminGuard>
      <PageHeader title={t.admin.title} breadcrumb={[{ href: '/admin', label: t.nav.admin }]} />
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
            <Card className="mb-8 border-l-4 border-l-primary">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t.admin.console}</CardTitle>
                  <CardDescription>
                    {t.admin.consoleDesc}
                  </CardDescription>
                </div>
                {messageCount > 0 && (
                  <Badge variant="secondary" className="bg-accent text-white px-3 py-1 flex items-center gap-2 animate-pulse">
                    <MessageSquare className="w-4 h-4" />
                    {messageCount} {t.admin.supportTab}
                  </Badge>
                )}
              </CardHeader>
            </Card>
            
            <Tabs defaultValue="shipments" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="shipments">{t.admin.shipmentTab}</TabsTrigger>
                <TabsTrigger value="messages" className="relative">
                  {t.admin.supportTab}
                  {messageCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white ring-2 ring-background">
                      {messageCount}
                    </span>
                  )}
                </TabsTrigger>
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
