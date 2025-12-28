import { forwardRef } from "react";
import clsx from "clsx";

/**
 * Card component with hover effects and dark mode support
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.padding - Padding size (sm, md, lg, none)
 */
const Card = forwardRef(
  ({ children, className, padding = "md", ...props }, ref) => {
    const paddingClasses = {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
      none: "p-0",
    };

    return (
      <div
        ref={ref}
        className={clsx("card", paddingClasses[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;
