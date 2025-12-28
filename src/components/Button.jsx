import { forwardRef } from "react";
import clsx from "clsx";
import { Loader2 } from "lucide-react";

/**
 * Button component with multiple variants and loading state
 * @param {Object} props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button style variant
 * @param {string} props.size - Button size
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.fullWidth - Full width button
 */
const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: "btn-primary",
      secondary: "btn-secondary",
      danger: "btn-danger",
      ghost:
        "btn border-0 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-xs",
      md: "px-4 py-2.5 text-sm",
      lg: "px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={clsx(
          "btn",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
