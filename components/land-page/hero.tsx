import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface HeroProps {
  children?: React.ReactNode;
}

interface HeroContentProps {
  children?: React.ReactNode;
}

interface HeroImageProps {
  children?: React.ReactNode;
}

export function Hero({ children }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">{children}</div>
      </div>
    </section>
  );
}

interface HeroBadgeProps {
  text: string;
}

export function HeroBadge({ text }: HeroBadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50">
      <span className="w-2 h-2 rounded-full bg-primary"></span>
      <span className="text-xs font-medium text-muted-foreground">{text}</span>
    </div>
  );
}

interface HeroTitleProps {
  children: React.ReactNode;
}

export function HeroTitle({ children }: HeroTitleProps) {
  return <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground">{children}</h1>;
}

interface HeroDescriptionProps {
  children: React.ReactNode;
}

export function HeroDescription({ children }: HeroDescriptionProps) {
  return <p className="text-lg text-muted-foreground">{children}</p>;
}

interface HeroCtasProps {
  primaryText: string;
  secondaryText: string;
  primaryHref?: string;
}

export function HeroCtas({ primaryText, secondaryText, primaryHref = "/dashboard/register" }: HeroCtasProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href={primaryHref}>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-base h-12 w-full sm:w-auto">
          {primaryText}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="outline" className="gap-2 text-base h-12">
        {secondaryText}
      </Button>
    </div>
  );
}

export function HeroContent({ children }: HeroContentProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function HeroImage({ children }: HeroImageProps) {
  return (
    <div className="relative hidden md:block">
      <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-border/50 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">{children}</div>
      </div>
    </div>
  );
}

interface HeroDashboardCardProps {
  revenue: string;
  items: number;
  image?: React.ReactNode;
}

export function HeroDashboardCard({ revenue, items, image }: HeroDashboardCardProps) {
  return (
    <>
      <div className="bg-card rounded-xl p-6 shadow-lg border border-border w-full max-w-sm">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-foreground">Dashboard</span>
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">{revenue}</span>
              <span className="text-xs text-muted-foreground">{items}</span>
            </div>
            <div className="space-y-2">
              <div className="text-xs text-primary font-medium">Peças</div>
              <div className="flex gap-2">
                <div className="flex-1 h-6 bg-primary/30 rounded"></div>
                <div className="flex-1 h-6 bg-primary/50 rounded"></div>
                <div className="flex-1 h-6 bg-primary/70 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {image}
    </>
  );
}

export function HeroProductPlaceholder() {
  return (
    <div className="w-32 h-40 bg-card rounded-xl shadow-lg border border-border flex items-center justify-center">
      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-2">Seu produto aqui</p>
      </div>
    </div>
  );
}
