import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap border text-sm font-semibold tracking-[0.02em] ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "border-primary bg-primary text-primary-foreground shadow-[var(--enk-shadow-sm)] hover:bg-primary/90 hover:shadow-[var(--enk-shadow-md)]",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground shadow-[0_12px_24px_rgba(220,38,38,0.14)] hover:bg-destructive/92 hover:shadow-[0_16px_32px_rgba(220,38,38,0.2)]",
        outline:
          "border-border bg-background text-foreground shadow-[0_1px_2px_rgba(15,23,42,0.02)] hover:border-foreground/20 hover:bg-muted/80 hover:text-foreground",
        secondary:
          "border-charcoal bg-charcoal text-white shadow-[0_12px_30px_rgba(12,18,24,0.16)] hover:bg-charcoal-light hover:border-charcoal-light hover:-translate-y-0.5",
        ghost: "border-transparent text-foreground hover:bg-muted/70 hover:text-foreground",
        link: "border-transparent p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 rounded-[var(--enk-radius)] px-5 py-2",
        sm: "h-9 rounded-[var(--enk-radius)] px-4 text-[13px]",
        lg: "h-12 rounded-[var(--enk-radius)] px-7 text-[15px]",
        xl: "h-14 rounded-[var(--enk-radius)] px-10 text-[17px] font-bold tracking-[0.01em]",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
