import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

/**
 * Main layout component that provides sidebar and topbar navigation
 * @param {Object} props
 * @param {boolean} props.isDarkMode - Current theme state
 * @param {Function} props.setIsDarkMode - Function to toggle theme
 */
export default function MainLayout({ isDarkMode, setIsDarkMode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (window.innerWidth >= 1024) {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  const closeSidebar = () => {
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
        closeSidebar={closeSidebar}
      />

      {/* Main content area */}
      <div
        className={`
          transition-all duration-300 ease-in-out
          ${isSidebarCollapsed ? "lg:pl-20" : "lg:pl-64"}
        `}
      >
        {/* Topbar */}
        <Topbar
          isSidebarCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        {/* Page content */}
        <main className="content-area">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
