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
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Founded on the principles of reliability, efficiency, and customer-centricity, Alisraa International ER has grown from a small operation into a trusted global logistics partner. Our journey is one of passion for simplifying complex supply chains and empowering businesses to thrive in the international marketplace.
              </p>
              <p className="text-muted-foreground mb-8">
                We've built our reputation by consistently exceeding client expectations and investing in the technology and talent needed to stay ahead in a dynamic industry. Every shipment we manage is a testament to our commitment to excellence.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Mission</h3>
                    <p className="text-muted-foreground">To provide innovative, reliable, and cost-effective logistics solutions that enable our clients to achieve their business goals and grow globally.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="text-primary w-6 h-6 mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold">Our Vision</h3>
                    <p className="text-muted-foreground">To be the logistics partner of choice, recognized for our operational excellence, customer focus, and commitment to building sustainable supply chains for the future.</p>
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
