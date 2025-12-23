import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on ESC (nice UX)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Top Navbar */}
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Main area */}
      <div className="pt-16">
        {/* Desktop layout (lg+) */}
        <div className="hidden lg:grid grid-cols-[260px_1fr] min-h-[calc(100vh-64px)]">
          {/* Sidebar */}
          <aside className="border-r border-base-200 bg-base-100/70 backdrop-blur">
            <Sidebar variant="desktop" onNavigate={() => {}} />
          </aside>

          {/* Content + Footer in SAME column */}
          <div className="flex flex-col min-h-[calc(100vh-64px)]">
            <main className="flex-1 p-4 sm:p-6">
              <div className="animate-[fadeIn_.25s_ease-out]">
                <Outlet />
              </div>
            </main>
            <Footer />
          </div>
        </div>

        {/* Mobile/Tablet layout (<= md) */}
        <div className="lg:hidden min-h-[calc(100vh-64px)] flex flex-col">
          <main className="flex-1 p-4 sm:p-6">
            <div className="animate-[fadeIn_.25s_ease-out]">
              <Outlet />
            </div>
          </main>
          <Footer />

          {/* Drawer Sidebar */}
          <div
            className={`fixed inset-0 z-50 ${
              sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          >
            {/* Backdrop */}
            <div
              onClick={() => setSidebarOpen(false)}
              className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
                sidebarOpen ? "opacity-100" : "opacity-0"
              }`}
            />

            {/* Panel */}
            <div
              className={`absolute left-0 top-0 h-full w-[280px] bg-base-100 border-r border-base-200 shadow-xl transform transition-transform duration-300 ease-out
              ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
              <Sidebar
                variant="drawer"
                onNavigate={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Small animation keyframes (Tailwind arbitrary) */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default DashboardLayout;
