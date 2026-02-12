'use client';

import { Hero } from '@/components/homepage/hero';
import { Button } from '@/components/ui/button';
import { services, aboutContent } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, Globe2, ShieldCheck, Zap, ArrowRight, Ship } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';

export default function Home() {
  const { t } = useLanguage();

  const servicesImg = PlaceHolderImages.find(img => img.id === 'service-ocean')?.imageUrl || 'https://picsum.photos/seed/services/800/600';
  const aboutImg = PlaceHolderImages.find(img => img.id === 'about-team')?.imageUrl || 'https://picsum.photos/seed/about/800/600';

  return (
    <>
      <Hero />
      
      {/* Services Preview Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 animate-fade-up">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold uppercase text-accent mb-4 tracking-[0.3em]">{t.home.expertise}</h2>
              <h3 className="text-4xl md:text-6xl font-black text-primary tracking-tighter leading-[1.1]">
                {t.home.solutionsTitle}
              </h3>
            </div>
            <Button size="lg" variant="outline" className="rounded-full px-10 border-primary text-primary hover:bg-primary hover:text-white transition-all h-14 font-bold" asChild>
              <Link href="/services">{t.home.exploreBtn}</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service, idx) => (
              <Card key={service.title} className="relative overflow-hidden group border-none shadow-2xl rounded-[2rem] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full bg-card">
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id.includes(service.title.split(' ')[0].toLowerCase()))?.imageUrl || servicesImg}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                </div>
                <div className="flex-grow p-10 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="bg-accent text-white rounded-2xl p-4 w-fit shadow-xl shadow-accent/20">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="text-2xl font-black text-primary uppercase tracking-tight">{service.title}</CardTitle>
                    <p className="text-muted-foreground leading-relaxed font-medium">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/10 blur-[150px] rounded-full -mr-80 -mt-80" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full -ml-80 -mb-80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative h-[600px] rounded-[3rem] overflow-hidden shadow-3xl group">
              <Image 
                src={aboutImg}
                alt="Al-Israa Logistics Management"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                data-ai-hint="logistics management"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12 p-10 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-1 bg-accent rounded-full" />
                  <span className="font-bold text-accent uppercase tracking-[0.2em] text-sm">Est. 1998</span>
                </div>
                <p className="text-3xl font-black italic mb-2 tracking-tighter leading-tight">
                  "{t.home.trustTitle}"
                </p>
                <p className="text-accent font-bold uppercase tracking-widest">— {t.about.title}</p>
              </div>
            </div>

            <div className="space-y-12 animate-fade-up">
              <div className="space-y-6">
                <h2 className="text-sm font-bold uppercase text-accent tracking-[0.4em]">{t.about.explained}</h2>
                <h3 className="text-5xl md:text-7xl font-black leading-[1] tracking-tighter uppercase">
                  {t.about.guideTitle}
                </h3>
                <p className="text-xl text-gray-300 max-w-xl font-medium leading-relaxed">
                  {t.about.guideDesc}
                </p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-10">
                {[
                  { icon: Globe2, title: t.home.globalNetwork, desc: t.home.globalNetworkDesc },
                  { icon: Zap, title: t.home.fastDelivery, desc: t.home.fastDeliveryDesc },
                  { icon: ShieldCheck, title: t.home.secureCargo, desc: t.home.secureCargoDesc },
                  { icon: Ship, title: t.about.vesselSchedule, desc: t.about.planShipments }
                ].map((item, i) => (
                  <div key={i} className="group space-y-4">
                    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl w-fit group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-xl mb-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-black h-16 px-12 text-lg rounded-full shadow-2xl transition-transform hover:scale-105" asChild>
                  <Link href="/about">{t.about.learnMore} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-accent overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-4 text-center space-y-10 relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
            {t.home.quoteTitle} <br/>
            <span className="text-primary/80">{t.home.quoteSubtitle}</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-xl px-14 h-20 rounded-full shadow-3xl transition-transform hover:scale-105 font-black uppercase tracking-widest" asChild>
              <Link href="/contact">{t.home.requestQuote}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white border-2 text-white hover:bg-white hover:text-accent text-xl px-14 h-20 rounded-full backdrop-blur-md transition-transform hover:scale-105 font-black uppercase tracking-widest" asChild>
              <Link href="/tracking">{t.home.trackPackage}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
