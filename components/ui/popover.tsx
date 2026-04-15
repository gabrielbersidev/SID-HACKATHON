"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Popover = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(({ className, open, onOpenChange, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(open ?? false);
  return (
    <div ref={ref} className={cn("relative inline-block", className)} {...props}>
      {React.Children.map(children, (child) => {
        if ((child as any).type?.name === "PopoverTrigger") {
          return React.cloneElement(child as React.ReactElement, {
            onClick: () => {
              setIsOpen(!isOpen);
              onOpenChange?.(!isOpen);
            },
          });
        }
        if ((child as any).type?.name === "PopoverContent" && isOpen) {
          return child;
        }
        return null;
      })}
    </div>
  );
});
Popover.displayName = "Popover";

const PopoverTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ ...props }, ref) => <button ref={ref} {...props} />
);
PopoverTrigger.displayName = "PopoverTrigger";

const PopoverContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-full mt-2 z-50 w-72 rounded-md border bg-white p-4 text-foreground shadow-lg",
      className
    )}
    {...props}
  />
));
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
