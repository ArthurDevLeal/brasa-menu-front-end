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
      <div className="max-w-5xl mx-auto">
        <div className="items-center">{children}</div>
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
  return <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-foreground text-center">{children}</h1>;
}

interface HeroDescriptionProps {
  children: React.ReactNode;
}

export function HeroDescription({ children }: HeroDescriptionProps) {
  return <p className="text-lg text-muted-foreground text-center">{children}</p>;
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
      <div className="flex flex-col items-center justify-center space-y-4">{children}</div>
    </div>
  );
}

export function HeroImage({ children }: HeroImageProps) {
  return (
    <div className="relative hidden md:block">
      <div className="relative aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 border border-border/50 overflow-hidden">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8">{children}</div>
      </div>
    </div>
  );
}

import { ReactNode } from 'react';

interface HeroDashboardCardProps {
  revenue: string;
  items: string;
  image: ReactNode;
}

const StatusIndicator = () => (
  <div className="flex gap-1.5">
    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 shadow-sm" />
    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm" />
  </div>
);

const MetricsBar = () => (
  <div className="space-y-2">
    <h3 className="text-xs font-medium text-primary uppercase tracking-wide">Peças</h3>
    <div className="flex gap-1.5">
      {[0.3, 0.5, 0.7].map((opacity, index) => (
        <div
          key={index}
          className="flex-1 h-1.5 rounded-full bg-primary transition-all duration-300 hover:h-2"
          style={{ opacity }}
        />
      ))}
    </div>
  </div>
);

export function HeroDashboardCard({ revenue, items, image }: HeroDashboardCardProps) {
  return (
    <div className="flex gap-6 items-center">
      <div className="bg-card rounded-lg p-6 border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 flex-1 max-w-sm">
        <div className="space-y-5">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Dashboard</span>
            <StatusIndicator />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground font-medium">Revenue</span>
                <span className="text-sm text-foreground font-semibold">{revenue}</span>
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <span className="text-xs text-muted-foreground font-medium">Items</span>
                <span className="text-sm text-foreground font-semibold">{items}</span>
              </div>
            </div>

            <MetricsBar />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex">{image}</div>
    </div>
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
