import { PageHeader } from '@/components/page-header';
import { services } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our Services" breadcrumb={[{ href: '/services', label: 'Services' }]} />
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const serviceImage = PlaceHolderImages.find(img => img.id === service.image);
              return (
                <Card key={service.title} className="flex flex-col overflow-hidden group">
                   {serviceImage && (
                    <div className="relative h-56 w-full">
                      <Image
                        src={serviceImage.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={serviceImage.imageHint}
                      />
                    </div>
                  )}
                  <CardHeader>
                      <CardTitle className="text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
