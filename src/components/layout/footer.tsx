"use client";

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { policyLinks } from '@/lib/data';
import { useLanguage } from '@/hooks/use-language';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-foreground text-background border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Your trusted partner for international freight logistics and transport.
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">{t.footer.quickLinks}</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-primary-foreground">{t.nav.home}</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-primary-foreground">{t.nav.services}</Link></li>
              <li><Link href="/tracking" className="text-sm text-muted-foreground hover:text-primary-foreground">{t.nav.tracking}</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary-foreground">{t.nav.about}</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary-foreground">{t.nav.contact}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">{t.footer.policies}</h3>
            <ul className="space-y-3">
              {policyLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">{t.footer.contactInfo}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">Musterstraße 1, 10117 Berlin, Germany</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">alisraainternationaler@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-background/5">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AL-ISRAA Internationaler Spediteur Frachtlogistik Trans. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
