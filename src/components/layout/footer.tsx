import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { footerLinks, policyLinks } from '@/lib/data';

export function Footer() {
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
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Policies</h3>
            <ul className="space-y-3">
              {policyLinks.map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary-foreground">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-primary-foreground">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">Musterstraße 1, 10117 Berlin, Germany</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">+49 (30) 12345678</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-primary mt-1 shrink-0" />
                <span className="text-muted-foreground">info@al-israa-frachtlogistik.de</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-background/5">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AL-ISRAA Internationaler Spediteur Frachtlogistik Trans. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
