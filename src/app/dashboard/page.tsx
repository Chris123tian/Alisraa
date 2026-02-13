'use client';

import { PageHeader } from '@/components/page-header';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, Truck, Clock, MapPin, MessageSquare, Inbox } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Chat } from '@/components/chat';

export default function UserDashboard() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const shipmentsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'shipments'),
      where('userId', '==', user.uid)
    );
  }, [firestore, user]);

  const { data: shipments, isLoading: isShipmentsLoading } = useCollection(shipmentsQuery);

  if (isUserLoading) {
    return (
      <div className="container mx-auto py-20 px-4">
        <Skeleton className="h-12 w-48 mb-8" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  return (
    <>
      <PageHeader title={t.dashboard.title} breadcrumb={[{ href: '/dashboard', label: t.nav.dashboard }]} />
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{t.dashboard.totalShipments}</CardTitle>
                <Package className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments?.length || 0}</div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{t.dashboard.inTransit}</CardTitle>
                <Truck className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {shipments?.filter(s => s.status === 'In Transit').length || 0}
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{t.dashboard.delivered}</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {t.dashboard.goal}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                   {shipments?.filter(s => s.status === 'Delivered').length || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <Card className="shadow-lg border-none overflow-hidden">
                <CardHeader className="bg-primary text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-accent" />
                    {t.dashboard.yourShipments}
                  </CardTitle>
                  <CardDescription className="text-primary-foreground/70">{t.dashboard.monitorDesc}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {isShipmentsLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                    </div>
                  ) : !shipments || shipments.length === 0 ? (
                    <div className="text-center py-12">
                      <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                      <p className="text-muted-foreground font-medium">{t.dashboard.noShipments}</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">{t.dashboard.trackingNum}</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">{t.dashboard.route}</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">{t.dashboard.status}</TableHead>
                            <TableHead className="font-bold uppercase text-[10px] tracking-widest">{t.dashboard.lastUpdate}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {shipments.map((shipment) => (
                            <TableRow key={shipment.id} className="hover:bg-muted/30 transition-colors">
                              <TableCell className="font-mono font-black text-primary">
                                {shipment.trackingNumber}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-accent" />
                                  <span className="font-medium">{shipment.origin} → {shipment.destination}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <Badge 
                                  className={`rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                                    shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                    shipment.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-primary/10 text-primary'
                                  }`}
                                  variant="secondary"
                                >
                                  {shipment.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-muted-foreground text-xs font-medium">
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {shipment.lastUpdate ? new Date(shipment.lastUpdate).toLocaleString() : 'N/A'}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="h-full border-none shadow-2xl overflow-hidden rounded-[2rem] flex flex-col">
                <CardHeader className="bg-accent text-white">
                  <CardTitle className="flex items-center gap-2 uppercase tracking-tighter font-black">
                    <Inbox className="w-5 h-5" />
                    {t.dashboard.supportTitle}
                  </CardTitle>
                  <CardDescription className="text-white/80 font-medium">
                    {t.dashboard.supportDesc}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <Chat />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}