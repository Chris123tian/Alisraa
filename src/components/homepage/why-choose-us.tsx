import { whyChooseUs } from '@/lib/data';

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Why Partner with Alisraa International?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Discover the advantages of working with a logistics provider that prioritizes your success.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <div className="bg-primary/10 text-primary rounded-md p-3 mt-1">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
