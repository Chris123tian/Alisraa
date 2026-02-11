'use client';

import { PageHeader } from '@/components/page-header';
import { aboutContent, vesselSchedule } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/use-language';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t.about.title} breadcrumb={[{ href: '/about', label: t.nav.about }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">{t.about.explained}</h2>
            <h3 className="text-3xl md:text-4xl font-bold">{t.about.guideTitle}</h3>
            <p className="text-muted-foreground mt-4">
              {t.about.guideDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {aboutContent.map((item) => (
              <Card key={item.title}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  {item.learnMore && (
                    <Button variant="link" className="p-0">{t.about.learnMore}</Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center max-w-3xl mx-auto mb-12">
             <h2 className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">{t.about.supplyChain}</h2>
             <h3 className="text-3xl md:text-4xl font-bold">{t.about.vesselSchedule}</h3>
             <p className="text-muted-foreground mt-4">
               {t.about.planShipments}
             </p>
           </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {vesselSchedule.map((item) => (
              <Card key={item} className="p-6">
                <p className="font-semibold">{item}</p>
              </Card>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}
