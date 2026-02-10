import Link from 'next/link';
import { Ship } from 'lucide-react';

export function Logo() {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 text-xl md:text-2xl font-black text-primary hover:opacity-90 transition-opacity group"
    >
      <div className="bg-accent p-2 rounded-xl group-hover:rotate-6 transition-transform shadow-lg shadow-accent/20 flex items-center justify-center">
        <Ship className="w-6 h-6 md:w-8 md:h-8 text-white shrink-0" />
      </div>
      <div className="flex flex-col">
        <span className="leading-none tracking-tighter uppercase">Al-Israa</span>
        <span className="text-accent text-[10px] md:text-xs font-bold tracking-[0.3em] uppercase">Frachtlogistik</span>
      </div>
    </Link>
  );
}