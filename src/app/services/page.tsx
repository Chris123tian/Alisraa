import { PageHeader } from '@/components/page-header';
import { shippingRates } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Our Services" breadcrumb={[{ href: '/services', label: 'Services' }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold uppercase text-primary mb-2 tracking-wider">Shipping Costs</h2>
            <h3 className="text-3xl md:text-4xl font-bold">Transparent Pricing</h3>
            <p className="text-muted-foreground mt-4">
              Find detailed shipping costs for various destinations below. We offer both ocean and air transportation to suit your budget and timeline.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shippingRates.map((rate) => (
              <Card key={rate.destination} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-xl">Goods to {rate.destination}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <h4 className="font-semibold text-lg mb-2">Ocean Transportation</h4>
                  <Table className="mb-6">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rate.ocean.map((option) => (
                        <TableRow key={option.duration}>
                          <TableCell>{option.duration}</TableCell>
                          <TableCell className="text-right">{option.cost}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <h4 className="font-semibold text-lg mb-2">Air Transportation</h4>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Duration</TableHead>
                        <TableHead className="text-right">Cost</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rate.air.map((option) => (
                        <TableRow key={option.duration}>
                          <TableCell>{option.duration}</TableCell>
                          <TableCell className="text-right">{option.cost}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
