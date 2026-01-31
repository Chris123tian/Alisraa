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
          <div className="relative h-[500px] lg:h-full w-full rounded-lg overflow-hidden shadow-xl">
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
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">About Alisraa International</h2>
            <p className="text-lg text-muted-foreground mb-6">
              We are a team of dedicated professionals committed to providing top-tier logistics and supply chain solutions. Our mission is to facilitate global trade through innovative and reliable services.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary w-6 h-6" />
                <span className="font-medium">Our Mission: To deliver excellence in logistics.</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle className="text-primary w-6 h-6" />
                <span className="font-medium">Our Vision: To be the world's most trusted logistics partner.</span>
              </li>
            </ul>
            <Button size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
