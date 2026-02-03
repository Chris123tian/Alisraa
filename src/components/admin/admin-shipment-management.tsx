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
import { Trash2, Plus, RefreshCw } from 'lucide-react';
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
    if (!firestore || !isAdmin || isAdminCheckLoading) return null;
    return query(
      collection(firestore, 'shipments'), 
      orderBy('lastUpdate', 'desc'),
      limit(100)
    );
  }, [firestore, isAdmin, isAdminCheckLoading]);

  const { data: shipments, isLoading: isShipmentsLoading } = useCollection(shipmentsQuery);

  const usersQuery = useMemoFirebase(() => {
    if (!firestore || !isAdmin || isAdminCheckLoading) return null;
    return query(collection(firestore, 'users'), limit(500));
  }, [firestore, isAdmin, isAdminCheckLoading]);

  const { data: users, isLoading: isUsersLoading } = useCollection(usersQuery);

  const generateTrackingCode = () => {
    return 'AL-' + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleCreateShipment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore || !formData.userId || !formData.origin || !formData.destination) {
      toast({ 
        variant: 'destructive', 
        title: 'Missing Information', 
        description: 'Please select a client and provide both origin and destination.' 
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
        toast({ title: 'Shipment Created', description: `Tracking Code: ${trackingNumber}` });
        setFormData({
          userId: '',
          origin: '',
          destination: '',
          status: 'Pending',
          description: '',
          vessel: '',
        });
      })
      .finally(() => setIsSubmitting(false));
  };

  const handleDelete = (id: string) => {
    if (!firestore) return;
    deleteDocumentNonBlocking(doc(firestore, 'shipments', id));
  };

  if (isAdminCheckLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <RefreshCw className="animate-spin text-primary h-8 w-8" />
        <p className="text-muted-foreground">Verifying administrative access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Shipment</CardTitle>
          <CardDescription>Assign a new shipment to a client and generate a tracking code.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateShipment} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userId">Client</Label>
              <Select 
                onValueChange={(v) => setFormData({ ...formData, userId: v })} 
                value={formData.userId}
              >
                <SelectTrigger id="userId">
                  <SelectValue placeholder={isUsersLoading ? "Loading clients..." : "Select a client"} />
                </SelectTrigger>
                <SelectContent>
                  {isUsersLoading ? (
                    <SelectItem value="loading" disabled>Fetching users...</SelectItem>
                  ) : users && users.length > 0 ? (
                    users.map(user => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.username} ({user.email})
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>No clients registered yet</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select 
                onValueChange={(v) => setFormData({ ...formData, status: v })} 
                value={formData.status}
              >
                <SelectTrigger id="status">
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
              <Label htmlFor="origin">Origin</Label>
              <Input 
                id="origin"
                placeholder="e.g. Syria" 
                value={formData.origin}
                onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input 
                id="destination"
                placeholder="e.g. Germany" 
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="vessel">Vessel / Flight Info</Label>
              <Input 
                id="vessel"
                placeholder="e.g. Maersk Hamburg" 
                value={formData.vessel}
                onChange={(e) => setFormData({ ...formData, vessel: e.target.value })}
              />
            </div>
            <Button type="submit" className="md:col-span-2" disabled={isSubmitting}>
              {isSubmitting ? <RefreshCw className="animate-spin mr-2" /> : <Plus className="mr-2" />}
              Create Shipment & Generate Link
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Shipments</CardTitle>
          <CardDescription>View and track all active shipments on the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tracking #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isShipmentsLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8">Loading shipments...</TableCell></TableRow>
              ) : shipments?.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-8">No shipments found.</TableCell></TableRow>
              ) : shipments?.map(shipment => (
                <TableRow key={shipment.id}>
                  <TableCell className="font-mono font-bold text-primary">{shipment.trackingNumber}</TableCell>
                  <TableCell>
                    {users?.find(u => u.id === shipment.userId)?.username || 'Unknown Client'}
                  </TableCell>
                  <TableCell>{shipment.origin} → {shipment.destination}</TableCell>
                  <TableCell>{shipment.status}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(shipment.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
