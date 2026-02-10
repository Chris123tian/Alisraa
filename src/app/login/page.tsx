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
import { useAuth, useFirestore } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

export default function LoginPage() {
  const { toast } = useToast();
  const auth = useAuth();
  const firestore = useFirestore();
  const router = useRouter();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const email = values.email.trim().toLowerCase();
      const userCredential = await signInWithEmailAndPassword(auth, email, values.password);
      const user = userCredential.user;

      // Primary Admin Check
      const PRIMARY_ADMIN_EMAIL = 'alisraainternationaler@gmail.com';
      const isPrimaryAdmin = email === PRIMARY_ADMIN_EMAIL;

      // Check Firestore roles if not primary admin
      let hasAdminRole = false;
      if (!isPrimaryAdmin) {
        const adminDocRef = doc(firestore, 'roles_admin', user.uid);
        const adminDoc = await getDoc(adminDocRef);
        hasAdminRole = adminDoc.exists() && adminDoc.data()?.isAdmin === true;
      }

      toast({
        title: 'Login Successful',
        description: isPrimaryAdmin || hasAdminRole ? 'Welcome back, Administrator.' : 'Welcome back to Al-Israa.',
      });
      
      // Routing based on role
      if (isPrimaryAdmin || hasAdminRole) {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }

    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
  }

  return (
    <>
      <PageHeader title="Access Your Account" breadcrumb={[{ href: '/login', label: 'Login' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-lg">
          <Card className="shadow-2xl border-none">
            <CardHeader className="text-center bg-primary text-white rounded-t-lg">
              <CardTitle className="text-2xl font-black uppercase tracking-tight">Sign In</CardTitle>
              <CardDescription className="text-primary-foreground/70">Enter your credentials to manage your logistics.</CardDescription>
            </CardHeader>
            <CardContent className="pt-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-primary">Email Address</FormLabel>
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
                        <FormLabel className="font-bold text-primary">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="********" {...field} className="h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full h-12 bg-accent hover:bg-accent/90 text-white font-bold text-lg" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? 'Authenticating...' : 'Sign In'}
                  </Button>
                </form>
              </Form>
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Don't have an account yet?{' '}
                <Link href="/signup" className="text-accent font-bold hover:underline">
                  Create Account
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
