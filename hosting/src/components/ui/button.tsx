import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative",
  {
    variants: {
      variant: {
        ghostWhite: "text-[#F8FAFC] hover:bg-[#F1F5F9]",
        ghostBlack: "text-[#0F172A] hover:bg-[#F1F5F9]",
        blueButton: "bg-[#1A73E8] text-[#F8FAFC] hover:bg-[#1A60D0]",
        lightTextBlack: "bg-[#F8FAFC] text-[#0F172A] hover:bg-[#F1F5F9]",
        lightTextRed: "bg-[#F8FAFC] text-[#B3261E] hover:bg-[#F1F5F9]",
        copyButton: "border border-[#0F172A] text-[#0F172A] hover:bg-[#F1F5F9]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        fixed: "w-[500px] h-[60px]",
      },
    },
    defaultVariants: {
      variant: "copyButton",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  icon?: React.ReactNode
  notificationCount?: number
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, icon, children, notificationCount = 0, iconPosition = "right", ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
        {children}
        {notificationCount > 0 && (
          <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1.5 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-[#1A73E8] rounded-full">
            {notificationCount}
          </span>
        )}
        {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
