
import { Header } from "./LandingPage/Header";
import { HeroSection } from "./LandingPage/HeroSection";
import { FeaturesSection } from "./LandingPage/FeaturesSection";
import { CTASection } from "./LandingPage/CTASection";
import { Footer } from "./LandingPage/Footer";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;
