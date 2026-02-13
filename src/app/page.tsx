'use client';

import { Hero } from '@/components/homepage/hero';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Globe2, ShieldCheck, Zap, ArrowRight, Ship, Target, Eye, HelpCircle, Plane, Truck } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Home() {
  const { t } = useLanguage();

  const servicesImg = PlaceHolderImages.find(img => img.id === 'service-ocean')?.imageUrl || 'https://picsum.photos/seed/services/800/600';
  const aboutImg = PlaceHolderImages.find(img => img.id === 'about-team')?.imageUrl || 'https://picsum.photos/seed/about/800/600';
  const missionImg = PlaceHolderImages.find(img => img.id === 'about-supply')?.imageUrl || 'https://picsum.photos/seed/mission/800/600';

  // Map of service types to icons
  const serviceIcons = [Ship, Plane, Truck];

  return (
    <>
      <Hero />
      
      {/* Services Preview Section */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6 md:gap-8 animate-fade-up">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="text-xs md:text-sm font-bold uppercase text-accent mb-4 tracking-[0.3em]">{t.home.expertise}</h2>
              <h3 className="text-3xl md:text-6xl font-black text-primary tracking-tighter leading-[1.1]">
                {t.home.solutionsTitle}
              </h3>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button size="lg" variant="outline" className="rounded-full px-8 md:px-10 border-primary text-primary hover:bg-primary hover:text-white transition-all h-12 md:h-14 font-bold" asChild>
                <Link href="/services">{t.home.exploreBtn}</Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {t.home.servicesList.map((service: any, idx: number) => {
              const Icon = serviceIcons[idx] || Ship;
              const imageId = idx === 0 ? 'service-ocean' : idx === 1 ? 'service-air' : 'service-truck';
              const imageUrl = PlaceHolderImages.find(img => img.id === imageId)?.imageUrl || servicesImg;

              return (
                <Card key={idx} className={`relative overflow-hidden group border-none shadow-xl md:shadow-2xl rounded-[1.5rem] md:rounded-[2rem] transition-all duration-700 hover:-translate-y-2 flex flex-col h-full bg-card animate-in fade-in slide-in-from-bottom-8 duration-500`} style={{ animationDelay: `${idx * 150}ms` }}>
                  <div className="h-48 md:h-64 relative overflow-hidden">
                    <Image 
                      src={imageUrl}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                  </div>
                  <div className="flex-grow p-6 md:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="bg-accent text-white rounded-xl md:rounded-2xl p-3 md:p-4 w-fit shadow-lg shadow-accent/20 transition-transform group-hover:rotate-12">
                        <Icon className="w-6 h-6 md:w-8 md:h-8" />
                      </div>
                      <CardTitle className="text-xl md:text-2xl font-black text-primary uppercase tracking-tight">{service.title}</CardTitle>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-medium">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-12">
              <div className="flex gap-6 animate-in slide-in-from-left duration-700">
                <div className="bg-primary text-white p-4 rounded-2xl h-fit">
                  <Target className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.home.missionTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t.home.missionDesc}
                  </p>
                </div>
              </div>
              <div className="flex gap-6 animate-in slide-in-from-left duration-700 delay-200">
                <div className="bg-accent text-white p-4 rounded-2xl h-fit">
                  <Eye className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-primary uppercase tracking-tight">{t.home.visionTitle}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {t.home.visionDesc}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in duration-1000">
              <Image 
                src={missionImg}
                alt="Al-Israa Mission"
                fill
                className="object-cover"
                data-ai-hint="supply chain logistics"
              />
              <div className="absolute inset-0 bg-primary/10" />
            </div>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 md:py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/10 blur-[100px] md:blur-[150px] rounded-full -mr-40 md:-mr-80 -mt-40 md:-mt-80" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-accent/5 blur-[100px] md:blur-[150px] rounded-full -ml-40 md:-ml-80 -mb-40 md:-mb-80" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative h-[400px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-3xl group order-2 lg:order-1">
              <Image 
                src={aboutImg}
                alt="Al-Israa Logistics Management"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
                data-ai-hint="logistics management"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
              <div className="absolute bottom-6 md:bottom-12 left-6 md:left-12 right-6 md:right-12 p-6 md:p-10 bg-white/10 backdrop-blur-xl rounded-[1.5rem] md:rounded-[2.5rem] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-8 md:w-12 h-1 bg-accent rounded-full" />
                  <span className="font-bold text-accent uppercase tracking-[0.2em] text-[10px] md:text-sm">Est. 1998</span>
                </div>
                <p className="text-xl md:text-3xl font-black italic mb-2 tracking-tighter leading-tight">
                  "{t.home.trustTitle}"
                </p>
                <p className="text-accent font-bold uppercase tracking-widest text-xs md:text-sm">— {t.about.title}</p>
              </div>
            </div>

            <div className="space-y-8 md:order-1 lg:order-2">
              <div className="space-y-4 md:space-y-6 text-center lg:text-left">
                <h2 className="text-xs md:text-sm font-bold uppercase text-accent tracking-[0.4em]">{t.about.explained}</h2>
                <h3 className="text-4xl md:text-7xl font-black leading-[1.1] md:leading-[1] tracking-tighter uppercase">
                  {t.about.guideTitle}
                </h3>
                <p className="text-base md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                  {t.about.guideDesc}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
                {[
                  { icon: Globe2, title: t.home.globalNetwork, desc: t.home.globalNetworkDesc },
                  { icon: Zap, title: t.home.fastDelivery, desc: t.home.fastDeliveryDesc },
                  { icon: ShieldCheck, title: t.home.secureCargo, desc: t.home.secureCargoDesc },
                  { icon: Ship, title: t.about.vesselSchedule, desc: t.about.planShipments }
                ].map((item, i) => (
                  <div key={i} className="group flex flex-col items-center lg:items-start space-y-3 md:space-y-4 text-center lg:text-left animate-in fade-in duration-500" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="bg-white/5 border border-white/10 p-4 md:p-5 rounded-xl md:rounded-2xl w-fit group-hover:bg-accent group-hover:text-white transition-all duration-300">
                      <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg md:text-xl mb-1 md:mb-2 uppercase tracking-tight">{item.title}</h4>
                      <p className="text-xs md:text-sm text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-center lg:justify-start">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-black h-14 md:h-16 px-10 md:px-12 text-base md:text-lg rounded-full shadow-2xl transition-transform hover:scale-105" asChild>
                  <Link href="/about">{t.about.learnMore} <ArrowRight className="ml-2 w-5 h-5" /></Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <HelpCircle className="w-12 h-12 text-accent mx-auto mb-4" />
            <h2 className="text-3xl md:text-5xl font-black text-primary uppercase tracking-tight">{t.home.faqTitle}</h2>
          </div>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {t.home.faqs.map((faq: any, i: number) => (
              <AccordionItem key={i} value={`item-${i}`} className="border rounded-2xl px-6 bg-card shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger className="font-bold text-lg text-primary py-6 hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-accent overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="container mx-auto px-4 text-center space-y-8 md:space-y-10 relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-8xl font-black text-white leading-[1] md:leading-[0.9] tracking-tighter uppercase">
            {t.home.quoteTitle} <br className="hidden md:block"/>
            <span className="text-primary/80">{t.home.quoteSubtitle}</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg md:text-xl px-10 md:px-14 h-16 md:h-20 rounded-full shadow-2xl transition-transform hover:scale-105 font-black uppercase tracking-widest" asChild>
              <Link href="/contact">{t.home.requestQuote}</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white border-2 text-white hover:bg-white hover:text-accent text-lg md:text-xl px-10 md:px-14 h-16 md:h-20 rounded-full backdrop-blur-md transition-transform hover:scale-105 font-black uppercase tracking-widest" asChild>
              <Link href="/tracking">{t.home.trackPackage}</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
