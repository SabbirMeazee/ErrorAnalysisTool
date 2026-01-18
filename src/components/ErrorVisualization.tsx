import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, Cell } from "recharts";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
const ErrorVisualization = () => {
  // Truncation Error inputs
  const [xValue, setXValue] = useState("0.5");
  const [order, setOrder] = useState("3");

  // Round-off Error inputs
  const [exactValue, setExactValue] = useState("3.14159265");
  const [decimalPoints, setDecimalPoints] = useState("4");

  // Calculate Truncation Error
  const truncationResults = useMemo(() => {
    const x = parseFloat(xValue) || 0;
    const n = parseInt(order) || 1;
    let taylorSum = 0;
    let factorial = 1;
    for (let i = 0; i <= n; i++) {
      if (i > 0) factorial *= i;
      taylorSum += Math.pow(x, i) / factorial;
    }
    const exact = Math.exp(x);
    const error = Math.abs(exact - taylorSum);
    return {
      exact,
      approximation: taylorSum,
      error
    };
  }, [xValue, order]);

  // Calculate Round-off Error
  const roundoffResults = useMemo(() => {
    const exact = parseFloat(exactValue) || 0;
    const decimals = parseInt(decimalPoints) || 0;
    const roundedValue = parseFloat(exact.toFixed(decimals));
    const error = Math.abs(exact - roundedValue);
    return {
      exact,
      rounded: roundedValue,
      error
    };
  }, [exactValue, decimalPoints]);

  // Comparison bar chart data
  const comparisonData = [{
    name: "Truncation Error",
    error: truncationResults.error,
    color: "hsl(var(--primary))"
  }, {
    name: "Round-off Error",
    error: roundoffResults.error,
    color: "hsl(var(--accent))"
  }];

  // Error breakdown data for detailed view
  const errorBreakdownData = [{
    type: "Truncation",
    exactValue: truncationResults.exact,
    calculatedValue: truncationResults.approximation,
    error: truncationResults.error
  }, {
    type: "Round-off",
    exactValue: roundoffResults.exact,
    calculatedValue: roundoffResults.rounded,
    error: roundoffResults.error
  }];

  // Order variation data for truncation error
  const orderVariationData = useMemo(() => {
    const x = parseFloat(xValue) || 0;
    const data = [];
    for (let n = 1; n <= 10; n++) {
      let taylorSum = 0;
      let factorial = 1;
      for (let i = 0; i <= n; i++) {
        if (i > 0) factorial *= i;
        taylorSum += Math.pow(x, i) / factorial;
      }
      const exact = Math.exp(x);
      const error = Math.abs(exact - taylorSum);
      data.push({
        order: n,
        error: error
      });
    }
    return data;
  }, [xValue]);

  // Decimal precision variation data for round-off error
  const precisionVariationData = useMemo(() => {
    const exact = parseFloat(exactValue) || 0;
    const data = [];
    for (let d = 1; d <= 10; d++) {
      const rounded = parseFloat(exact.toFixed(d));
      const error = Math.abs(exact - rounded);
      data.push({
        decimals: d,
        error: error
      });
    }
    return data;
  }, [exactValue]);
  return <section id="visualization" className="py-20 md:py-32 bg-secondary/20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Error <span className="gradient-text">Comparison</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Compare truncation and round-off errors side by side. Adjust parameters to see how each error type changes.
        </p>
      </div>

      {/* Input Controls */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Adjust Parameters</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Truncation Error Inputs */}
            <div className="space-y-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-primary">Truncation Error (e^x Taylor Series)</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">x Value</Label>
                  <Input type="number" value={xValue} onChange={e => setXValue(e.target.value)} className="font-mono bg-background/50" step="0.1" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Order (n)</Label>
                  <Input type="number" value={order} onChange={e => setOrder(e.target.value)} className="font-mono bg-background/50" min="1" max="20" />
                </div>
              </div>
            </div>

            {/* Round-off Error Inputs */}
            <div className="space-y-4 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-medium text-accent">Round-off Error</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Exact Value</Label>
                  <Input type="number" value={exactValue} onChange={e => setExactValue(e.target.value)} className="font-mono bg-background/50" step="any" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Decimal Points</Label>
                  <Input type="number" value={decimalPoints} onChange={e => setDecimalPoints(e.target.value)} className="font-mono bg-background/50" min="0" max="15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Comparison Chart */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Error Comparison</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Direct comparison of truncation error vs round-off error based on your inputs.
          </p>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" tick={{
                  fill: 'hsl(var(--muted-foreground))'
                }} tickFormatter={value => value.toFixed(10)} />
                <YAxis type="category" dataKey="name" stroke="hsl(var(--muted-foreground))" tick={{
                  fill: 'hsl(var(--muted-foreground))'
                }} width={120} />
                <Tooltip contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} labelStyle={{
                  color: 'hsl(var(--foreground))'
                }} formatter={(value: number) => value.toFixed(10)} />
                <Bar dataKey="error" radius={[0, 4, 4, 0]}>
                  {comparisonData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Error Summary */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
              <p className="text-xs text-muted-foreground mb-1">Truncation Error</p>
              <p className="font-mono text-sm text-primary">{truncationResults.error.toFixed(10)}</p>
            </div>
            <div className="p-4 rounded-lg border border-accent/30 bg-accent/5">
              <p className="text-xs text-muted-foreground mb-1">Round-off Error</p>
              <p className="font-mono text-sm text-accent">{roundoffResults.error.toFixed(10)}</p>
            </div>
          </div>
        </div>

        {/* Detailed Breakdown Table */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold mb-4">Detailed Breakdown</h3>
          <p className="text-sm text-muted-foreground mb-6">
            See exact values, calculated/rounded values, and resulting errors.
          </p>

          <div className="space-y-4">
            {/* Truncation Error Details */}
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-primary mb-3">Truncation Error Details</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Exact e^{xValue}</p>
                  <p className="font-mono">{truncationResults.exact.toFixed(10)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Taylor Approx.</p>
                  <p className="font-mono">{truncationResults.approximation.toFixed(10)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Error</p>
                  <p className="font-mono text-primary">{truncationResults.error.toFixed(10)}</p>
                </div>
              </div>
            </div>

            {/* Round-off Error Details */}
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <h4 className="font-medium text-accent mb-3">Round-off Error Details</h4>
              <div className="grid grid-cols-3 gap-2 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Exact Value</p>
                  <p className="font-mono">{roundoffResults.exact}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Rounded ({decimalPoints} dec)</p>
                  <p className="font-mono">{roundoffResults.rounded}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Error</p>
                  <p className="font-mono text-accent">{roundoffResults.error.toFixed(10)}</p>
                </div>
              </div>
            </div>

            {/* Which Error is Larger */}
            <div className="p-4 rounded-lg bg-secondary/30 border border-border">
              <h4 className="font-medium mb-2">Analysis</h4>
              <p className="text-sm text-muted-foreground">
                {truncationResults.error > roundoffResults.error ? <>Truncation error is <span className="text-primary font-medium">{(truncationResults.error / roundoffResults.error).toFixed(2)}x larger</span> than round-off error.</> : roundoffResults.error > truncationResults.error ? <>Round-off error is <span className="text-accent font-medium">{(roundoffResults.error / truncationResults.error).toFixed(2)}x larger</span> than truncation error.</> : <>Both errors are equal.</>}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Parameter Variation Charts */}

    </div>
  </section>;
};
export default ErrorVisualization;