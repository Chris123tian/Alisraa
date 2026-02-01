import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CtaSection() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">GET A QUOTE</h2>
        <p className="text-lg text-primary-foreground/80 max-w-3xl mx-auto mb-8">
          Ready to get started? Contact us today for a no-obligation quote tailored to your specific needs. Our team is ready to help you optimize your supply chain.
        </p>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/contact">GET A QUOTE</Link>
        </Button>
      </div>
    </section>
  );
}
