import { Hero } from '@/components/homepage/hero';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCircle2, Globe2, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Services Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-up">
            <h2 className="text-sm font-bold uppercase text-accent mb-2 tracking-[0.2em]">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-primary">Global Logistics Solutions</h3>
            <div className="w-20 h-1.5 bg-accent mx-auto mt-6 rounded-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {services.slice(0, 3).map((service, idx) => (
              <Card key={service.title} className="relative overflow-hidden group border-none shadow-2xl rounded-2xl transition-all duration-500 hover:-translate-y-2">
                <div className="h-48 relative overflow-hidden">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id.includes(service.title.split(' ')[0].toLowerCase()))?.imageUrl || 'https://picsum.photos/seed/logistics/800/600'}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/20 transition-colors" />
                </div>
                <CardHeader className="relative -mt-8 mx-6 bg-white rounded-xl shadow-lg p-6 z-10 text-center">
                  <div className="mx-auto bg-accent text-white rounded-full p-3 w-fit -mt-12 mb-4 border-4 border-white">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-8 pt-4 text-center">
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Button size="lg" variant="outline" className="rounded-full px-10 border-primary text-primary hover:bg-primary hover:text-white transition-all" asChild>
              <Link href="/services">Explore All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 blur-[120px] rounded-full -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 blur-[120px] rounded-full -ml-48 -mb-48" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8 animate-fade-up">
              <h2 className="text-sm font-bold uppercase text-accent tracking-[0.2em]">The Al-Israa Advantage</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold leading-tight">Why Industry Leaders <span className="text-accent">Trust Us.</span></h3>
              <p className="text-lg text-gray-300 max-w-xl">
                With decades of experience and a global network, we provide more than just transport. we provide peace of mind through every mile of the journey.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                {[
                  { icon: Globe2, title: "Global Network", desc: "Access to 150+ ports worldwide." },
                  { icon: Zap, title: "Fast Delivery", desc: "Optimized routes for quick transit." },
                  { icon: ShieldCheck, title: "Secure Cargo", desc: "Premium insurance and handling." },
                  { icon: CheckCircle2, title: "Full Compliance", desc: "Hassle-free customs brokerage." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="bg-white/10 p-3 rounded-lg h-fit group-hover:bg-accent group-hover:text-white transition-colors">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
              <Image 
                src="https://picsum.photos/seed/logistics-team/800/1000"
                alt="Logistics management"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <p className="text-2xl font-bold italic mb-2">"Al-Israa transformed our supply chain efficiency by 40% in just six months."</p>
                <p className="text-accent font-bold">— Director of Global Ops, EuroLink</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-accent overflow-hidden">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Ready to ship? <br/><span className="text-primary opacity-90">Get a priority quote today.</span></h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-6">
            <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-xl px-12 h-16 rounded-full shadow-2xl transition-transform hover:scale-105" asChild>
              <Link href="/contact">Request a Quote</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent text-xl px-12 h-16 rounded-full backdrop-blur-sm transition-transform hover:scale-105" asChild>
              <Link href="/tracking">Track Package</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}