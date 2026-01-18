import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ErrorCalculator from "@/components/ErrorCalculator";
import AdvancedCalculators from "@/components/AdvancedCalculators";
// import SolutionComparison from "@/components/SolutionComparison";
import ErrorVisualization from "@/components/ErrorVisualization";
import EducationalMaterials from "@/components/EducationalMaterials";
import LearnSection from "@/components/LearnSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ErrorCalculator />
        <AdvancedCalculators />
        {/* <SolutionComparison /> */}
        <ErrorVisualization />

        {/* <EducationalMaterials /> */}
        <LearnSection />

      </main>
      <Footer />
    </div>
  );
};

export default Index;
