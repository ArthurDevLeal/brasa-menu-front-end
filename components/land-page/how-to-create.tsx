import { Button } from "@/components/ui/button";

interface HowToCreateProps {
  children?: React.ReactNode;
}

interface HowToCreateHeaderProps {
  title: string;
  subtitle: string;
}

interface HowToCreateContentProps {
  children?: React.ReactNode;
}

interface HowToCreateFormProps {
  children?: React.ReactNode;
}

interface HowToCreateImageProps {
  children?: React.ReactNode;
}

interface FormFieldProps {
  label: string;
  value: string;
}

interface FormRowProps {
  children?: React.ReactNode;
}

export function HowToCreate({ children }: HowToCreateProps) {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 bg-card/30">
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  );
}

export function HowToCreateHeader({ title, subtitle }: HowToCreateHeaderProps) {
  return (
    <div className="text-center space-y-4 mb-16">
      <h2 className="text-4xl sm:text-5xl font-bold text-foreground">{title}</h2>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export function HowToCreateContainer({ children }: HowToCreateContentProps) {
  return (
    <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
      <div className="grid md:grid-cols-2 gap-8 items-center">{children}</div>
    </div>
  );
}

export function HowToCreateForm({ children }: HowToCreateFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-foreground mb-2">Novo Produto</h3>
      </div>

      <div className="space-y-4">{children}</div>
    </div>
  );
}

export function FormField({ label, value }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="p-3 rounded-lg border border-border bg-background/50 text-muted-foreground text-sm">
        {value}
      </div>
    </div>
  );
}

interface FormRowTwoColumnsProps {
  children?: React.ReactNode;
}

export function FormRowTwoColumns({ children }: FormRowTwoColumnsProps) {
  return <div className="grid grid-cols-2 gap-4">{children}</div>;
}

interface FormTextAreaProps {
  label: string;
  value: string;
}

export function FormTextArea({ label, value }: FormTextAreaProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <div className="p-3 rounded-lg border border-border bg-background/50 text-muted-foreground text-sm h-20">
        {value}
      </div>
    </div>
  );
}

interface FormActionsProps {
  cancelText?: string;
  submitText?: string;
}

export function FormActions({ cancelText = "Cancelar", submitText = "Salvar Produto" }: FormActionsProps) {
  return (
    <div className="flex gap-3">
      <Button variant="outline" className="flex-1">
        {cancelText}
      </Button>
      <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">{submitText}</Button>
    </div>
  );
}

export function HowToCreateImage({ children }: HowToCreateImageProps) {
  return (
    <div className="relative">
      <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center border border-border">
        <div className="text-center">{children}</div>
      </div>
    </div>
  );
}

interface ImagePlaceholderProps {
  text: string;
  label: string;
}

export function ImagePlaceholder({ text, label }: ImagePlaceholderProps) {
  return (
    <>
      <div className="w-40 h-40 bg-card rounded-lg mx-auto mb-4 flex items-center justify-center border border-border">
        <span className="text-xs text-muted-foreground">{text}</span>
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
    </>
  );
}
