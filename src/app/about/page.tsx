
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

  // Robust image finder helper
  const getImgUrl = (id: string, fallbackSeed: string) => {
    return PlaceHolderImages.find(img => img.id === id)?.imageUrl || `https://picsum.photos/seed/${fallbackSeed}/800/600`;
  };

  const getAboutImage = (index: number) => {
    const images = ['service-truck', 'about-supply', 'about-docs', 'about-warehouse'];
    const id = images[index % images.length];
    return getImgUrl(id, `logistics-${index}`);
  };

  const mainAboutImg = getImgUrl('about-team', 'team-hero');

  return (
    <>
      <PageHeader title={t.about.title} breadcrumb={[{ href: '/about', label: t.nav.about }]} />
      
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Main Hero Image */}
          <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden mb-20 shadow-2xl group">
            <Image 
              src={mainAboutImg}
              alt="Al-Israa Logistics Team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              data-ai-hint="logistics team"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/40 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-16">
              <div className="max-w-xl text-white space-y-6">
                <h2 className="text-accent font-bold uppercase tracking-[0.3em] text-xs md:text-sm">{t.about.explained}</h2>
                <h3 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter">{t.about.guideTitle}</h3>
                <p className="text-lg md:text-xl text-gray-200 font-medium">
                  {t.about.guideDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-24">
            {aboutContent.map((item, idx) => (
              <Card key={item.title} className="group border-none shadow-xl rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-500 bg-card">
                <div className="h-64 relative overflow-hidden">
                  <Image 
                    src={getAboutImage(idx)}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    data-ai-hint="shipping logistics"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <CardHeader className="pt-8 px-8">
                  <CardTitle className="text-2xl font-black text-primary uppercase tracking-tight">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <p className="text-muted-foreground mb-8 leading-relaxed text-lg">{item.description}</p>
                  {item.learnMore && (
                    <Button variant="outline" className="rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white px-8 h-12 transition-all">
                      {t.about.learnMore}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Schedule Section */}
          <div className="bg-primary rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden text-center shadow-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -mr-64 -mt-64" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full -ml-64 -mb-64" />
            
            <div className="relative z-10 max-w-5xl mx-auto space-y-12">
              <div className="space-y-4">
                <h2 className="text-xs md:text-sm font-bold uppercase text-accent tracking-[0.4em]">{t.about.supplyChain}</h2>
                <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase">{t.about.vesselSchedule}</h3>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                  {t.about.planShipments}
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 pt-6">
                {vesselSchedule.map((item, i) => (
                  <div key={item} className="p-8 md:p-12 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 hover:bg-accent hover:border-accent hover:scale-105 transition-all group cursor-default shadow-lg">
                    <span className="block text-4xl md:text-5xl font-black mb-4 text-accent group-hover:text-white transition-colors">{i + 1}</span>
                    <p className="font-black text-xs md:text-sm uppercase tracking-[0.2em]">{item}</p>
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
