import { cva, VariantProps } from "class-variance-authority";

const titleVariants = cva(
  "font-bold",
  {
    variants: {
      size: {
        sm: "text-[18px]",
        md: "text-[20px]",
        lg: "text-[24px]",
      },
    },
  }
)

export const Title = ({ size, className, children }: VariantProps<typeof titleVariants> & { className?: string, children: React.ReactNode }) => {
  return (
    <div className={titleVariants({ size, className })}>{children}</div>
  );
};