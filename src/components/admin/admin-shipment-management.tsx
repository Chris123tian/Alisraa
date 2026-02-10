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
import { Trash2, Plus, RefreshCw, UserCheck, Package, MapPin, Truck } from 'lucide-react';
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

  // Defensive queries
  const shipmentsQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin) return null;
    return query(
      collection(firestore, 'shipments'), 
      orderBy('lastUpdate', 'desc'),
      limit(100)
    );
  }, [firestore, isAdmin]);

  const { data: shipments, isLoading: isShipmentsLoading } = useCollection(shipmentsQuery);

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
        description: 'Please select a client and specify both origin and destination.' 
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
        toast({ title: 'Success!', description: `Shipment ${trackingNumber} has been registered.` });
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
    return null;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <Card className="border-t-4 border-t-accent shadow-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Plus className="w-5 h-5 text-accent" />
            Initialize New Tracking
          </CardTitle>
          <CardDescription>Assign cargo to a registered client and generate a tracking ID.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateShipment} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="userId" className="font-semibold text-primary/80">Select Registered Client</Label>
              <Select 
                onValueChange={(v) => setFormData(prev => ({ ...prev, userId: v }))} 
                value={formData.userId}
              >
                <SelectTrigger id="userId" className="bg-background border-primary/20">
                  <SelectValue placeholder={isUsersLoading ? "Loading directory..." : "Select a client"} />
                </SelectTrigger>
                <SelectContent>
                  {isUsersLoading ? (
                    <SelectItem value="loading" disabled>Fetching directory...</SelectItem>
                  ) : users && users.length > 0 ? (
                    users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No clients found</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="font-semibold text-primary/80">Current Logistics Status</Label>
              <Select 
                onValueChange={(v) => setFormData(prev => ({ ...prev, status: v }))} 
                value={formData.status}
              >
                <SelectTrigger id="status" className="bg-background border-primary/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending Assignment</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                  <SelectItem value="Customs Clearance">Customs Clearance</SelectItem>
                  <SelectItem value="Delivered">Final Delivery</SelectItem>
                  <SelectItem value="Delayed">Logistics Delay</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="origin" className="font-semibold text-primary/80">Port of Origin</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="origin"
                  placeholder="e.g. Damascus, Syria" 
                  value={formData.origin}
                  onChange={(e) => setFormData(prev => ({ ...prev, origin: e.target.value }))}
                  className="pl-10 bg-background border-primary/20"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination" className="font-semibold text-primary/80">Port of Destination</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="destination"
                  placeholder="e.g. Berlin, Germany" 
                  value={formData.destination}
                  onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                  className="pl-10 bg-background border-primary/20"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="vessel" className="font-semibold text-primary/80">Vessel / Transport Info</Label>
              <div className="relative">
                <Truck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="vessel"
                  placeholder="e.g. MS Hamburg Express (Voyage #9921)" 
                  value={formData.vessel}
                  onChange={(e) => setFormData(prev => ({ ...prev, vessel: e.target.value }))}
                  className="pl-10 bg-background border-primary/20"
                />
              </div>
            </div>
            <Button type="submit" className="md:col-span-2 py-6 text-lg bg-primary hover:bg-primary/90 shadow-lg group" disabled={isSubmitting || !formData.userId}>
              {isSubmitting ? (
                <RefreshCw className="animate-spin mr-2" />
              ) : (
                <Plus className="mr-2 group-hover:rotate-90 transition-transform" />
              )}
              Create Shipment & Generate Link
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="shadow-sm">
        <CardHeader className="bg-primary/5 rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-accent" />
            Active Cargo Manifest
          </CardTitle>
          <CardDescription>View and track all active shipments on the platform.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="font-bold">Tracking #</TableHead>
                  <TableHead className="font-bold">Client</TableHead>
                  <TableHead className="font-bold">Route</TableHead>
                  <TableHead className="font-bold">Status</TableHead>
                  <TableHead className="text-right font-bold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isShipmentsLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                      <RefreshCw className="animate-spin inline mr-3 h-5 w-5" /> 
                      Syncing Cargo...
                    </TableCell>
                  </TableRow>
                ) : shipments && shipments.length > 0 ? (
                  shipments.map(shipment => (
                    <TableRow key={shipment.id} className="hover:bg-accent/5 transition-colors">
                      <TableCell className="font-mono font-black text-primary tracking-tighter">{shipment.trackingNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <UserCheck className="w-3 h-3 text-accent" />
                          <span className="font-medium">
                            {users?.find(u => u.id === shipment.userId)?.username || 'User Record'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        <span className="font-semibold">{shipment.origin}</span>
                        <span className="mx-2 text-accent">→</span>
                        <span className="font-semibold">{shipment.destination}</span>
                      </TableCell>
                      <TableCell>
                         <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                           shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                           shipment.status === 'Delayed' ? 'bg-red-100 text-red-700' : 'bg-primary/10 text-primary'
                         }`}>
                           {shipment.status}
                         </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(shipment.id)} className="text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-muted-foreground italic">
                      No shipments found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
