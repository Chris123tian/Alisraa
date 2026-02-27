'use client';

import { PageHeader } from '@/components/page-header';
import { shippingRates } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from '@/hooks/use-language';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ServicesPage() {
  const { t } = useLanguage();

  const oceanImg = PlaceHolderImages.find(img => img.id === 'service-ocean')?.imageUrl || 'https://picsum.photos/seed/ocean/800/600';
  const airImg = PlaceHolderImages.find(img => img.id === 'service-air')?.imageUrl || 'https://picsum.photos/seed/air/800/600';

  return (
    <>
      <PageHeader title={t.services.title} breadcrumb={[{ href: '/services', label: t.nav.services }]} />
      
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h2 className="text-xs md:text-sm font-bold uppercase text-primary mb-2 tracking-wider">{t.services.shippingCosts}</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 md:mb-6 leading-tight">{t.services.transparentPricing}</h3>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t.services.pricingDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {shippingRates.map((rate, idx) => (
              <Card key={rate.destination} className="flex flex-col border-none shadow-xl rounded-[1.5rem] md:rounded-3xl overflow-hidden hover:shadow-primary/10 transition-shadow">
                <div className="h-48 md:h-64 relative">
                  <Image 
                    src={idx % 2 === 0 ? oceanImg : airImg}
                    alt={rate.destination}
                    fill
                    className="object-cover"
                    data-ai-hint={idx % 2 === 0 ? "ocean cargo" : "cargo plane"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                  <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 text-white">
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">{t.services.goodsTo} {rate.destination}</h3>
                  </div>
                </div>
                
                <CardContent className="flex-grow p-6 md:p-8 space-y-6 md:space-y-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-lg md:text-xl flex items-center gap-2 text-primary">
                      <div className="w-1 h-5 md:h-6 bg-accent rounded-full" />
                      {t.services.ocean}
                    </h4>
                    <div className="bg-muted/30 rounded-xl md:rounded-2xl overflow-hidden border border-primary/5">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-primary text-white hover:bg-primary">
                              <TableHead className="text-white font-bold">{t.services.duration}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rate.ocean.map((option) => (
                              <TableRow key={option.duration}>
                                <TableCell className="font-medium text-xs md:text-sm">{option.duration}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-lg md:text-xl flex items-center gap-2 text-primary">
                      <div className="w-1 h-5 md:h-6 bg-accent rounded-full" />
                      {t.services.air}
                    </h4>
                    <div className="bg-muted/30 rounded-xl md:rounded-2xl overflow-hidden border border-primary/5">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-primary text-white hover:bg-primary">
                              <TableHead className="text-white font-bold">{t.services.duration}</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {rate.air.map((option) => (
                              <TableRow key={option.duration}>
                                <TableCell className="font-medium text-xs md:text-sm">{option.duration}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
