import { Hero } from '@/components/homepage/hero';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function Home() {
  return (
    <>
      <Hero />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">Our Services</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Global Shipping Solutions</h3>
            <p className="text-muted-foreground mt-4">
              We offer a comprehensive range of freight and logistics services to meet your needs.
              From ocean and air transport to full supply chain management, we are your trusted partner.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <Card key={service.title} className="text-center group hover:shadow-xl transition-shadow duration-300 border-t-4 border-transparent hover:border-primary">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    <service.icon className="w-8 h-8" />
                  </div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Track Your Shipment</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Stay updated on the status of your cargo with our real-time tracking system. Enter your tracking number to get started.
          </p>
          <Button size="lg" variant="default" asChild>
            <Link href="/tracking">Track Now</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
