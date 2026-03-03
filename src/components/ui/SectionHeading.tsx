import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string | React.ReactNode;
  subtitle?: string;
  label?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, label, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {label && (
        <span className={cn("text-sm font-medium text-muted-foreground mb-2 block", centered && "text-center")}>{label}</span>
      )}
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
