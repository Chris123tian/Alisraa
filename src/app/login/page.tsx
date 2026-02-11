'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuth, useFirestore, useUser } from '@/firebase';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Chrome, Mail as MailIcon, Lock } from 'lucide-react';
import { useEffect } from 'react';

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function LoginPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  const { user, isUserLoading } = useUser();

  const PRIMARY_ADMIN_EMAIL = 'alisraainternationaler@gmail.com';

  useEffect(() => {
    if (!isUserLoading && user && !user.isAnonymous) {
      const email = user.email?.toLowerCase();
      if (email === PRIMARY_ADMIN_EMAIL) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    }
  }, [user, isUserLoading, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleGoogleSignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          id: user.uid,
          username: user.displayName || 'Google User',
          email: user.email,
          isAdmin: user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL,
        }, { merge: true });
      }

      toast({
        title: 'Welcome',
        description: 'Signed in successfully with Google.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-In Failed',
        description: error.message,
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const email = values.email.trim().toLowerCase();
      await signInWithEmailAndPassword(auth, email, values.password);
      
      toast({
        title: 'Authenticating...',
        description: 'Verifying your credentials.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Ensure you have created this account in the Firebase Console.',
      });
    }
  }

  return (
    <>
      <PageHeader title="Access Your Account" breadcrumb={[{ href: '/login', label: 'Login' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="shadow-2xl border-none overflow-hidden">
            <CardHeader className="text-center bg-primary text-white p-8">
              <CardTitle className="text-3xl font-black uppercase tracking-tight">Sign In</CardTitle>
              <CardDescription className="text-primary-foreground/70 mt-2">Manage your global logistics manifest.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <Button 
                onClick={handleGoogleSignIn} 
                variant="outline" 
                className="w-full h-14 border-2 hover:bg-muted transition-all flex items-center justify-center gap-3 text-lg font-bold"
              >
                <Chrome className="w-6 h-6 text-red-500" />
                Sign in with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground font-bold">Or continue with email</span></div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-primary flex items-center gap-2">
                          <MailIcon className="w-4 h-4" /> Email Address
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="admin@al-israa.de" {...field} className="h-12 text-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-primary flex items-center gap-2">
                          <Lock className="w-4 h-4" /> Password
                        </FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} className="h-12 text-lg" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-black text-xl uppercase tracking-widest shadow-xl transition-transform hover:scale-[1.02]" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Verifying...' : 'Sign In Now'}
                  </Button>
                </form>
              </Form>

              <div className="text-center space-y-4">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-accent font-bold hover:underline">Create One</Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
