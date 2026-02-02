'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export function useAdmin() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for hardcoded primary admin email
  const PRIMARY_ADMIN_EMAIL = 'alisraainternationaler@gmail.com';

  const adminDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'roles_admin', user.uid);
  }, [firestore, user]);

  const { data: adminDoc, isLoading: isAdminDocLoading } = useDoc(adminDocRef);

  useEffect(() => {
    // Wait for auth to resolve
    if (isUserLoading) {
      setIsLoading(true);
      return;
    }

    // No user means not an admin
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    // If it's the primary admin email, it's an admin regardless of firestore doc
    if (user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL) {
      setIsAdmin(true);
      setIsLoading(false);
      return;
    }

    // Wait for firestore document if it's not the primary admin
    if (isAdminDocLoading) {
      setIsLoading(true);
      return;
    }

    // Check for the explicit isAdmin field in the document data
    const hasAdminRole = adminDoc && adminDoc.isAdmin === true;
    setIsAdmin(!!hasAdminRole);
    setIsLoading(false);

  }, [user, isUserLoading, adminDoc, isAdminDocLoading]);

  return { isAdmin, isLoading };
}
