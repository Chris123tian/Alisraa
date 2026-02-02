
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Mail, Phone, LogOut, Lock, LayoutDashboard } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navigationLinks } from '@/lib/data';
import React from 'react';
import { useUser, useAuth } from '@/firebase';
import { useAdmin } from '@/hooks/useAdmin';

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const { user, isUserLoading } = useUser();
  const { isAdmin } = useAdmin();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signOut();
  };

  const mainNavLinks = navigationLinks.filter(l => !['Admin', 'Login'].includes(l.label));

  return (
    <header className="sticky top-0 z-50 bg-background shadow-md">
      <div className="bg-primary text-primary-foreground py-2 text-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Mail size={16} />
              <span className="hidden sm:inline">info@al-israa-frachtlogistik.de</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span className="hidden sm:inline">+49 (30) 12345678</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <span className="text-xs uppercase font-bold tracking-tighter">Germany HQ</span>
          </div>
        </div>
      </div>

      <nav className="container mx-auto px-4 flex justify-between items-center h-20">
        <Logo />
        <div className="hidden lg:flex items-center gap-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-semibold transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          {user && !user.isAnonymous && (
            <Link 
              href={isAdmin ? "/admin" : "/dashboard"} 
              className={cn(
                "font-semibold transition-colors flex items-center gap-1 hover:text-primary",
                pathname === (isAdmin ? "/admin" : "/dashboard") ? "text-primary" : "text-foreground/80"
              )}
            >
              <LayoutDashboard size={16} />
              {isAdmin ? "Admin" : "Dashboard"}
            </Link>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!isUserLoading && (
            <>
              {user && !user.isAnonymous ? (
                 <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
                    <LogOut />
                </Button>
              ) : (
                <Button asChild variant="ghost" size="icon">
                  <Link href="/login" aria-label="Login">
                    <Lock />
                  </Link>
                </Button>
              )}
            </>
          )}

          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <Logo />
                   <SheetTitle className="sr-only">Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6 p-4">
                  {[...mainNavLinks, ...(user && !user.isAnonymous ? [{href: isAdmin ? '/admin' : '/dashboard', label: isAdmin ? 'Admin' : 'Dashboard'}] : [])].map((link) => (
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
