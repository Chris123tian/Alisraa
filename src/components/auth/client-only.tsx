'use client';

import { useEffect, useState } from 'react';

/**
 * A wrapper component that ensures its children are only rendered on the client side.
 * This prevents hydration mismatches by ensuring the server-rendered HTML and
 * the initial client-rendered HTML are identical (both empty or placeholders).
 */
export function ClientOnly({ children, fallback = null }: { children: React.ReactNode, fallback?: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
