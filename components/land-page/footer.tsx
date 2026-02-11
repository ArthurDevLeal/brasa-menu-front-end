import Link from "next/link";

interface FooterProps {
  children?: React.ReactNode;
}

interface FooterColumnsProps {
  children?: React.ReactNode;
}

interface FooterColumnProps {
  title?: string;
  children: React.ReactNode;
}

interface FooterLogoProps {
  children?: React.ReactNode;
}

interface FooterDescriptionProps {
  children: React.ReactNode;
}

interface FooterListProps {
  children?: React.ReactNode;
}

interface FooterListItemProps {
  href: string;
  children: React.ReactNode;
}

interface FooterBottomProps {
  children?: React.ReactNode;
}

interface FooterCopyrightProps {
  text: string;
}

interface FooterSocialLinksProps {
  links?: Array<{
    href: string;
    icon: React.ReactNode;
    label: string;
  }>;
}

export function Footer({ children }: FooterProps) {
  return (
    <footer className="border-t border-border/40 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">{children}</div>
    </footer>
  );
}

export function FooterColumns({ children }: FooterColumnsProps) {
  return <div className="grid md:grid-cols-4 gap-8 mb-8">{children}</div>;
}

export function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="space-y-4">
      {title && <h4 className="font-semibold text-foreground text-sm">{title}</h4>}
      {children}
    </div>
  );
}

export function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-sm">R</span>
      </div>
      <span className="font-bold text-foreground">Restaurante.fe</span>
    </div>
  );
}

export function FooterDescription({ children }: FooterDescriptionProps) {
  return <p className="text-sm text-muted-foreground">{children}</p>;
}

export function FooterList({ children }: FooterListProps) {
  return <ul className="space-y-2">{children}</ul>;
}

export function FooterListItem({ href, children }: FooterListItemProps) {
  return (
    <li>
      <Link href={href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
        {children}
      </Link>
    </li>
  );
}

export function FooterBottom({ children }: FooterBottomProps) {
  return (
    <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
      {children}
    </div>
  );
}

export function FooterCopyright({ text }: FooterCopyrightProps) {
  return <p className="text-sm text-muted-foreground">{text}</p>;
}

interface SocialLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface FooterSocialProps {
  links: SocialLink[];
}

export function FooterSocial({ links }: FooterSocialProps) {
  return (
    <div className="flex gap-6 mt-4 md:mt-0">
      {links.map((link,i) => (
        <Link
          key={i}
          href={link.href}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="sr-only">{link.label}</span>
          {link.icon}
        </Link>
      ))}
    </div>
  );
}
