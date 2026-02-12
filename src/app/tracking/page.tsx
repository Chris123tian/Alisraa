'use client';

import { useState, useEffect } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, MapPin, Truck, CheckCircle2, Clock, ShieldCheck, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/use-language';

export default function TrackingPage() {
  const { t } = useLanguage();
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [arrivalDate, setArrivalDate] = useState('');

  useEffect(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    setArrivalDate(date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }));
  }, []);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setHasResult(true);
    }, 1200);
  };

  const steps = [
    { label: t.tracking.steps.confirmed, icon: CheckCircle2, status: 'completed' },
    { label: t.tracking.steps.transit, icon: Truck, status: 'active' },
    { label: t.tracking.steps.customs, icon: ShieldCheck, status: 'pending' },
    { label: t.tracking.steps.delivery, icon: MapPin, status: 'pending' },
  ];

  return (
    <>
      <PageHeader title={t.tracking.title} breadcrumb={[{ href: '/tracking', label: t.nav.tracking }]} />
      <section className="py-12 md:py-20 bg-background overflow-hidden relative">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="shadow-2xl border-none rounded-[1.5rem] md:rounded-3xl overflow-hidden animate-fade-up">
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
                    onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                    className="h-14 md:h-16 pl-12 pr-4 md:pr-40 text-lg md:text-xl rounded-xl md:rounded-2xl border-2 border-primary/10 focus:border-accent transition-all shadow-inner" 
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-accent transition-colors" />
                  <div className="hidden md:block absolute right-2 top-2">
                    <Button 
                      type="submit" 
                      disabled={isSearching}
                      className="h-12 px-10 rounded-xl bg-accent hover:bg-accent/90 shadow-lg text-lg font-bold"
                    >
                      {isSearching ? t.tracking.syncing : t.tracking.trackBtn}
                    </Button>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="md:hidden w-full h-12 bg-accent hover:bg-accent/90 shadow-lg text-base font-bold rounded-xl"
                >
                  {isSearching ? t.tracking.syncing : t.tracking.trackBtn}
                </Button>
              </form>

              {hasResult && (
                <div className="mt-12 md:mt-16 space-y-8 md:space-y-12 animate-fade-up">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-accent/5 rounded-2xl border border-accent/20 text-center md:text-left">
                    <div>
                      <p className="text-[10px] md:text-xs font-bold text-accent uppercase tracking-widest mb-1">{t.tracking.currentStatus}</p>
                      <h4 className="text-xl md:text-2xl font-black text-primary">In Transit (Mediterranean Sea)</h4>
                    </div>
                    <div className="md:text-right">
                      <p className="text-[10px] md:text-xs text-muted-foreground mb-1">{t.tracking.estimatedArrival}</p>
                      <h4 className="text-lg md:text-xl font-bold flex items-center justify-center md:justify-end gap-2">
                        <Clock className="w-5 h-5 text-accent" /> {arrivalDate || t.tracking.calculating}
                      </h4>
                    </div>
                  </div>

                  {/* Tracking Steps - Scrollable on mobile */}
                  <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                    <div className="relative flex justify-between min-w-[500px] md:min-w-0">
                      <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10 rounded-full overflow-hidden">
                        <div className="h-full bg-accent w-[40%] transition-all duration-1000" />
                      </div>
                      
                      {steps.map((step, i) => (
                        <div key={i} className="flex flex-col items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 md:w-12 md:h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                            step.status === 'completed' ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(255,191,0,0.4)]" :
                            step.status === 'active' ? "bg-white border-accent text-accent animate-pulse" :
                            "bg-white border-gray-200 text-gray-300"
                          )}>
                            <step.icon className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                          <span className={cn(
                            "text-[10px] font-bold uppercase tracking-tighter whitespace-nowrap",
                            step.status === 'pending' ? "text-gray-400" : "text-primary"
                          )}>{step.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 md:gap-8 pt-6 md:pt-8 border-t">
                    <div className="space-y-2 md:space-y-4">
                      <h5 className="font-bold text-sm md:text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {t.tracking.origin}</h5>
                      <p className="text-sm md:text-base text-muted-foreground">Port of Latakia, Syria</p>
                    </div>
                    <div className="space-y-2 md:space-y-4">
                      <h5 className="font-bold text-sm md:text-base flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> {t.tracking.destination}</h5>
                      <p className="text-sm md:text-base text-muted-foreground">Port of Hamburg, Germany</p>
                    </div>
                  </div>
                </div>
              )}

              {!hasResult && !isSearching && (
                <div className="mt-8 md:mt-12 py-12 md:py-16 px-6 md:px-8 border-2 border-dashed border-gray-100 rounded-[1.5rem] md:rounded-3xl text-center space-y-4">
                  <div className="bg-primary/5 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8 md:w-10 md:h-10 text-primary/20" />
                  </div>
                  <p className="text-muted-foreground text-base md:text-lg">{t.tracking.noDetails}</p>
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
