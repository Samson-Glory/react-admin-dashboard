import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import Card from "./Card";
import clsx from "clsx";

/**
 * Statistics card component for displaying metrics with trends
 * @param {Object} props
 * @param {string} props.title - Card title
 * @param {string|number} props.value - Main value to display
 * @param {string} props.description - Additional description
 * @param {number} props.change - Percentage change
 * @param {boolean} props.positive - Whether change is positive
 * @param {string} props.icon - Icon component
 * @param {string} props.trend - Trend direction (up/down)
 */
export default function StatCard({
  title,
  value,
  description,
  change,
  positive = true,
  icon: Icon,
  trend = "up",
  className,
}) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = positive
    ? "text-success-600 dark:text-success-400"
    : "text-danger-600 dark:text-danger-400";
  const bgColor = positive
    ? "bg-success-50 dark:bg-success-900/20"
    : "bg-danger-50 dark:bg-danger-900/20";

  return (
    <Card
      className={clsx(
        "group hover:scale-[1.02] transition-transform duration-300",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>

          {change !== undefined && (
            <div className="flex items-center gap-1">
              <TrendIcon className={`h-4 w-4 ${trendColor}`} />
              <span className={`text-sm font-medium ${trendColor}`}>
                {positive ? "+" : ""}
                {change}%
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {description}
              </span>
            </div>
          )}
        </div>

        {Icon && (
          <div
            className={clsx(
              "rounded-lg p-3 transition-colors group-hover:scale-110",
              bgColor
            )}
          >
            <Icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </div>
        )}
      </div>
    </Card>
  );
}
