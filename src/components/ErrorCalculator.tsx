import { useState, useMemo } from "react";
import { Calculator, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const ErrorCalculator = () => {
  const [exactValue, setExactValue] = useState<string>("100");
  const [approxValue, setApproxValue] = useState<string>("98.5");

  const calculations = useMemo(() => {
    const exact = parseFloat(exactValue) || 0;
    const approx = parseFloat(approxValue) || 0;

    const absoluteError = Math.abs(exact - approx);
    const relativeError = exact !== 0 ? absoluteError / Math.abs(exact) : 0;
    const percentageError = relativeError * 100;

    return {
      absoluteError: absoluteError.toFixed(6),
      relativeError: relativeError.toFixed(6),
      percentageError: percentageError.toFixed(4),
    };
  }, [exactValue, approxValue]);

  const handleReset = () => {
    setExactValue("");
    setApproxValue("");
  };

  return (
    <section id="calculator" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Error <span className="gradient-text">Calculator</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate different types of errors.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            {/* Input Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-2">
                <Label htmlFor="exact" className="text-sm font-medium">
                  Exact Value (True Value)
                </Label>
                <Input
                  id="exact"
                  type="number"
                  value={exactValue}
                  onChange={(e) => setExactValue(e.target.value)}
                  placeholder="Enter exact value"
                  className="font-mono text-lg h-12 bg-background/50 border-border/50 focus:border-primary input-glow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="approx" className="text-sm font-medium">
                  Approximate Value (Numerical Result)
                </Label>
                <Input
                  id="approx"
                  type="number"
                  value={approxValue}
                  onChange={(e) => setApproxValue(e.target.value)}
                  placeholder="Enter approximate value"
                  className="font-mono text-lg h-12 bg-background/50 border-border/50 focus:border-primary input-glow"
                />
              </div>
            </div>

            {/* Results Section */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <ResultCard
                label="Absolute Error"
                value={calculations.absoluteError}
                formula="|Exact - Approx|"
                color="primary"
              />
              <ResultCard
                label="Relative Error"
                value={calculations.relativeError}
                formula="|Error| / |Exact|"
                color="accent"
              />
              <ResultCard
                label="Percentage Error"
                value={`${calculations.percentageError}%`}
                formula="Relative × 100"
                color="success"
              />
            </div>

            {/* Reset Button */}
            <div className="flex justify-center">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                Reset Values
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface ResultCardProps {
  label: string;
  value: string;
  formula: string;
  color: "primary" | "accent" | "success";
}

const ResultCard = ({ label, value, formula, color }: ResultCardProps) => {
  const colorClasses = {
    primary: "border-primary/30 bg-primary/5",
    accent: "border-accent/30 bg-accent/5",
    success: "border-success/30 bg-success/5",
  };

  const textColorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    success: "text-success",
  };

  return (
    <div className={`rounded-xl border p-5 ${colorClasses[color]}`}>
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className={`text-2xl md:text-3xl font-mono font-bold ${textColorClasses[color]}`}>
        {value}
      </p>
      <p className="text-xs text-muted-foreground mt-2 font-mono opacity-70">
        {formula}
      </p>
    </div>
  );
};

export default ErrorCalculator;
