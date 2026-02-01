import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { policyLinks } from '@/lib/data';

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const policy = policyLinks.find(p => p.href.includes(params.slug));

  if (!policy) {
    notFound();
  }

  const termsAndConditionsText = `Shipments will be accepted with the freight charges being billed prepaid, collect or third party. The shipper and consignee are liable jointly and separately for all unpaid charges. If no block is checked on the Maersk way bill, the shipment will automatically be prepaid.`;


  return (
    <>
      <PageHeader title={policy.label} breadcrumb={[{ href: `/policy/${params.slug}`, label: policy.label }]} />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
            <Card>
                <CardHeader>
                    <CardTitle>{policy.label}</CardTitle>
                </CardHeader>
                <CardContent className="prose dark:prose-invert">
                    {policy.href.includes('terms-and-conditions') ? (
                        <p>{termsAndConditionsText}</p>
                    ) : (
                        <p>Content for this policy is being drafted and will be available soon.</p>
                    )}
                </CardContent>
            </Card>
        </div>
      </section>
    </>
  );
}
