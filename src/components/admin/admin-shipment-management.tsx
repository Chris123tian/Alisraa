'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc, limit } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, RefreshCw, Package, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/useAdmin';
import { useLanguage } from '@/hooks/use-language';

export function AdminShipmentManagement() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { isAdmin, isLoading: isAdminCheckLoading } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    userId: '',
    origin: '',
    destination: '',
    status: 'Pending',
    description: '',
    vessel: '',
  });

  const shipmentsQuery = useMemoFirebase(() => {
    // Only run if admin is confirmed
    if (!firestore || isAdminCheckLoading || !isAdmin) return null;
    return query(
      collection(firestore, 'shipments'), 
      orderBy('lastUpdate', 'desc'),
      limit(100)
    );
  }, [firestore, isAdmin, isAdminCheckLoading]);

  const { data: shipments, isLoading: isShipmentsLoading } = useCollection(shipmentsQuery);

  const usersQuery = useMemoFirebase(() => {
    // Only run if admin is confirmed
    if (!firestore || isAdminCheckLoading || !isAdmin) return null;
    return query(collection(firestore, 'users'), limit(500));
  }, [firestore, isAdmin, isAdminCheckLoading]);

  const { data: users, isLoading: isUsersLoading } = useCollection(usersQuery);

  const generateTrackingCode = () => {
    return 'AL-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !isAdmin) return;

    if (!formData.userId || formData.userId === 'loading' || formData.userId === 'none') {
      toast({ 
        variant: 'destructive', 
        title: 'Selection Error', 
        description: 'Please select a valid registered client.' 
      });
      return;
    }

    setIsSubmitting(true);
    const trackingNumber = generateTrackingCode();
    
    const shipmentData = {
      ...formData,
      trackingNumber,
      lastUpdate: new Date().toISOString(),
    };

    addDocumentNonBlocking(collection(firestore, 'shipments'), shipmentData)
      .then(() => {
        toast({ title: 'Success!', description: `Shipment ${trackingNumber} initialized.` });
        setFormData({
          userId: '',
          origin: '',
          destination: '',
          status: 'Pending',
          description: '',
          vessel: '',
        });
      })
      .catch((err) => {
          toast({ variant: 'destructive', title: 'Manifest Error', description: err.message });
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleUpdateStatus = (shipmentId: string, newStatus: string) => {
    if (!firestore || !isAdmin) return;
    const docRef = doc(firestore, 'shipments', shipmentId);
    updateDocumentNonBlocking(docRef, { 
      status: newStatus,
      lastUpdate: new Date().toISOString()
    });
    toast({ title: 'Status Updated', description: `Set to ${newStatus}.` });
  };

  const handleDelete = (id: string) => {
    if (!firestore || !isAdmin) return;
    deleteDocumentNonBlocking(doc(firestore, 'shipments', id));
    toast({ title: 'Removed', description: 'Shipment record deleted.' });
  };

  if (isAdminCheckLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <RefreshCw className="animate-spin text-accent h-8 w-8" />
        <p className="text-muted-foreground font-medium">Authenticating Admin Session...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="border-t-4 border-t-accent shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tight">
            <Plus className="w-5 h-5 text-accent" />
            {t.admin.newTracking}
          </CardTitle>
          <CardDescription>{t.admin.assignDesc}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateShipment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="userId" className="font-bold uppercase text-[10px] tracking-widest text-primary/60 flex items-center gap-2">
                <Users className="w-3 h-3" /> {t.admin.selectClient}
              </Label>
              <Select 
                onValueChange={(v) => setFormData(prev => ({ ...prev, userId: v }))} 
                value={formData.userId}
              >
                <SelectTrigger id="userId" className="bg-background border-primary/20 h-12">
                  <SelectValue placeholder={isUsersLoading ? "Syncing directory..." : t.admin.chooseClient} />
                </SelectTrigger>
                <SelectContent>
                  {isUsersLoading ? (
                    <SelectItem value="loading" disabled>Fetching directory...</SelectItem>
                  ) : users && users.length > 0 ? (
                    users.map(u => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.username || u.email}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No clients registered</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">{t.admin.logisticsStatus}</Label>
              <Select 
                onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))} 
                value={formData.status}
              >
                <SelectTrigger id="status" className="bg-background border-primary/20 h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
                  <SelectItem value="Delivered">Delivered</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">{t.admin.origin}</Label>
              <Input 
                id="origin"
                placeholder="Origin" 
                value={formData.origin}
                className="h-12 border-primary/20"
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">{t.admin.destination}</Label>
              <Input 
                id="destination"
                placeholder="Destination" 
                value={formData.destination}
                className="h-12 border-primary/20"
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
            <Button type="submit" className="md:col-span-2 bg-primary hover:bg-primary/90 shadow-xl h-14 font-black uppercase tracking-widest" disabled={isSubmitting || !isAdmin}>
              {isSubmitting ? <RefreshCw className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              {t.admin.initiateBtn}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-none overflow-hidden">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="flex items-center gap-2 font-black uppercase tracking-tight">
            <Package className="w-5 h-5 text-accent" />
            {t.admin.manifest}
          </CardTitle>
          <CardDescription className="text-primary-foreground/70">{t.admin.manifestDesc}</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">{t.dashboard.trackingNum}</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">{t.admin.client}</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">{t.dashboard.route}</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">{t.dashboard.status}</TableHead>
                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest">{t.admin.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isShipmentsLoading || isAdminCheckLoading) ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-20">
                    <RefreshCw className="animate-spin inline mr-3 h-8 w-8 text-accent" /> 
                    <p className="mt-4 text-muted-foreground font-bold">Syncing Manifest...</p>
                  </TableCell>
                </TableRow>
              ) : shipments && shipments.length > 0 ? (
                shipments.map(s => (
                  <TableRow key={s.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono font-bold text-primary">{s.trackingNumber}</TableCell>
                    <TableCell className="font-medium">
                      {users?.find(u => u.id === s.userId)?.username || s.userId}
                    </TableCell>
                    <TableCell className="text-sm">
                      {s.origin} → {s.destination}
                    </TableCell>
                    <TableCell>
                       <Select 
                        defaultValue={s.status} 
                        onValueChange={(val) => handleUpdateStatus(s.id, val)}
                       >
                         <SelectTrigger className="h-8 w-[160px] text-[10px] font-black uppercase tracking-widest border-accent/20 bg-accent/5">
                           <SelectValue />
                         </SelectTrigger>
                         <SelectContent>
                           <SelectItem value="Pending">Pending</SelectItem>
                           <SelectItem value="In Transit">In Transit</SelectItem>
                           <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
                           <SelectItem value="Delivered">Delivered</SelectItem>
                           <SelectItem value="Delayed">Delayed</SelectItem>
                         </SelectContent>
                       </Select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="font-bold text-lg">No shipments found</p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
