import HeroSection from "../../pages/Home/HeroSection/HeroSection";
import StatsSection from "../../pages/Home/StatsSection/StatsSection";
import FeaturesSection from "../../pages/Home/FeaturesSection/FeaturesSection";
import ProcessSection from "../../pages/Home/ProcessSection/ProcessSection";
import ContactSection from "../../pages/Home/ContactSection/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <ProcessSection />
      <ContactSection />
    </div>
  );
};

export default Home;
