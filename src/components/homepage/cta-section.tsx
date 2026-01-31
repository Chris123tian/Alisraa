import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Streamline Your Logistics?</h2>
        <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8">
          Let's discuss how Alisraa International can support your business growth. Get in touch with our experts today for a personalized quote.
        </p>
        <Button size="lg" variant="outline" className="border-white text-white bg-transparent hover:bg-white hover:text-primary" asChild>
          <Link href="/contact">Get a Free Quote</Link>
        </Button>
      </div>
    </section>
  );
}
