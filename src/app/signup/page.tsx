
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
import { useAuth, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Chrome, User, Mail, Lock } from 'lucide-react';

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function SignupPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();

  const PRIMARY_ADMIN_EMAIL = 'alisraainternationaler@gmail.com';

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  async function handleGoogleSignUp() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        username: user.displayName || 'Google User',
        email: user.email,
        isAdmin: user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL,
      }, { merge: true });

      toast({
        title: 'Account Created',
        description: 'Redirecting to your dashboard...',
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Google Sign-Up Failed',
        description: error.message,
      });
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const userDocRef = doc(firestore, 'users', user.uid);
      const userData = {
        id: user.uid,
        username: values.username,
        email: values.email,
        isAdmin: values.email.toLowerCase() === PRIMARY_ADMIN_EMAIL,
      };
      
      setDocumentNonBlocking(userDocRef, userData, { merge: true });

      toast({
        title: 'Success!',
        description: "Account created. Please log in with your credentials.",
      });
      router.push('/login');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup Failed',
        description: error.message,
      });
    }
  }

  return (
    <>
      <PageHeader title="Create Client Account" breadcrumb={[{ href: '/signup', label: 'Sign Up' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="shadow-2xl border-none overflow-hidden">
            <CardHeader className="bg-primary text-white p-8 text-center">
              <CardTitle className="text-3xl font-black uppercase tracking-tight">Register</CardTitle>
              <CardDescription className="text-primary-foreground/70">Join Al-Israa's global shipping network.</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              <Button 
                onClick={handleGoogleSignUp} 
                variant="outline" 
                className="w-full h-14 border-2 flex items-center justify-center gap-3 text-lg font-bold"
              >
                <Chrome className="w-6 h-6 text-red-500" />
                Sign up with Google
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                <div className="relative flex justify-center text-xs uppercase"><span className="bg-background px-4 text-muted-foreground font-bold">Or register with email</span></div>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-primary flex items-center gap-2">
                          <User className="w-4 h-4" /> Full Name
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-primary flex items-center gap-2">
                          <Mail className="w-4 h-4" /> Email Address
                        </FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="client@example.com" {...field} className="h-12" />
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
                          <Input type="password" placeholder="********" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-14 bg-accent hover:bg-accent/90 text-white font-black text-xl uppercase tracking-widest" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Creating...' : 'Create Account'}
                  </Button>
                </form>
              </Form>
               <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Already a member?{' '}
                  <Link href="/login" className="text-accent font-bold hover:underline">
                    Log in
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
