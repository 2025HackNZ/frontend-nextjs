import React from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "filter";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  isLoading = false,
  onClick,
  className,
  ...props
}: ButtonProps) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    primary:
      "px-6 py-2.5 bg-amber-500 text-white rounded-full hover:bg-amber-600 focus-visible:ring-amber-500",
    secondary:
      "px-6 py-2.5 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 focus-visible:ring-gray-500",
    outline:
      "border border-neutral-200 rounded-full text-neutral-900 bg-white hover:bg-neutral-100 focus-visible:ring-neutral-500",
    ghost: "hover:bg-gray-100 focus-visible:ring-gray-500 ",
    destructive:
      "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    filter: "px-4 py-1.5 border border-neutral-200 rounded-lg bg-white hover:bg-white text-neutral-900 shadow-sm focus-visible:ring-neutral-500"
  };

  const sizes = {
    sm: "h-8 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className || ""}
      `}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
