import { Button } from "@/components/ui/button";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
}

interface HeaderLogoProps {
  children?: React.ReactNode;
}

interface HeaderNavProps {
  children?: React.ReactNode;
}

interface HeaderActionsProps {
  children?: React.ReactNode;
}

export function Header({ children }: HeaderProps) {
  return (
    <header className="sticky top-0 border-b border-border/40 backdrop-blur-sm bg-background/80 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">{children}</div>
      </div>
    </header>
  );
}

export function HeaderLogo() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-lg font-bold text-foreground">Brasa Menu</span>
    </div>
  );
}

interface HeaderNavItem {
  href: string;
  label: string;
}

interface HeaderNavLinksProps {
  items: HeaderNavItem[];
}

export function HeaderNavLinks({ items }: HeaderNavLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function HeaderActions() {
  return (
    <div className="flex items-center gap-3">
      <Link href="/dashboard/register">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Começar Agora</Button>
      </Link>
    </div>
  );
}
