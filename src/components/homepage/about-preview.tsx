import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function AboutPreview() {
  const aboutImage = PlaceHolderImages.find(img => img.id === 'about-image');

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[500px] lg:h-full w-full rounded-lg overflow-hidden shadow-xl min-h-[400px]">
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
            <h2 className="text-sm font-bold uppercase text-secondary mb-2 tracking-wider">ABOUT ALISRAA INTERNATIONAL ER</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4">25+ Years of Experience in Logistics Services</h3>
            <p className="text-lg text-muted-foreground mb-6">
              Alisraa International ER is a leading logistics company with a global reach. We specialize in providing comprehensive and reliable logistics solutions to businesses of all sizes.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <CheckCircle className="text-secondary w-6 h-6 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Our Mission</h4>
                  <p className="text-muted-foreground">To provide our clients with the highest quality logistics services, ensuring their success and satisfaction.</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="text-secondary w-6 h-6 mt-1 shrink-0" />
                <div>
                  <h4 className="font-semibold text-lg">Our Vision</h4>
                  <p className="text-muted-foreground">To be the most trusted and innovative logistics partner, connecting businesses to the world.</p>
                </div>
              </li>
            </ul>
            <Button size="lg" asChild>
              <Link href="/about">READ MORE</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
