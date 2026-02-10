'use client';

import { useEffect, useState } from 'react';

/**
 * A wrapper component that ensures its children are only rendered on the client side
 * AFTER hydration. Crucially, it renders the fallback on BOTH the server and the
 * first client paint to prevent hydration mismatches.
 */
export function ClientOnly({ 
  children, 
  fallback = null 
}: { 
  children: React.ReactNode, 
  fallback?: React.ReactNode 
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Renders fallback on server and first client paint to ensure perfect hydration
  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
