import { Outlet } from "react-router-dom";
import Navbar from "../components/Shared/Navbar/Navbar";
import Footer from "../components/Shared/Footer/Footer";
import TitleManager from "../components/Shared/TitleManager";

const MainLayout = () => {
  return (
    <div>
      {/* ✅ dynamic tab title */}
      <TitleManager />

      <Navbar />
      <div className="pt-24 min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
