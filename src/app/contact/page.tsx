import { PageHeader } from '@/components/page-header';
import { ContactForm } from '@/components/contact-form';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ContactPage() {
  const contactImage = PlaceHolderImages.find(img => img.id === 'contact-image');
  return (
    <>
      <PageHeader title="Contact Us" breadcrumb={[{ href: '/contact', label: 'Contact' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">Contact Our Team</h2>
              <p className="text-muted-foreground mb-8">
                We're here to help with all your logistics needs. Fill out the form below, and one of our experts will get back to you shortly.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Our Office</h3>
                    <p className="text-muted-foreground">717 K Street, Sacramento, CA 95814, USA</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <Mail />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground">contact@alisraainternational.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <Phone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-muted-foreground">(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-card p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {contactImage && <div className="container mx-auto px-4 pb-20">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg">
            <Image src={contactImage.imageUrl} alt={contactImage.description} fill className="object-cover" data-ai-hint={contactImage.imageHint} />
          </div>
      </div>}
    </>
  );
}
