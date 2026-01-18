import { useState, useMemo } from "react";
import { Calculator, Layers, Cpu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdvancedCalculators = () => {
  return (
    <section id="advanced-calc" className="py-20 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Advanced <span className="gradient-text">Calculators</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compute truncation error, round-off error, and analyze error propagation through calculations.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="truncation" className="space-y-6">
            <TabsList className="grid grid-cols-2 gap-2 bg-transparent h-auto p-0">
              <TabsTrigger 
                value="truncation" 
                className="glass-card data-[state=active]:border-primary data-[state=active]:bg-primary/10 py-4"
              >
                <Layers className="w-4 h-4 mr-2" />
                Truncation Error
              </TabsTrigger>
              <TabsTrigger 
                value="roundoff"
                className="glass-card data-[state=active]:border-primary data-[state=active]:bg-primary/10 py-4"
              >
                <Cpu className="w-4 h-4 mr-2" />
                Round-off Error
              </TabsTrigger>
            </TabsList>

            <TabsContent value="truncation">
              <TruncationErrorCalculator />
            </TabsContent>

            <TabsContent value="roundoff">
              <RoundoffErrorCalculator />
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </section>
  );
};

const TruncationErrorCalculator = () => {
  const [xValue, setXValue] = useState("0.5");
  const [order, setOrder] = useState("3");

  const results = useMemo(() => {
    const x = parseFloat(xValue) || 0;
    const n = parseInt(order) || 1;
    
    // Calculate e^x using Taylor series
    let taylorSum = 0;
    let factorial = 1;
    for (let i = 0; i <= n; i++) {
      if (i > 0) factorial *= i;
      taylorSum += Math.pow(x, i) / factorial;
    }
    
    const exactValue = Math.exp(x);
    const truncationError = Math.abs(exactValue - taylorSum);
    const nextTerm = Math.pow(x, n + 1) / (factorial * (n + 1));
    
    return {
      exact: exactValue,
      approximation: taylorSum,
      error: truncationError,
      nextTerm: Math.abs(nextTerm),
      order: n,
    };
  }, [xValue, order]);

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Truncation Error (Taylor Series)</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Compute e^x using Taylor series expansion and observe truncation error at different orders.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label>Value of x</Label>
          <Input
            type="number"
            value={xValue}
            onChange={(e) => setXValue(e.target.value)}
            className="font-mono bg-background/50"
            step="0.1"
          />
        </div>
        <div className="space-y-2">
          <Label>Taylor Series Order (n)</Label>
          <Input
            type="number"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="font-mono bg-background/50"
            min="1"
            max="20"
          />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/30 mb-6 font-mono text-sm">
        <p className="text-muted-foreground mb-2">Taylor Series for e^x:</p>
        <p className="text-primary">e^x ≈ 1 + x + x²/2! + x³/3! + ... + x^n/n!</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ResultBox label="Exact Value" value={results.exact.toFixed(10)} color="primary" />
        <ResultBox label="Approximation" value={results.approximation.toFixed(10)} color="accent" />
        <ResultBox label="Truncation Error" value={results.error.toFixed(10)} color="warning" />
      </div>
    </div>
  );
};

const RoundoffErrorCalculator = () => {
  const [exactValue, setExactValue] = useState("3.14159265");
  const [decimalPoints, setDecimalPoints] = useState("4");

  const results = useMemo(() => {
    const exact = parseFloat(exactValue) || 0;
    const decimals = parseInt(decimalPoints) || 0;
    
    // Round the exact value to specified decimal points (stored/rounded value)
    const roundedValue = parseFloat(exact.toFixed(decimals));
    
    // Round-off Error = |Exact Value - Rounded Value|
    const roundoffError = Math.abs(exact - roundedValue);
    const relativeError = exact !== 0 ? (roundoffError / Math.abs(exact)) * 100 : 0;
    
    return {
      exact,
      rounded: roundedValue,
      roundoffError,
      relativeError,
    };
  }, [exactValue, decimalPoints]);

  return (
    <div className="glass-card p-6 md:p-8">
      <h3 className="text-xl font-semibold mb-2">Round-off Error Calculator</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Calculate round-off error as the difference between the exact value and its rounded (stored) representation.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-2">
          <Label>Exact Value</Label>
          <Input
            type="number"
            value={exactValue}
            onChange={(e) => setExactValue(e.target.value)}
            className="font-mono bg-background/50"
            step="any"
            placeholder="Enter exact value"
          />
        </div>
        <div className="space-y-2">
          <Label>Decimal Points (for rounding)</Label>
          <Input
            type="number"
            value={decimalPoints}
            onChange={(e) => setDecimalPoints(e.target.value)}
            className="font-mono bg-background/50"
            min="0"
            max="15"
            placeholder="Decimal places"
          />
        </div>
      </div>

      <div className="p-4 rounded-lg bg-secondary/30 mb-6 font-mono text-sm">
        <p className="text-muted-foreground mb-1">Round-off Error Formula:</p>
        <p className="text-primary">Round-off Error = |Exact Value − Rounded (Stored) Value|</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ResultBox label="Exact Value" value={results.exact.toString()} color="primary" />
        <ResultBox label="Rounded Value" value={results.rounded.toString()} color="accent" />
        <ResultBox label="Round-off Error" value={results.roundoffError.toFixed(10)} color="destructive" />
      </div>
    </div>
  );
};


interface ResultBoxProps {
  label: string;
  value: string;
  color: "primary" | "accent" | "success" | "warning" | "destructive" | "muted";
}

const ResultBox = ({ label, value, color }: ResultBoxProps) => {
  const colors = {
    primary: "border-primary/30 text-primary",
    accent: "border-accent/30 text-accent",
    success: "border-success/30 text-success",
    warning: "border-warning/30 text-warning",
    destructive: "border-destructive/30 text-destructive",
    muted: "border-muted-foreground/30 text-muted-foreground",
  };

  return (
    <div className={`p-4 rounded-lg border bg-background/30 ${colors[color]}`}>
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-mono text-sm truncate" title={value}>{value}</p>
    </div>
  );
};

export default AdvancedCalculators;
