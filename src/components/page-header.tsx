import Link from 'next/link';
import { Home, ChevronRight } from 'lucide-react';

type PageHeaderProps = {
  title: string;
  breadcrumb: { href: string; label: string }[];
};

export function PageHeader({ title, breadcrumb }: PageHeaderProps) {
  return (
    <section className="bg-primary/5 py-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">{title}</h1>
        <nav className="flex justify-center items-center text-sm">
          <Link href="/" className="flex items-center gap-1 text-muted-foreground hover:text-primary">
            <Home size={16} /> Home
          </Link>
          {breadcrumb.map((item, index) => (
            <span key={item.href} className="flex items-center">
              <ChevronRight size={16} className="text-muted-foreground mx-1" />
              <Link href={item.href} className="text-muted-foreground hover:text-primary" aria-current={index === breadcrumb.length - 1 ? 'page' : undefined}>
                {item.label}
              </Link>
            </span>
          ))}
        </nav>
      </div>
    </section>
  );
}
