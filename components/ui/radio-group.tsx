"use client"

import * as React from "react"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, value, onValueChange, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid gap-2", className)}
    {...props}
    role="radiogroup"
  >
    {React.Children.map(children, (child) =>
      React.cloneElement(child as React.ReactElement, {
        value: (child as any).props.value,
        checked: value === (child as any).props.value,
        onCheckedChange: () => onValueChange?.((child as any).props.value),
      })
    )}
  </div>
))
RadioGroup.displayName = "RadioGroup"

const RadioGroupItem = React.forwardRef<
  HTMLInputElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value: string;
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  }
>(({ className, value, checked, onCheckedChange, children, ...props }, ref) => (
  <label className={cn("flex items-center gap-2 cursor-pointer", className)} {...props}>
    <input
      ref={ref}
      type="radio"
      value={value}
      checked={checked}
      onChange={(e) => onCheckedChange?.(e.target.checked)}
      className="h-4 w-4 cursor-pointer"
    />
    <span>{children}</span>
  </label>
))
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
