import { Navbar }       from "@/components/landing/Navbar";
import { HeroSection }  from "@/components/landing/HeroSection";
import { HowItWorks }   from "@/components/landing/HowItWorks";
import { Features }     from "@/components/landing/Features";
import { Testimonials } from "@/components/landing/Testimonials";
import { Pricing }      from "@/components/landing/Pricing";
import { Footer }       from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--app-bg-solid)]">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
