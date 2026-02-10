import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ship } from 'lucide-react';

export function Hero() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  return (
    <section className="relative h-[85vh] w-full flex items-center justify-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover scale-105 animate-pulse duration-[8000ms]"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent" />
      
      <div className="container relative z-10 px-4">
        <div className="max-w-3xl space-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 text-accent-foreground">
            <Ship className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold tracking-widest uppercase">Global Freight Excellence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
            Reliable Logistics for a <span className="text-accent">Connected World.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl drop-shadow">
            Al-Israa delivers precision international freight solutions. From ocean ports to your doorstep, we manage the complex so you can focus on growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold h-14 px-8 text-lg rounded-full transition-transform hover:scale-105" asChild>
              <Link href="/tracking">Track Your Cargo <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white hover:text-primary h-14 px-8 text-lg rounded-full transition-transform hover:scale-105" asChild>
              <Link href="/services">Our Solutions</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}