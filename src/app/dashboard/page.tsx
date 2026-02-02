
'use client';

import { PageHeader } from '@/components/page-header';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, where, orderBy } from 'firebase/firestore';
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
import { Package, Truck, Clock, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserDashboard() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const shipmentsQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return query(
      collection(firestore, 'shipments'),
      where('userId', '==', user.uid),
      orderBy('lastUpdate', 'desc')
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
      <PageHeader title="Client Dashboard" breadcrumb={[{ href: '/dashboard', label: 'Dashboard' }]} />
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Shipments</CardTitle>
                <Package className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{shipments?.length || 0}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">In Transit</CardTitle>
                <Truck className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {shipments?.filter(s => s.status === 'In Transit').length || 0}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Delivered</CardTitle>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Goal
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                   {shipments?.filter(s => s.status === 'Delivered').length || 0}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Shipments</CardTitle>
              <CardDescription>Monitor your active and past shipments in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
              {isShipmentsLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                </div>
              ) : !shipments || shipments.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No shipments found. Contact Al-Israa to start your first shipment.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tracking #</TableHead>
                      <TableHead>Origin & Destination</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Update</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {shipments.map((shipment) => (
                      <TableRow key={shipment.id}>
                        <TableCell className="font-mono font-bold text-primary">
                          {shipment.trackingNumber}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{shipment.origin} → {shipment.destination}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              shipment.status === 'Delivered' ? 'default' : 
                              shipment.status === 'Delayed' ? 'destructive' : 'secondary'
                            }
                          >
                            {shipment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {shipment.lastUpdate ? new Date(shipment.lastUpdate).toLocaleString() : 'N/A'}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
