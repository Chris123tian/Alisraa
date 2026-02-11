"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Mail, Phone, LogOut, LayoutDashboard } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { navigationLinks } from '@/lib/data';
import React, { useState } from 'react';
import { useUser, useAuth } from '@/firebase';
import { useAdmin } from '@/hooks/useAdmin';
import { ClientOnly } from '@/components/auth/client-only';

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isUserLoading } = useUser();
  const { isAdmin } = useAdmin();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signOut().then(() => {
      window.location.href = '/';
    });
  };

  const mainNavLinks = navigationLinks.filter(l => !['Admin', 'Login'].includes(l.label));

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Top Bar - Strictly Static Shell Wrapper */}
      <div className="bg-primary h-10 w-full overflow-hidden">
        <div className="container mx-auto px-4 h-full flex justify-between items-center text-primary-foreground text-xs font-medium">
          <ClientOnly fallback={<div className="h-4 w-48 bg-white/10 animate-pulse rounded" />}>
            <div className="flex items-center gap-4 md:gap-8">
              <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-default">
                <Mail size={14} className="text-accent" />
                <span className="hidden sm:inline">info@al-israa-frachtlogistik.de</span>
              </div>
              <div className="flex items-center gap-2 hover:text-accent transition-colors cursor-default">
                <Phone size={14} className="text-accent" />
                <span className="hidden sm:inline">+49 (30) 12345678</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-widest bg-accent px-2 py-0.5 rounded text-white shadow-sm">
                Global Logistics
              </span>
            </div>
          </ClientOnly>
        </div>
      </div>

      <nav className="container mx-auto px-4 flex justify-between items-center h-20">
        <Logo />
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {mainNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-bold transition-colors hover:text-accent relative py-1 uppercase text-sm tracking-wide",
                pathname === link.href ? "text-primary border-b-2 border-accent" : "text-foreground/80"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          <ClientOnly>
            {user && !user.isAnonymous && (
              <Link 
                href={isAdmin ? "/admin" : "/dashboard"} 
                className={cn(
                  "font-bold transition-colors flex items-center gap-1.5 hover:text-accent uppercase text-sm tracking-wide",
                  pathname === (isAdmin ? "/admin" : "/dashboard") ? "text-primary" : "text-foreground/80"
                )}
              >
                <LayoutDashboard size={16} />
                {isAdmin ? "Admin" : "Dashboard"}
              </Link>
            )}
          </ClientOnly>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 min-w-[150px] justify-end">
            <ClientOnly fallback={<div className="h-9 w-32 bg-muted/20 animate-pulse rounded-md" />}>
              {isUserLoading ? (
                <div className="h-9 w-32 bg-muted/20 animate-pulse rounded-md" />
              ) : user && !user.isAnonymous ? (
                <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2 border-primary/20 font-bold uppercase tracking-tighter">
                  <LogOut className="h-4 w-4 text-accent" />
                  Sign Out
                </Button>
              ) : (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm" className="font-bold uppercase tracking-tighter">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="default" size="sm" className="bg-accent hover:bg-accent/90 text-white font-bold uppercase tracking-tighter shadow-lg shadow-accent/20">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </ClientOnly>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <ClientOnly fallback={<div className="h-10 w-10 bg-muted/20 rounded-md" />}>
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="border-primary/20">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <SheetHeader className="mb-8 border-b pb-4">
                    <Logo />
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <SheetDescription className="sr-only">Site navigation links.</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-5">
                    {mainNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-lg font-bold uppercase",
                          pathname === link.href ? "text-accent" : "text-foreground/80"
                        )}
                      >
                        {link.label}
                      </Link>
                    ))}
                    
                    {user && !user.isAnonymous && (
                      <Link
                        href={isAdmin ? "/admin" : "/dashboard"}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          "text-lg font-bold uppercase border-t pt-4",
                          pathname === (isAdmin ? "/admin" : "/dashboard") ? "text-accent" : "text-foreground/80"
                        )}
                      >
                        {isAdmin ? "Admin Console" : "Client Dashboard"}
                      </Link>
                    )}

                    <div className="flex flex-col gap-3 mt-6 pt-6 border-t">
                      {user && !user.isAnonymous ? (
                        <Button variant="outline" className="w-full font-bold uppercase" onClick={handleLogout}>
                          Sign Out
                        </Button>
                      ) : (
                        <>
                          <Button asChild variant="outline" className="w-full font-bold uppercase">
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                          </Button>
                          <Button asChild variant="default" className="w-full bg-accent text-white font-bold uppercase">
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </ClientOnly>
          </div>
        </div>
      </nav>
    </header>
  );
}