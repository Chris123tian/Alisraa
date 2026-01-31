import Image from 'next/image';
import { PageHeader } from '@/components/page-header';
import { WhyChooseUs } from '@/components/homepage/why-choose-us';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-image');
  return (
    <>
      <PageHeader title="About Us" breadcrumb={[{ href: '/about', label: 'About Us' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[500px] lg:h-full min-h-[400px] w-full rounded-lg overflow-hidden shadow-xl">
              {aboutImage && (
                <Image
                  src={aboutImage.imageUrl}
                  alt={aboutImage.description}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  data-ai-hint={aboutImage.imageHint}
                />
              )}
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Journey in Global Logistics</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded with a vision to simplify global trade, Alisraa International has grown into a trusted name in the logistics industry. We are driven by a passion for excellence and a commitment to our clients' success.
              </p>
              <p className="text-muted-foreground mb-8">
                Our journey began with a small team and a big idea: to provide a logistics service that is not only efficient and reliable but also transparent and client-focused. Today, we are proud to serve a diverse range of clients, from small businesses to multinational corporations, across various industries.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Mission</h3>
                    <p className="text-muted-foreground">To deliver superior logistics solutions that create value for our clients, partners, and employees.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Vision</h3>
                    <p className="text-muted-foreground">To be the world's most customer-centric logistics company, where businesses find a reliable partner for their global supply chain needs.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <WhyChooseUs />
    </>
  );
}
