import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center text-white">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center p-4 space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          Alisraa International ER
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-200 drop-shadow">
          Your Trusted Partner in Global Logistics. We provide comprehensive logistics solutions to meet your needs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/services">Our Services</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white bg-black/20 hover:bg-white hover:text-primary" asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
