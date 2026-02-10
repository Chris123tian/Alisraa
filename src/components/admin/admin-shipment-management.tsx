'use client';

import { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase, addDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, orderBy, doc, limit } from 'firebase/firestore';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, Plus, RefreshCw, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/useAdmin';

export function AdminShipmentManagement() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const { isAdmin, isLoading: isAdminCheckLoading } = useAdmin();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    userId: '',
    origin: '',
    destination: '',
    status: 'Pending',
    description: '',
    vessel: '',
  });

  // Fetch all shipments
  const shipmentsQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(
      collection(firestore, 'shipments'), 
      orderBy('lastUpdate', 'desc'),
      limit(100)
    );
  }, [firestore, isAdmin]);

  const { data: shipments, isLoading: isShipmentsLoading } = useCollection(shipmentsQuery);

  // Fetch all users for the dropdown
  const usersQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(collection(firestore, 'users'), limit(500));
  }, [firestore, isAdmin]);

  const { data: users, isLoading: isUsersLoading } = useCollection(usersQuery);

  const generateTrackingCode = () => {
    return 'AL-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !formData.userId || !formData.origin || !formData.destination) {
      toast({ 
        variant: 'destructive', 
        title: 'Form Incomplete', 
        description: 'Please select a client and provide route details.' 
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
        toast({ title: 'Success!', description: `Shipment ${trackingNumber} created.` });
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
          toast({ variant: 'destructive', title: 'Error', description: err.message });
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleDelete = (id: string) => {
    if (!firestore) return;
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

  if (!isAdmin) {
    return (
      <Card className="p-8 text-center">
        <CardTitle>Access Denied</CardTitle>
        <CardDescription>You must be an administrator to view this manifest.</CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="border-t-4 border-t-accent shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary font-black uppercase tracking-tight">
            <Plus className="w-5 h-5 text-accent" />
            Initialize New Tracking
          </CardTitle>
          <CardDescription>Assign cargo to a registered client and generate a tracking ID.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateShipment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="userId" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">Select Registered Client</Label>
              <Select 
                onValueChange={(v) => setFormData(prev => ({ ...prev, userId: v }))} 
                value={formData.userId}
              >
                <SelectTrigger id="userId" className="bg-background border-primary/20 h-12">
                  <SelectValue placeholder={isUsersLoading ? "Syncing directory..." : "Choose a client"} />
                </SelectTrigger>
                <SelectContent>
                  {isUsersLoading ? (
                    <SelectItem value="loading" disabled>Fetching directory...</SelectItem>
                  ) : users && users.length > 0 ? (
                    users.map(u => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.username || u.email} ({u.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No clients found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">Logistics Status</Label>
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
              <Label htmlFor="origin" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">Route: Origin</Label>
              <Input 
                id="origin"
                placeholder="e.g. Damascus, Syria" 
                value={formData.origin}
                className="h-12"
                onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">Route: Destination</Label>
              <Input 
                id="destination"
                placeholder="e.g. Hamburg, Germany" 
                value={formData.destination}
                className="h-12"
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="vessel" className="font-bold uppercase text-[10px] tracking-widest text-primary/60">Vessel / Transport Info</Label>
              <Input 
                id="vessel"
                placeholder="e.g. MS Express Voyage #9921" 
                value={formData.vessel}
                className="h-12"
                onChange={(e) => setFormData(prev => ({ ...prev, vessel: e.target.value }))}
              />
            </div>
            <Button type="submit" className="md:col-span-2 bg-primary hover:bg-primary/90 shadow-xl h-14 font-black uppercase tracking-widest" disabled={isSubmitting}>
              {isSubmitting ? (
                <RefreshCw className="animate-spin mr-2" />
              ) : (
                <Plus className="mr-2" />
              )}
              Create Shipment & Generate Tracking
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-lg border-none overflow-hidden">
        <CardHeader className="bg-primary text-white">
          <CardTitle className="flex items-center gap-2 font-black uppercase tracking-tight">
            <Package className="w-5 h-5 text-accent" />
            Active Cargo Manifest
          </CardTitle>
          <CardDescription className="text-primary-foreground/70">Real-time status of all global shipments.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Tracking #</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Client</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Route</TableHead>
                <TableHead className="font-black uppercase text-[10px] tracking-widest">Status</TableHead>
                <TableHead className="text-right font-black uppercase text-[10px] tracking-widest">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isShipmentsLoading ? (
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
                      <span className="font-bold">{s.origin}</span> <span className="text-muted-foreground mx-1">→</span> <span className="font-bold">{s.destination}</span>
                    </TableCell>
                    <TableCell>
                       <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                         s.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                         s.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-accent/10 text-accent'
                       }`}>
                         {s.status}
                       </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive transition-colors" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-24 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-10" />
                    <p className="font-bold">No active shipments in the manifest.</p>
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
