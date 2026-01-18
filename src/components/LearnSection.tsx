import { BookOpen, Target, TrendingDown, Zap, Calculator, Layers } from "lucide-react";
const errorTypes = [{
  icon: Target,
  title: "Absolute Error",
  description: "The absolute difference between the exact solution and the numerical approximation. Measures the magnitude of the error.",
  formula: "E_abs = |x_true - x_approx|",
  color: "primary"
}, {
  icon: TrendingDown,
  title: "Relative Error",
  description: "The ratio of the absolute error to the magnitude of the exact solution. Useful for comparing errors across different scales.",
  formula: "E_rel = |E_abs| / |x_true|",
  color: "accent"
}, {
  icon: Zap,
  title: "Percentage Error",
  description: "The relative error expressed as a percentage. Provides an intuitive measure of accuracy.",
  formula: "E_% = E_rel × 100%",
  color: "success"
}, {
  icon: Layers,
  title: "Truncation Error",
  description: "Error introduced when infinite processes (like Taylor series) are truncated to finite approximations.",
  formula: "E_trunc = O(h^n)",
  color: "warning"
}, {
  icon: Calculator,
  title: "Round-off Error",
  description: "Error arising from the limited precision of computer arithmetic and floating-point representation.",
  formula: "E_round ≈ ε_machine",
  color: "destructive"
}];
const LearnSection = () => {
  return <section id="learn" className="py-20 md:py-32">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Understanding <span className="gradient-text">Error Types</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Learn about different types of errors in numerical methods and when each one matters most.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {errorTypes.map(item => <ErrorCard key={item.title} {...item} />)}
      </div>

      {/* Tips Section */}

    </div>
  </section>;
};
interface ErrorCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  formula: string;
  color: string;
}
const ErrorCard = ({
  icon: Icon,
  title,
  description,
  formula,
  color
}: ErrorCardProps) => {
  const colorVariants: Record<string, string> = {
    primary: "text-primary bg-primary/10 border-primary/20",
    accent: "text-accent bg-accent/10 border-accent/20",
    success: "text-success bg-success/10 border-success/20",
    warning: "text-warning bg-warning/10 border-warning/20",
    destructive: "text-destructive bg-destructive/10 border-destructive/20"
  };
  const iconColors: Record<string, string> = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive"
  };
  return <div className="glass-card p-6 hover:scale-[1.02] transition-transform duration-300">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colorVariants[color]}`}>
      <Icon className={`w-6 h-6 ${iconColors[color]}`} />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4">{description}</p>
    <div className="px-3 py-2 rounded-lg bg-secondary/50 font-mono text-sm text-primary">
      {formula}
    </div>
  </div>;
};
export default LearnSection;