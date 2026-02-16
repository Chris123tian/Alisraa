"use client";

import { PageHeader } from '@/components/page-header';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Chat } from '@/components/chat';
import { useLanguage } from '@/hooks/use-language';

export default function ContactPage() {
  const { t } = useLanguage();

  return (
    <>
      <PageHeader title={t.contact.title} breadcrumb={[{ href: '/contact', label: t.nav.contact }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xs md:text-sm font-bold uppercase text-primary mb-2 tracking-wider">{t.contact.getInTouch}</h2>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{t.contact.getInTouch}</h3>
              <p className="text-muted-foreground mb-8">
                {t.contact.contactDesc}
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-muted/20 rounded-2xl border border-primary/5">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <MapPin />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t.contact.office}</h3>
                    <p className="text-muted-foreground">Velyka Vasylkivska Street, 72</p>
                    <p className="text-muted-foreground">Office 314</p>
                    <p className="text-muted-foreground">Kyiv, 03150, Ukraine</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-muted/20 rounded-2xl border border-primary/5">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <Mail />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{t.contact.emailUs}</h3>
                    <p className="text-muted-foreground font-medium">Customer.alisraashipping@outlook.com</p>
                    <p className="text-muted-foreground text-sm">alisraainternationaler@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-6 bg-muted/20 rounded-2xl border border-primary/5">
                  <div className="bg-primary/10 text-primary p-3 rounded-md">
                    <Phone />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{t.contact.callUs}</h3>
                    <p className="text-muted-foreground font-bold">+380 44 235 67 77</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-card p-8 rounded-lg shadow-lg border">
                <h3 className="text-2xl font-bold mb-6">{t.contact.liveChat}</h3>
                <Chat />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
