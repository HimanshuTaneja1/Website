import { Hero } from "@/components/sections/Hero";
import { WhyNow } from "@/components/sections/WhyNow";
import { ServicesTeaser } from "@/components/sections/ServicesTeaser";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Proof } from "@/components/sections/Proof";
import { ProcessScroll } from "@/components/sections/ProcessScroll";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTABlock } from "@/components/sections/CTABlock";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyNow />
      <ServicesTeaser />
      <SelectedWork />
      <Proof />
      <ProcessScroll />
      <Testimonials />
      <FAQ />
      <CTABlock />
    </>
  );
}
