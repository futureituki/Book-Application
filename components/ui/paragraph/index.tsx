import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as React from "react";

const paragraphVariants = cva("text-stone-600 leading-[140%]", {
  variants: {
    size: {
      sm: "text-sm", // 14px
      md: "text-base", // 16px
      lg: "text-lg", // 18px
    },
    weight: {
      default: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    },
  },
  defaultVariants: {
    size: "md",
    weight: "default",
  },
});

export interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, size, weight, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn(paragraphVariants({ size, weight, className }))}
        {...props}
      />
    );
  }
);

export { Paragraph };
