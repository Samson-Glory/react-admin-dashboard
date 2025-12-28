import { Loader2 } from "lucide-react";

/**
 * Loading spinner component with customizable size and text
 * @param {Object} props
 * @param {string} props.size - Size variant (sm, md, lg)
 * @param {string} props.text - Loading text to display
 * @param {boolean} props.fullScreen - Full screen overlay
 */
export default function Loader({ size = "md", text, fullScreen = false }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  const content = (
    <div className="flex flex-col items-center justify-center">
      <Loader2
        className={`${sizeClasses[size]} animate-spin text-primary-500`}
      />
      {text && (
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm dark:bg-gray-950/80">
        {content}
      </div>
    );
  }

  return content;
}
