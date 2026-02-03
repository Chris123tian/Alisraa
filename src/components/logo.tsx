import Link from 'next/link';
import { Ship } from 'lucide-react';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-primary">
      <Ship className="w-8 h-8 text-accent" />
      Al-Israa Frachtlogistik
    </Link>
  );
}
