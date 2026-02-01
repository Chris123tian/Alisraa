import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/logo';
import { footerLinks } from '@/lib/data';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-primary-foreground/80">
              Your trusted partner for comprehensive logistics and supply chain solutions.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-white"><Facebook size={20} /></Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-white"><Twitter size={20} /></Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-white"><Instagram size={20} /></Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-white"><Linkedin size={20} /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.quickLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Our Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map(service => (
                <li key={service.label}>
                  <Link href='/services' className="text-sm text-primary-foreground/80 hover:text-white">{service.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-secondary mt-1 shrink-0" />
                <span className="text-primary-foreground/80">717 K Street, Sacramento, CA 95814, USA</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={20} className="text-secondary mt-1 shrink-0" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={20} className="text-secondary mt-1 shrink-0" />
                <span className="text-primary-foreground/80">info@alisraainternationaler.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-primary/90">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-primary-foreground/80">
          © {new Date().getFullYear()} Alisraa International ER. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
