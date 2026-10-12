import React from "react";
import { Loader2, Check } from "lucide-react";

export type ButtonVariant = "primary" | "secondary" | "aws" | "outline" | "ghost" | "success";
export type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps<E extends React.ElementType = "button"> = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  as?: E;
  isLoading?: boolean;
  isSuccess?: boolean;
} & React.ComponentPropsWithoutRef<E>;

export function Button<E extends React.ElementType = "button">({
  variant = "primary",
  size = "md",
  as,
  className = "",
  isLoading,
  isSuccess,
  children,
  disabled,
  ...props
}: ButtonProps<E>) {
  const Component = as || "button";

  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-wider select-none transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-lowest disabled:opacity-60 disabled:cursor-not-allowed";

  const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-3 py-1.5 text-[11px] rounded-lg",
    md: "px-4 py-2.5 text-xs rounded-xl",
    lg: "px-6 py-3.5 text-sm rounded-xl",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "btn-3d-primary text-white",
    secondary: "btn-3d-secondary text-on-background",
    aws: "btn-3d-aws text-black",
    outline: "border border-outline bg-transparent hover:bg-surface-low text-on-background rounded-xl",
    ghost: "bg-transparent hover:bg-surface-low text-on-surface-variant hover:text-on-background rounded-xl",
    success: "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 rounded-xl",
  };

  const currentVariant: ButtonVariant = isSuccess ? "success" : variant;
  const classes = `${baseStyles} ${sizeStyles[size]} ${variantStyles[currentVariant]} ${className}`;

  return (
    <Component className={classes} disabled={disabled || isLoading || isSuccess} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
      {isSuccess && <Check className="w-4 h-4 animate-in zoom-in shrink-0" />}
      {(!isLoading || isSuccess) && children}
    </Component>
  );
}
