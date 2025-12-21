import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <div className="relative min-h-screen md:grid grid-cols-1 bg-white">
        <section>
          <Navbar />
        </section>

        <section className="flex">
          {/* Left Side: Sidebar Component */}
          <div className="relative z-20">
            <Sidebar />
          </div>

          {/* Right Side: Dashboard Dynamic Content */}
          <div className="flex-1  md:ml-64">
            <div className="p-5">
              {/* Outlet for dynamic contents */}
              <Outlet />
            </div>
          </div>
        </section>
        <section></section>
      </div>
    </>
  );
};

export default DashboardLayout;
