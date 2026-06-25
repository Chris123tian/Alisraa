'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, MapPin, Truck, CheckCircle2, Clock, ShieldCheck, Globe, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';
import { useFirestore } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface ShipmentData {
  id: string;
  trackingNumber: string;
  origin: string;
  destination: string;
  status: 'Pending' | 'In Transit' | 'Customs Clearance' | 'Delivered' | 'Delayed';
  description?: string;
  vessel?: string;
  lastUpdate?: string;
}

export default function TrackingPage() {
  const { t } = useLanguage();
  const firestore = useFirestore();
  
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [shipment, setShipment] = useState<ShipmentData | null>(null);
  const [searched, setSearched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode.trim() || !firestore) return;

    setIsSearching(true);
    setSearched(true);
    setErrorMsg('');
    setShipment(null);

    try {
      const shipmentsRef = collection(firestore, 'shipments');
      const q = query(shipmentsRef, where('trackingNumber', '==', trackingCode.trim().toUpperCase()));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setShipment({ id: doc.id, ...doc.data() } as ShipmentData);
      } else {
        setShipment(null);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Error pulling tracking information.');
    } finally {
      setIsSearching(false);
    }
  };

  const getStepStatus = (stepLabel: string, currentStatus: string) => {
    const statusOrder = ['Pending', 'In Transit', 'Customs Clearance', 'Delivered'];
    const currentIdx = statusOrder.indexOf(currentStatus === 'Delayed' ? 'In Transit' : currentStatus);
    
    let stepIdx = 0;
    if (stepLabel === 'transit') stepIdx = 1;
    if (stepLabel === 'customs') stepIdx = 2;
    if (stepLabel === 'delivery') stepIdx = 3;

    if (currentStatus === 'Delivered') return 'completed';
    if (stepIdx < currentIdx) return 'completed';
    if (stepIdx === currentIdx) return 'active';
    return 'pending';
  };

  const steps = [
    { key: 'confirmed', label: t.tracking.steps.confirmed, icon: CheckCircle2 },
    { key: 'transit', label: t.tracking.steps.transit, icon: Truck },
    { key: 'customs', label: t.tracking.steps.customs, icon: ShieldCheck },
    { key: 'delivery', label: t.tracking.steps.delivery, icon: MapPin },
  ];

  const getProgressWidth = (status: string) => {
    if (status === 'Pending') return '15%';
    if (status === 'In Transit' || status === 'Delayed') return '45%';
    if (status === 'Customs Clearance') return '75%';
    if (status === 'Delivered') return '100%';
    return '0%';
  };

  return (
    <>
      <PageHeader title={t.tracking.title} breadcrumb={[{ href: '/tracking', label: t.nav.tracking }]} />
      <section className="py-12 md:py-20 bg-background overflow-hidden relative">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="shadow-2xl border-none rounded-[1.5rem] md:rounded-3xl overflow-hidden">
            <div className="bg-primary p-6 md:p-8 text-white text-center">
              <CardTitle className="text-2xl md:text-3xl mb-2">{t.tracking.trackJourney}</CardTitle>
              <CardDescription className="text-gray-400 text-sm">{t.tracking.enterId}</CardDescription>
            </div>
            <CardContent className="p-6 md:p-12">
              <form onSubmit={handleTrack} className="flex flex-col gap-4">
                <div className="relative group w-full">
                  <Input 
                    placeholder={t.tracking.placeholder} 
                    value={trackingCode}
                    onChange={(e) => setTrackingCode(e.target.value)}
                    className="h-14 md:h-16 pl-12 pr-4 md:pr-40 text-lg md:text-xl rounded-xl md:rounded-2xl border-2 border-primary/10 focus:border-accent transition-all" 
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-accent transition-colors" />
                  <div className="hidden md:block absolute right-2 top-2">
                    <Button 
                      type="submit" 
                      disabled={isSearching}
                      className="h-12 px-10 rounded-xl bg-accent hover:bg-accent/90 shadow-lg text-lg font-bold text-white"
                    >
                      {isSearching ? t.tracking.syncing : t.tracking.trackBtn}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="md:hidden w-full h-12 bg-accent hover:bg-accent/90 shadow-lg text-base font-bold rounded-xl text-white"
                >
                  {isSearching ? t.tracking.syncing : t.tracking.trackBtn}
                </Button>
              </form>

              {errorMsg && (
                <div className="mt-6 p-4 bg-destructive/10 text-destructive rounded-xl border border-destructive/20 text-sm flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  {errorMsg}
                </div>
              )}

              {searched && shipment && (
                <div className="mt-12 md:mt-16 space-y-8 md:space-y-12">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-accent/5 rounded-2xl border border-accent/20 text-center md:text-left">
                    <div>
                      <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-widest mb-1">{t.tracking.currentStatus}</p>
                      <h4 className="text-xl md:text-2xl font-black text-primary uppercase">
                        {shipment.status} {shipment.vessel ? `(${shipment.vessel})` : ''}
                      </h4>
                      {shipment.description && (
                        <p className="text-sm text-muted-foreground mt-1 font-medium">{shipment.description}</p>
                      )}
                    </div>
                    <div className="md:text-right">
                      <p className="text-[10px] md:text-xs text-muted-foreground mb-1">{t.tracking.estimatedArrival}</p>
                      <h4 className="text-lg md:text-xl font-bold flex items-center justify-center md:justify-end gap-2">
                        <Clock className="w-5 h-5 text-accent" /> 
                        {shipment.lastUpdate ? new Date(shipment.lastUpdate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : t.tracking.calculating}
                      </h4>
                    </div>
                  </div>

                  <div className="overflow-x-auto pb-4 -mx-2 px-2">
                    <div className="relative flex justify-between min-w-[500px] md:min-w-0">
                      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-accent transition-all duration-1000" 
                          style={{ width: getProgressWidth(shipment.status) }}
                        />
                      </div>
                      
                      {steps.map((step) => {
                        const stepStatus = getStepStatus(step.key, shipment.status);
                        return (
                          <div key={step.key} className="flex flex-col items-center gap-3">
                            <div className={cn(
                              "w-10 h-10 md:w-12 md:h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                              stepStatus === 'completed' ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(255,191,0,0.4)]" :
                              stepStatus === 'active' ? "bg-white border-accent text-accent animate-pulse" :
                              "bg-white border-gray-200 text-gray-300"
                            )}>
                              <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                            </div>
                            <span className={cn(
                              "text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap",
                              stepStatus === 'pending' ? "text-gray-400" : "text-primary"
                            )}>{step.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t">
                    <div className="space-y-2 md:space-y-4">
                      <h5 className="font-bold text-sm md:text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {t.tracking.origin}</h5>
                      <p className="text-sm md:text-base text-muted-foreground font-semibold">{shipment.origin}</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <h5 className="font-bold text-sm md:text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {t.tracking.destination}</h5>
                      <p className="text-sm md:text-base text-muted-foreground font-semibold">{shipment.destination}</p>
                    </div>
                  </div>
                </div>
              )}

              {searched && !shipment && !isSearching && (
                <div className="mt-8 md:mt-12 py-12 md:py-16 px-6 md:px-8 border-2 border-dashed border-gray-100 rounded-[1.5rem] md:rounded-3xl text-center space-y-4">
                  <div className="bg-primary/5 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 md:w-10 md:h-10 text-primary/20" />
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg">{t.tracking.noDetails}</p>
                </div>
              )}

              {!searched && !isSearching && (
                <div className="mt-8 md:mt-12 py-12 md:py-16 px-6 md:px-8 border-2 border-dashed border-gray-100 rounded-[1.5rem] md:rounded-3xl text-center space-y-4">
                  <div className="bg-primary/5 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 md:w-10 md:h-10 text-primary/20" />
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg">Please enter your tracking reference to view genuine shipment progress maps.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-16 md:mt-20 text-center space-y-8 md:space-y-12">
            <h3 className="text-2xl md:text-3xl font-black text-primary">{t.tracking.regionalHubs}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {['Syria', 'Germany', 'USA', 'Africa'].map(country => (
                <div key={country} className="p-4 md:p-6 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 hover:border-accent hover:shadow-md transition-all group cursor-default">
                  <Globe className="w-6 h-6 md:w-8 md:h-8 text-primary/20 group-hover:text-accent mx-auto mb-2 md:mb-4 transition-colors" />
                  <span className="font-bold text-sm md:text-base text-primary">{country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
