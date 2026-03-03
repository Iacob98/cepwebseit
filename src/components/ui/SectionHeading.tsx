import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string | React.ReactNode;
  subtitle?: string;
  label?: string;
  tag?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({ title, subtitle, label, tag, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      {(label || tag) && (
        <div className={cn("flex items-center mb-2", centered ? "justify-center gap-4" : "justify-between")}>
          {label && (
            <span className="text-sm font-medium text-muted-foreground block">// {label}</span>
          )}
          {tag && (
            <span className="text-xs font-medium tracking-widest text-muted-foreground/50 uppercase">[{tag}]</span>
          )}
        </div>
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
