
'use client';

import { useState, useEffect } from 'react';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

export function useAdmin() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const adminDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, `roles_admin/${user.uid}`);
  }, [firestore, user]);

  const { data: adminDoc, isLoading: isAdminDocLoading } = useDoc(adminDocRef);

  useEffect(() => {
    // Wait for all auth and document loading to complete
    if (isUserLoading || isAdminDocLoading) {
      setIsLoading(true);
      return;
    }

    // No user means not an admin
    if (!user) {
      setIsAdmin(false);
      setIsLoading(false);
      return;
    }

    // Check for the explicit isAdmin field in the document data
    const hasAdminRole = adminDoc && adminDoc.isAdmin === true;
    setIsAdmin(!!hasAdminRole);
    setIsLoading(false);

  }, [user, isUserLoading, adminDoc, isAdminDocLoading]);

  return { isAdmin, isLoading };
}
