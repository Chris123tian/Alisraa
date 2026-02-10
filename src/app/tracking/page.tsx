'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Package, MapPin, Truck, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function TrackingPage() {
  const [trackingCode, setTrackingCode] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [hasResult, setHasResult] = useState(false);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingCode) return;
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      setHasResult(true);
    }, 1200);
  };

  const steps = [
    { label: 'Booking Confirmed', icon: CheckCircle2, status: 'completed' },
    { label: 'In Transit', icon: Truck, status: 'active' },
    { label: 'Customs Clearance', icon: ShieldCheck, status: 'pending' },
    { label: 'Out for Delivery', icon: MapPin, status: 'pending' },
  ];

  return (
    <>
      <PageHeader title="Global Tracking" breadcrumb={[{ href: '/tracking', label: 'Tracking' }]} />
      <section className="py-20 bg-background overflow-hidden relative">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-accent/5 blur-[100px] rounded-full" />
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <Card className="shadow-2xl border-none rounded-3xl overflow-hidden animate-fade-up">
            <div className="bg-primary p-8 text-white text-center">
              <CardTitle className="text-3xl mb-2">Track Your Journey</CardTitle>
              <CardDescription className="text-gray-400">Enter your unique tracking ID for live cargo updates.</CardDescription>
            </div>
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleTrack} className="relative group">
                <Input 
                  placeholder="e.g. AL-X92B10J..." 
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value.toUpperCase())}
                  className="h-16 pl-12 pr-40 text-xl rounded-2xl border-2 border-primary/10 focus:border-accent transition-all shadow-inner" 
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-accent transition-colors" />
                <Button 
                  type="submit" 
                  disabled={isSearching}
                  className="absolute right-2 top-2 h-12 px-10 rounded-xl bg-accent hover:bg-accent/90 shadow-lg text-lg font-bold"
                >
                  {isSearching ? 'Syncing...' : 'Track'}
                </Button>
              </form>

              {hasResult && (
                <div className="mt-16 space-y-12 animate-fade-up">
                  <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-accent/5 rounded-2xl border border-accent/20">
                    <div>
                      <p className="text-sm font-bold text-accent uppercase tracking-widest mb-1">Current Status</p>
                      <h4 className="text-2xl font-black text-primary">In Transit (Mediterranean Sea)</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground mb-1">Estimated Arrival</p>
                      <h4 className="text-xl font-bold flex items-center gap-2">
                        <Clock className="w-5 h-5 text-accent" /> Oct 24, 2023
                      </h4>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  <div className="relative flex justify-between">
                    <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10 rounded-full overflow-hidden">
                      <div className="h-full bg-accent w-[40%] transition-all duration-1000" />
                    </div>
                    
                    {steps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500",
                          step.status === 'completed' ? "bg-accent border-accent text-white shadow-[0_0_20px_rgba(255,191,0,0.4)]" :
                          step.status === 'active' ? "bg-white border-accent text-accent animate-pulse" :
                          "bg-white border-gray-200 text-gray-300"
                        )}>
                          <step.icon className="w-6 h-6" />
                        </div>
                        <span className={cn(
                          "text-xs font-bold uppercase tracking-tighter whitespace-nowrap",
                          step.status === 'pending' ? "text-gray-400" : "text-primary"
                        )}>{step.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 pt-8 border-t">
                    <div className="space-y-4">
                      <h5 className="font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Origin</h5>
                      <p className="text-muted-foreground">Port of Latakia, Syria<br/><span className="text-xs">Departed Oct 10, 09:12 AM</span></p>
                    </div>
                    <div className="space-y-4">
                      <h5 className="font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-accent" /> Destination</h5>
                      <p className="text-muted-foreground">Port of Hamburg, Germany<br/><span className="text-xs">Expected Arrival Oct 24</span></p>
                    </div>
                  </div>
                </div>
              )}

              {!hasResult && !isSearching && (
                <div className="mt-12 py-16 px-8 border-2 border-dashed border-gray-100 rounded-3xl text-center space-y-4">
                  <div className="bg-primary/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <Package className="w-10 h-10 text-primary/20" />
                  </div>
                  <p className="text-muted-foreground text-lg">No tracking details yet. Enter a valid ID to see live logistics data.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-20 text-center space-y-12">
            <h3 className="text-3xl font-black text-primary">Regional Express Hubs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Syria', 'Germany', 'USA', 'Africa'].map(country => (
                <div key={country} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-accent hover:shadow-md transition-all group cursor-default">
                  <Globe2 className="w-8 h-8 text-primary/20 group-hover:text-accent mx-auto mb-4 transition-colors" />
                  <span className="font-bold text-primary">{country}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}