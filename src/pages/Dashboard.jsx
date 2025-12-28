import { useState, useEffect } from "react";
import {
  DollarSign,
  Users,
  Package,
  TrendingUp,
  Activity,
  ShoppingCart,
  CreditCard,
  Download,
} from "lucide-react";
import StatCard from "../components/StatCard";
import Card from "../components/Card";
import Button from "../components/Button";
import { getDashboardStats, getRecentActivity } from "../services/mockData";

export default function Dashboard() {
  const [stats, setStats] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setStats(getDashboardStats());
      setActivity(getRecentActivity());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button>Generate Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$45,231.89"
          description="vs last month"
          change={20.1}
          positive={true}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="New Customers"
          value="2,350"
          description="vs last month"
          change={180.1}
          positive={true}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Products Sold"
          value="12,234"
          description="vs last month"
          change={-19}
          positive={false}
          icon={Package}
          trend="down"
        />
        <StatCard
          title="Active Users"
          value="573"
          description="vs last month"
          change={12.5}
          positive={true}
          icon={Activity}
          trend="up"
        />
      </div>

      {/* Charts & Tables Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {activity.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                    {item.type === "order" && (
                      <ShoppingCart className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                    )}
                    {item.type === "payment" && (
                      <CreditCard className="h-5 w-5 text-success-600 dark:text-success-400" />
                    )}
                    {item.type === "user" && (
                      <Users className="h-5 w-5 text-warning-600 dark:text-warning-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Stats */}
        <Card>
          <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
            Performance Metrics
          </h2>
          <div className="space-y-6">
            {[
              {
                label: "Conversion Rate",
                value: "3.2%",
                change: "+0.5%",
                positive: true,
              },
              {
                label: "Avg. Order Value",
                value: "$128.45",
                change: "+$12.30",
                positive: true,
              },
              {
                label: "Customer Satisfaction",
                value: "94%",
                change: "+2%",
                positive: true,
              },
              {
                label: "Churn Rate",
                value: "2.1%",
                change: "-0.3%",
                positive: true,
              },
            ].map((metric, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className={`h-full rounded-full ${
                      metric.positive ? "bg-success-500" : "bg-danger-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        Math.abs(parseFloat(metric.value)) * 10,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    Previous period
                  </span>
                  <span
                    className={`font-medium ${
                      metric.positive
                        ? "text-success-600 dark:text-success-400"
                        : "text-danger-600 dark:text-danger-400"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <Card className="text-center">
          <TrendingUp className="mx-auto mb-3 h-8 w-8 text-primary-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            98.5%
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Uptime</p>
        </Card>
        <Card className="text-center">
          <Users className="mx-auto mb-3 h-8 w-8 text-success-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            4,892
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Users
          </p>
        </Card>
        <Card className="text-center">
          <Package className="mx-auto mb-3 h-8 w-8 text-warning-500" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            1,247
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Products
          </p>
        </Card>
      </div>
    </div>
  );
}
