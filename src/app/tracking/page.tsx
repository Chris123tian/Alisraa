
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function TrackingPage() {
  return (
    <>
      <PageHeader title="Shipment Tracking" breadcrumb={[{ href: '/tracking', label: 'Tracking' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Track Your Shipment</CardTitle>
              <CardDescription>Enter your tracking number to see the status of your cargo.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex gap-2">
                <Input placeholder="Enter your tracking code..." className="flex-grow" />
                <Button type="submit">Track</Button>
              </form>
              <div className="mt-8 p-8 border rounded-lg bg-muted/50 text-center">
                <p className="text-muted-foreground">Your tracking details will appear here.</p>
              </div>
            </CardContent>
          </Card>
          
          <h3 className="text-2xl font-bold mt-16 mb-6 text-center">Track by Origin & Destination</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Ocean Cargo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Syria to Germany</p>
                <p className="text-muted-foreground">Syria to United States</p>
                <p className="text-muted-foreground">Syria to United Kingdom</p>
                <p className="text-muted-foreground">Syria to Africa</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Air Cargo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">Syria to Germany</p>
                <p className="text-muted-foreground">Syria to United States</p>
                <p className="text-muted-foreground">Syria to United Kingdom</p>
                <p className="text-muted-foreground">Syria to Africa</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
