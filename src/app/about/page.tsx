
'use client';

import { PageHeader } from '@/components/page-header';
import { aboutContent, vesselSchedule } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const { t } = useLanguage();

  const getAboutImage = (index: number) => {
    const images = ['service-truck', 'about-supply', 'about-docs', 'about-warehouse'];
    return PlaceHolderImages.find(img => img.id === images[index % images.length])?.imageUrl || 'https://picsum.photos/seed/logistics/800/600';
  };

  const mainAboutImg = PlaceHolderImages.find(img => img.id === 'about-team')?.imageUrl || 'https://picsum.photos/seed/team/1200/600';

  return (
    <>
      <PageHeader title={t.about.title} breadcrumb={[{ href: '/about', label: t.nav.about }]} />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="relative h-[400px] w-full rounded-3xl overflow-hidden mb-20 shadow-2xl">
            <Image 
              src={mainAboutImg}
              alt="Al-Israa Team"
              fill
              className="object-cover"
              data-ai-hint="logistics team"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/20 to-transparent" />
            <div className="absolute inset-0 flex items-center px-12">
              <div className="max-w-xl text-white space-y-4">
                <h2 className="text-accent font-bold uppercase tracking-widest text-sm">{t.about.explained}</h2>
                <h3 className="text-4xl md:text-5xl font-black leading-tight">{t.about.guideTitle}</h3>
                <p className="text-lg text-gray-200">{t.about.guideDesc}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {aboutContent.map((item, idx) => (
              <Card key={item.title} className="group border-none shadow-xl rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-300">
                <div className="h-48 relative overflow-hidden">
                  <Image 
                    src={getAboutImage(idx)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{item.description}</p>
                  {item.learnMore && (
                    <Button variant="outline" className="rounded-full border-primary text-primary hover:bg-primary hover:text-white">
                      {t.about.learnMore}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center shadow-3xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[150px] rounded-full -mr-48 -mt-48" />
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <h2 className="text-sm font-bold uppercase text-accent tracking-[0.3em]">{t.about.supplyChain}</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter">{t.about.vesselSchedule}</h3>
              <p className="text-xl text-gray-300">
                {t.about.planShipments}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                {vesselSchedule.map((item, i) => (
                  <div key={item} className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 hover:bg-accent hover:border-accent transition-all group cursor-default">
                    <span className="block text-3xl font-black mb-2">{i + 1}</span>
                    <p className="font-bold text-sm uppercase tracking-widest">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
