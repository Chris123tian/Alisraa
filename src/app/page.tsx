import { Hero } from '@/components/homepage/hero';
import { ServicesPreview } from '@/components/homepage/services-preview';
import { AboutPreview } from '@/components/homepage/about-preview';
import { WhyChooseUs } from '@/components/homepage/why-choose-us';
import { CtaSection } from '@/components/homepage/cta-section';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview />
      <WhyChooseUs />
      <CtaSection />
    </>
  );
}
