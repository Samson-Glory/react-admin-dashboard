import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Home,
} from "lucide-react";
import clsx from "clsx";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Products", href: "/products", icon: Package },
  { name: "Users", href: "/users", icon: Users },
  { name: "Analytics", href: "#", icon: BarChart3 },
  { name: "Settings", href: "#", icon: Settings },
  { name: "Help & Support", href: "#", icon: HelpCircle },
];

/**
 * Sidebar navigation component with collapsible states
 * @param {Object} props
 * @param {boolean} props.isOpen - Mobile sidebar open state
 * @param {boolean} props.isCollapsed - Desktop sidebar collapsed state
 * @param {Function} props.toggleSidebar - Function to toggle sidebar
 * @param {Function} props.closeSidebar - Function to close sidebar
 */
export default function Sidebar({
  isOpen,
  isCollapsed,
  toggleSidebar,
  closeSidebar,
}) {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-30 hidden h-full w-64 flex-col border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:flex",
          isCollapsed
            ? "-translate-x-full lg:translate-x-0 lg:w-20"
            : "translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Dash<span className="text-primary-500">Pro</span>
              </span>
            </div>
          )}

          {isCollapsed && (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <Home className="h-5 w-5 text-white" />
            </div>
          )}

          {/* Collapse toggle button */}
          <button
            onClick={toggleSidebar}
            className="hidden rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 lg:block"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={closeSidebar}
              className={({ isActive }) =>
                clsx(
                  "group relative flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                  isCollapsed && "justify-center"
                )
              }
            >
              <item.icon
                className={clsx(
                  "h-5 w-5 flex-shrink-0 transition-transform duration-200",
                  isCollapsed ? "" : "mr-3",
                  hoverIndex === index && "scale-110"
                )}
              />

              {!isCollapsed && (
                <span className="transition-all duration-200">{item.name}</span>
              )}

              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                  {item.name}
                  <div className="absolute -left-1 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-900"></div>
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* User profile */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div
            className={clsx(
              "flex items-center",
              isCollapsed ? "justify-center" : "space-x-3"
            )}
          >
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary-400 to-purple-500"></div>
            {!isCollapsed && (
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Demo User
                </p>
                <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                  admin@example.com
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-gray-200 bg-white transition-transform duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Mobile sidebar content */}
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-800">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </span>
            </div>
            <button
              onClick={closeSidebar}
              className="rounded-lg p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )
                }
              >
                <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
