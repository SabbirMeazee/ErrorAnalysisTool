import { Sparkles } from "lucide-react";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    {/* Background Elements */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" style={{
        animationDelay: '2s'
      }} />
    </div>

    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }} />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4" />
          Numerical Methods Education Tool
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in" style={{
          animationDelay: '0.1s'
        }}>
          Master{' '}
          <span className="gradient-text">Error Analysis</span>
          <br />
          in Numerical Methods
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{
          animationDelay: '0.2s'
        }}>
          Calculate, visualize, and understand the errors that arise in numerical computations.

        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{
          animationDelay: '0.3s'
        }}>
          <a href="#calculator" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg" style={{
            boxShadow: 'var(--shadow-glow)'
          }}>
            Start Calculating
          </a>

        </div>

        {/* Error Types Preview */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{
          animationDelay: '0.4s'
        }}>
          {['Absolute', 'Relative', 'Percentage', 'Truncation'].map(type => <div key={type} className="glass-card p-4 text-center">
            <p className="text-sm text-muted-foreground">Error Type</p>
            <p className="font-mono font-semibold text-primary">{type}</p>
          </div>)}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#calculator" className="text-muted-foreground hover:text-foreground transition-colors">

        </a>
      </div>
    </div>
  </section>;
};
export default Hero;