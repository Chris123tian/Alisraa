import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
      <video
        src="https://videos.pexels.com/video-files/4496259/4496259-hd_1920_1080_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2 z-0"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center p-4 space-y-8">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          AL-ISRAA Frachtlogistik Trans
        </h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-200 drop-shadow">
          Your Trusted Partner for International Freight Logistics and Transport.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
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
