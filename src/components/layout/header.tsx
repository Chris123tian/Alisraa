"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Mail, Phone, Clock } from 'lucide-react';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navigationLinks } from '@/lib/data';
import React from 'react';

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-card shadow-sm">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Phone size={14} />
              <span>+123 456 7890</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <Mail size={14} />
              <span>info@alisraa.com</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Clock size={14} />
            <span>Mon - Sat: 8:00 - 17:00</span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 flex justify-between items-center h-20">
        <Logo />
        <div className="hidden lg:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/contact">Get a Quote</Link>
          </Button>
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="text-left">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <Logo />
                </SheetHeader>
                <div className="flex flex-col gap-6 mt-6">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-primary",
                        pathname === link.href ? "text-primary" : "text-foreground/80"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
