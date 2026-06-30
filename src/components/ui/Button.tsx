import React from "react";

import { Loader2, Check } from "lucide-react";

export type ButtonProps<E extends React.ElementType = "button"> = {
  variant?: "primary" | "secondary" | "ghost";
  as?: E;
  isLoading?: boolean;
  isSuccess?: boolean;
} & React.ComponentPropsWithoutRef<E>;

export function Button<E extends React.ElementType = "button">({
  variant = "primary",
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
    "inline-flex items-center justify-center gap-2 rounded-soft px-4 py-2 text-sm font-medium transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-70 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-accent text-[#0F1420] hover:bg-accent-hover",
    secondary: "bg-bg-card border border-border-hairline text-text hover:bg-border-hairline",
    ghost: "bg-transparent text-text hover:bg-bg-card",
    success: "bg-green-500 text-white hover:bg-green-600",
  };

  const currentVariant = isSuccess ? "success" : variant;
  const classes = `${baseStyles} ${variants[currentVariant]} ${className}`;

  return (
    <Component className={classes} disabled={disabled || isLoading || isSuccess} {...props}>
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {isSuccess && <Check className="w-4 h-4 animate-in zoom-in" />}
      {(!isLoading || isSuccess) && children}
    </Component>
  );
}
