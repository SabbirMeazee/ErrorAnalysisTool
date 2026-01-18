import { Calculator, BookOpen } from "lucide-react";
const Footer = () => {
  return <footer className="py-12 border-t border-border/30">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <span className="font-semibold">ErrorAnalysis Tool</span>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          An educational tool for understanding numerical methods and error analysis.
        </p>

        <div className="flex items-center gap-4">

          <a href="#learn" className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground" aria-label="Documentation">
            <BookOpen className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-border/30 text-center">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Error Analysis Tool.
        </p>
      </div>
    </div>
  </footer>;
};
export default Footer;