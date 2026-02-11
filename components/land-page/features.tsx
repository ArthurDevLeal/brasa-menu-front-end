import { LucideIcon } from "lucide-react";

interface FeaturesProps {
  children?: React.ReactNode;
}

interface FeaturesHeaderProps {
  subtitle: string;
  title: string;
}

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function Features({ children }: FeaturesProps) {
  return (
    <section id="recursos" className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function FeaturesHeader({ subtitle, title }: FeaturesHeaderProps) {
  return (
    <div className="text-center space-y-4 mb-16">
      <p className="text-sm font-semibold text-primary uppercase tracking-wider">{subtitle}</p>
      <h2 className="text-4xl sm:text-5xl font-bold text-foreground">{title}</h2>
    </div>
  );
}

interface FeaturesGridProps {
  children?: React.ReactNode;
}

export function FeaturesGrid({ children }: FeaturesGridProps) {
  return <div className="grid md:grid-cols-4 gap-8">{children}</div>;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-colors space-y-4">
      <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold text-lg text-foreground">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
