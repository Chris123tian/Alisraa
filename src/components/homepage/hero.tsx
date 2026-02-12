'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Ship, Circle } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

export function Hero() {
  const { t } = useLanguage();
  const heroImages = PlaceHolderImages.filter(img => img.id.startsWith('hero-'));
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => {
      emblaApi.off('select', onSelect);
      clearInterval(intervalId);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
  }, [emblaApi]);

  return (
    <section className="relative h-[70vh] sm:h-[80vh] md:h-[85vh] w-full text-white overflow-hidden bg-primary">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroImages.map((img, index) => (
            <div key={img.id} className="relative flex-[0_0_100%] h-full min-w-0">
              <Image
                src={img.imageUrl}
                alt={img.description}
                fill
                className={cn(
                  "object-cover transition-transform duration-[6s] ease-linear",
                  selectedIndex === index ? "scale-110" : "scale-100"
                )}
                priority={index === 0}
                data-ai-hint={img.imageHint}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/60 to-transparent lg:via-primary/40" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="container relative z-10 px-4 h-full flex items-center">
        <div className="max-w-3xl space-y-6 md:space-y-8 animate-fade-up text-center md:text-left mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-3 py-1 md:px-4 md:py-1.5 text-accent-foreground backdrop-blur-sm">
            <Ship className="w-3 h-3 md:w-4 md:h-4 text-accent" />
            <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase">{t.hero.tag}</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-2xl">
            {t.hero.title} <span className="text-accent">{t.hero.titleAccent}</span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl drop-shadow-md mx-auto md:mx-0">
            {t.hero.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-bold h-12 md:h-14 px-8 text-base md:text-lg rounded-full transition-transform hover:scale-105 shadow-xl shadow-accent/20" asChild>
              <Link href="/tracking">{t.hero.trackBtn} <ArrowRight className="ml-2 w-5 h-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white bg-white/5 hover:bg-white hover:text-primary h-12 md:h-14 px-8 text-base md:text-lg rounded-full backdrop-blur-md transition-transform hover:scale-105" asChild>
              <Link href="/services">{t.hero.solutionsBtn}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Slideshow Controls (Dots) */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 md:left-10 -translate-x-1/2 md:translate-x-0 flex gap-3 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={cn(
              "transition-all duration-300 p-1",
              selectedIndex === i ? "text-accent scale-125" : "text-white/40 hover:text-white"
            )}
            aria-label={`Go to slide ${i + 1}`}
          >
            <Circle className={cn("w-2 h-2 md:w-3 md:h-3 fill-current")} />
          </button>
        ))}
      </div>

      <div className="absolute bottom-10 right-10 animate-bounce hidden md:block z-10">
        <div className="w-1 h-12 rounded-full bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  );
}
