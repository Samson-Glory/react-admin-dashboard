import { Bell, Menu, Moon, Search, Sun, User } from "lucide-react";
import { useState } from "react";
import Button from "./Button";
import SearchInput from "./SearchInput";

/**
 * Top navigation bar with search, notifications, and theme toggle
 * @param {Object} props
 * @param {boolean} props.isSidebarCollapsed - Sidebar collapsed state
 * @param {Function} props.toggleSidebar - Function to toggle sidebar
 * @param {boolean} props.isDarkMode - Current theme state
 * @param {Function} props.setIsDarkMode - Function to toggle theme
 */
export default function Topbar({
  isSidebarCollapsed,
  toggleSidebar,
  isDarkMode,
  setIsDarkMode,
}) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (query) => {
    console.log("Search query:", query);
    // Implement search functionality here
  };

  const notifications = [
    { id: 1, text: "New user registered", time: "5 min ago", read: false },
    { id: 2, text: "Sales target achieved", time: "1 hour ago", read: false },
    { id: 3, text: "System update available", time: "2 days ago", read: true },
  ];

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/80">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="hidden md:block">
            <SearchInput onSearch={handleSearch} />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3">
          {/* Mobile search */}
          <button className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden">
            <Search className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label={
              isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={`Notifications ${
                unreadCount > 0 ? `(${unreadCount} unread)` : ""
              }`}
            >
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger-500 text-xs font-medium text-white">
                  {unreadCount}
                </span>
              )}
            </Button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                  aria-hidden="true"
                />
                <div className="absolute right-0 top-full z-20 mt-2 w-80 origin-top-right animate-fade-in rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                  <div className="flex items-center justify-between border-b border-gray-100 px-3 py-2 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                    <span className="text-xs text-primary-600 dark:text-primary-400">
                      {unreadCount} new
                    </span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                          !notification.read
                            ? "bg-primary-50/50 dark:bg-primary-900/10"
                            : ""
                        }`}
                      >
                        <div
                          className={`mt-0.5 h-2 w-2 rounded-full ${
                            !notification.read
                              ? "bg-primary-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        />
                        <div className="flex-1 space-y-1">
                          <p className="text-sm text-gray-900 dark:text-white">
                            {notification.text}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 p-2 dark:border-gray-700">
                    <Button variant="ghost" size="sm" fullWidth>
                      View all notifications
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* User profile */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden sm:flex"
            aria-label="User menu"
          >
            <User className="mr-2 h-5 w-5" />
            <span className="hidden lg:inline">Demo User</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
