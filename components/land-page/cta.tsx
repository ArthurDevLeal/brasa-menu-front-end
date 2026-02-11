import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CTAProps {
  children?: React.ReactNode;
}

interface CTATitleProps {
  children: React.ReactNode;
}

interface CTADescriptionProps {
  children: React.ReactNode;
}

interface CTAActionsProps {
  primaryText: string;
  secondaryText: string;
  primaryHref?: string;
}

export function CTA({ children }: CTAProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20">
      <div className="max-w-3xl mx-auto text-center space-y-8">{children}</div>
    </section>
  );
}

export function CTATitle({ children }: CTATitleProps) {
  return <h2 className="text-4xl sm:text-5xl font-bold text-foreground">{children}</h2>;
}

export function CTADescription({ children }: CTADescriptionProps) {
  return <p className="text-lg text-muted-foreground">{children}</p>;
}

export function CTAActions({
  primaryText,
  secondaryText,
  primaryHref = "/dashboard/register",
}: CTAActionsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center gap-4">
      <Link href={primaryHref}>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base">
          {primaryText}
        </Button>
      </Link>
      <Button variant="outline" className="h-12 px-8 text-base">
        {secondaryText}
      </Button>
    </div>
  );
}
