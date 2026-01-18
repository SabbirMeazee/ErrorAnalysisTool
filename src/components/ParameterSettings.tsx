import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

export interface Parameters {
  stepSize: number;
  iterations: number;
  tolerance: number;
  precision: number;
}

interface ParameterSettingsProps {
  parameters: Parameters;
  onChange: (params: Parameters) => void;
}

const ParameterSettings = ({ parameters, onChange }: ParameterSettingsProps) => {
  const updateParam = <K extends keyof Parameters>(key: K, value: Parameters[K]) => {
    onChange({ ...parameters, [key]: value });
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings2 className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Parameter Settings</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Step Size */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Step Size (h)</Label>
            <span className="font-mono text-sm text-primary">{parameters.stepSize.toFixed(4)}</span>
          </div>
          <Slider
            value={[parameters.stepSize]}
            onValueChange={([v]) => updateParam("stepSize", v)}
            min={0.001}
            max={1}
            step={0.001}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Smaller values reduce truncation error</p>
        </div>

        {/* Iterations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Max Iterations</Label>
            <span className="font-mono text-sm text-primary">{parameters.iterations}</span>
          </div>
          <Slider
            value={[parameters.iterations]}
            onValueChange={([v]) => updateParam("iterations", Math.round(v))}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Maximum number of iteration steps</p>
        </div>

        {/* Tolerance */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Tolerance (ε)</Label>
            <span className="font-mono text-sm text-primary">{parameters.tolerance.toExponential(1)}</span>
          </div>
          <Slider
            value={[Math.log10(parameters.tolerance)]}
            onValueChange={([v]) => updateParam("tolerance", Math.pow(10, v))}
            min={-12}
            max={-2}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Convergence threshold</p>
        </div>

        {/* Precision */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm">Decimal Precision</Label>
            <span className="font-mono text-sm text-primary">{parameters.precision} digits</span>
          </div>
          <Slider
            value={[parameters.precision]}
            onValueChange={([v]) => updateParam("precision", Math.round(v))}
            min={2}
            max={15}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">Display precision for results</p>
        </div>
      </div>
    </div>
  );
};

export default ParameterSettings;
