'use client';

import { useAdmin } from '@/hooks/useAdmin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { isAdmin, isLoading } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAdmin) {
      // You can also redirect to a dedicated 'unauthorized' page
      router.push('/login'); 
    }
  }, [isAdmin, isLoading, router]);

  if (isLoading) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
            <p>Loading...</p>
        </div>
    );
  }

  if (!isAdmin) {
    return (
        <div className="container mx-auto px-4 py-20">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Access Denied</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page. Please log in as an admin.</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return <>{children}</>;
}
