import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ServicesPreview() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold uppercase text-secondary mb-2 tracking-wider">What We Do</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">Our Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="text-center group hover:shadow-xl transition-shadow duration-300 border-t-4 border-transparent hover:border-secondary">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4 group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors duration-300">
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
      </div>
    </section>
  );
}
