import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ErrorCalculator from "@/components/ErrorCalculator";
import AdvancedCalculators from "@/components/AdvancedCalculators";

import ErrorVisualization from "@/components/ErrorVisualization";

import LearnSection from "@/components/LearnSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <LearnSection />
        <ErrorCalculator />
        <AdvancedCalculators />
        <ErrorVisualization />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
