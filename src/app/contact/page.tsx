import { PageHeader } from '@/components/page-header';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Chat } from '@/components/chat';

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact Us" breadcrumb={[{ href: '/contact', label: 'Contact' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">Contact Us</h2>
              <h3 className="text-3xl font-bold mb-4">Get in Touch</h3>
              <p className="text-muted-foreground mb-8">
                We are here to help you with all your logistics needs. Please feel free to contact us with any questions or to request a quote. For immediate assistance, use the chat feature.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Office</h3>
                    <p className="text-muted-foreground">Musterstraße 1, 10117 Berlin, Germany</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <Mail />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground">info@al-israa-frachtlogistik.de</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <Phone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-muted-foreground">+49 (30) 12345678</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-card p-8 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold mb-6">Live Chat</h3>
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
