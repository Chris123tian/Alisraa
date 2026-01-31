import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center text-white">
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 text-center p-4 space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          Global Logistics, Delivered with Precision
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-200 drop-shadow">
          Your trusted partner for seamless freight forwarding, customs brokerage, and supply chain solutions. We connect your business to the world.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90" asChild>
            <Link href="/services">Our Services</Link>
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white bg-black/20 hover:bg-white hover:text-primary" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
