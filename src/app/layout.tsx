import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase';
import { LanguageProvider } from '@/hooks/use-language';
import { AIChatbot } from '@/components/ai-chatbot';

export const metadata: Metadata = {
  title: 'Al-Israa | International Freight & Logistics',
  description: 'Your trusted partner for international cargo, freight logistics, and global transport solutions. Based in Germany with global reach.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="XaFcZhc3N6vnHqqFKRem_D_AhetbPwlt62lYADCAMKw" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground selection:bg-accent/30">
        <FirebaseClientProvider>
          <LanguageProvider>
            <Header />
            <main className="min-h-[calc(100vh-80px-40px)]">{children}</main>
            <Footer />
            <AIChatbot />
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
