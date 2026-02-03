import Link from 'next/link';
import { Ship } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
      <Ship className="w-8 h-8 text-accent shrink-0" />
      <span className="leading-tight">
        Al-Israa <span className="text-accent block text-xs md:text-sm font-medium tracking-widest uppercase">Frachtlogistik</span>
      </span>
    </Link>
  );
}