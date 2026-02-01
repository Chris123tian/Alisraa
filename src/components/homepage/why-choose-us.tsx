import { whyChooseUs } from '@/lib/data';

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-sm font-bold uppercase text-secondary mb-2 tracking-wider">Why Choose Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-primary">Faster, Safer and Smarter Logistics</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="bg-card p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center">
              <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
