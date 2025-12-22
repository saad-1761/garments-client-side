// import { useState } from "react";
// import { Link } from "react-router";
// import useAuth from "../../../hooks/useAuth";
// import logo from "../../../assets/images/logo-flat.png";
// // Icons
// import { GrLogout } from "react-icons/gr";
// import { FcSettings } from "react-icons/fc";
// import { AiOutlineBars } from "react-icons/ai";
// import { BsGraphUp } from "react-icons/bs";

// // User Menu
// import MenuItem from "./Menu/MenuItem";
// import AdminMenu from "./Menu/AdminMenu";
// import SellerMenu from "./Menu/SellerMenu";
// import CustomerMenu from "./Menu/CustomerMenu";
// import useRole from "../../../hooks/useRole";
// import LoadingSpinner from "../../Shared/LoadingSpinner";

// const Sidebar = () => {
//   const { logOut } = useAuth();
//   const [isActive, setActive] = useState(true);
//   const [role, isRoleLoading] = useRole();

//   // Sidebar Responsive Handler
//   const handleToggle = () => {
//     setActive(!isActive);
//   };

//   if (isRoleLoading) return <LoadingSpinner />;

//   return (
//     <>
//       {/* Small Screen Navbar, only visible till md breakpoint */}

//       <div className=" bg-white-100 text-gray-800 h-16 md:hidden">
//         <div className="relative z-30 left-20">
//           <div className=" cursor-pointer p-4 font-bold">
//             <Link to="/" className="">
//               <img
//                 src={logo}
//                 alt="logo"
//                 width="100"
//                 height="100"
//                 className="flex justify-center items-center"
//               />
//             </Link>
//           </div>

//           <button
//             onClick={handleToggle}
//             className="block mobile-menu-button p-4 focus:outline-none cursor-pointer relative z-50 -top-18 -left-5 "
//           >
//             <AiOutlineBars className="h-5 w-5" />
//           </button>
//         </div>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`sm:relative z-10 max-h-screen md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 top-20 transform ${
//           isActive && "-translate-x-full"
//         }  md:translate-x-0  transition duration-200 ease-in-out`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Top Content */}
//           <div>
//             {/* Logo */}
//             {/* <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
//               <Link to="/">
//                 <img src={logo} alt="logo" width="100" height="100" />
//               </Link>
//             </div> */}
//           </div>

//           {/* Middle Content */}
//           <div className="flex flex-col justify-between flex-1 mt-6">
//             {/*  Menu Items */}
//             <nav>
//               {/* Common Menu */}
//               {/* <MenuItem
//                 icon={BsGraphUp}
//                 label="Statistics"
//                 address="/dashboard"
//               /> */}
//               {/* Role-Based Menu */}
//               {role === "customer" && <CustomerMenu />}
//               {role === "seller" && <SellerMenu />}
//               {role === "admin" && <AdminMenu />}
//             </nav>
//           </div>

//           {/* Bottom Content */}
//           <div>
//             <hr />

//             <MenuItem icon={FcSettings} label="Profile" address="/dashboard" />
//             <button
//               onClick={logOut}
//               className="flex cursor-pointer w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
//             >
//               <GrLogout className="w-5 h-5" />

//               <span className="mx-4 font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

/////////////////////

import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/ManagerMenu";
import CustomerMenu from "./Menu/CustomerMenu";

const Sidebar = ({ variant = "desktop", onNavigate }) => {
  const { logOut } = useAuth();
  const [role, isRoleLoading] = useRole();

  if (isRoleLoading) return <LoadingSpinner />;

  const handleNavigate = () => {
    if (typeof onNavigate === "function") onNavigate();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Top */}
      <div className="px-4 py-4 border-b border-base-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-base-content/70">Dashboard</p>
            <p className="font-semibold text-base-content capitalize">{role}</p>
          </div>

          {variant === "drawer" && (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={handleNavigate}
              aria-label="Close sidebar"
              title="Close"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Middle */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <nav className="space-y-1">
          {/* Role-based */}
          {role === "customer" && <CustomerMenu onNavigate={handleNavigate} />}
          {role === "seller" && <SellerMenu onNavigate={handleNavigate} />}
          {role === "admin" && <AdminMenu onNavigate={handleNavigate} />}
        </nav>
      </div>

      {/* Bottom */}
      <div className="px-2 py-3 border-t border-base-200">
        <MenuItem
          icon={FcSettings}
          label="Profile"
          address="/dashboard"
          onClick={handleNavigate}
        />

        <button
          onClick={() => {
            logOut();
            handleNavigate();
          }}
          className="flex w-full items-center gap-3 px-4 py-2 mt-2 rounded-lg text-base-content/80 hover:bg-base-200 transition-all duration-200"
        >
          <GrLogout className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
