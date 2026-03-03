import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-dark shadow-sm",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary-dark shadow-sm",
        outline: "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        ghost: "text-foreground hover:bg-muted",
        white: "bg-white text-primary hover:bg-muted/50 shadow-sm",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonAsButton = {
  href?: never;
  asChild?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type ButtonAsLink = {
  href: string;
  asChild?: never;
  onClick?: React.MouseEventHandler;
  target?: string;
  rel?: string;
};

type ButtonProps = (ButtonAsButton | ButtonAsLink) &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    children: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));

    if ("href" in props && props.href) {
      const { href, ...rest } = props;
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }

    const { asChild, ...buttonProps } = props as ButtonAsButton;

    if (asChild) {
      return (
        <Slot className={classes} ref={ref} {...buttonProps}>
          {children}
        </Slot>
      );
    }

    return (
      <button className={classes} ref={ref} {...buttonProps}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
