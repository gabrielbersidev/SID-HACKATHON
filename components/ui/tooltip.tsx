"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => children;

const Tooltip = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ className, open, onOpenChange, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false);
  return (
    <div
      ref={ref}
      className={cn("relative inline-block", className)}
      onMouseEnter={() => {
        setIsOpen(true);
        onOpenChange?.(true);
      }}
      onMouseLeave={() => {
        setIsOpen(false);
        onOpenChange?.(false);
      }}
      {...props}
    >
      {isOpen &&
        React.Children.map(children, (child) => {
          if ((child as any).type?.name === "TooltipContent") {
            return child;
          }
        })}
      {React.Children.map(children, (child) => {
        if ((child as any).type?.name === "TooltipTrigger") {
          return child;
        }
      })}
    </div>
  );
});
Tooltip.displayName = "Tooltip";

const TooltipTrigger = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ ...props }, ref) => <span ref={ref} {...props} />
);
TooltipTrigger.displayName = "TooltipTrigger";

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-3 py-1.5 text-xs bg-gray-800 text-white rounded whitespace-nowrap",
      className
    )}
    {...props}
  />
));
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
