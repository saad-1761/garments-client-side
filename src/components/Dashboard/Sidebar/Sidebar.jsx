// import useAuth from "../../../hooks/useAuth";
// import useRole from "../../../hooks/useRole";
// import LoadingSpinner from "../../Shared/LoadingSpinner";
// import { GrLogout } from "react-icons/gr";
// import { FcSettings } from "react-icons/fc";
// import MenuItem from "./Menu/MenuItem";
// import AdminMenu from "./Menu/AdminMenu";
// import SellerMenu from "./Menu/ManagerMenu";
// import CustomerMenu from "./Menu/CustomerMenu";

// const Sidebar = ({ variant = "desktop", onNavigate }) => {
//   const { logOut } = useAuth();
//   const [role, isRoleLoading] = useRole();

//   if (isRoleLoading) return <LoadingSpinner />;

//   const handleNavigate = () => {
//     if (typeof onNavigate === "function") onNavigate();
//   };

//   return (
//     <div className="h-full flex flex-col">
//       {/* Top */}
//       <div className="px-4 py-4 border-b border-base-200">
//         <div className="flex items-center justify-between">
//           <div>
//             <p className="text-sm text-base-content/70">Dashboard</p>
//             <p className="font-semibold text-base-content capitalize">{role}</p>
//           </div>

//           {variant === "drawer" && (
//             <button
//               type="button"
//               className="btn btn-ghost btn-sm"
//               onClick={handleNavigate}
//               aria-label="Close sidebar"
//               title="Close"
//             >
//               ✕
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Middle */}
//       <div className="flex-1 overflow-y-auto px-2 py-3">
//         <nav className="space-y-1">
//           {/* Role-based */}
//           {role === "customer" && <CustomerMenu onNavigate={handleNavigate} />}
//           {role === "seller" && <SellerMenu onNavigate={handleNavigate} />}
//           {role === "admin" && <AdminMenu onNavigate={handleNavigate} />}
//         </nav>
//       </div>

//       {/* Bottom */}
//       <div className="px-2 py-3 border-t border-base-200">
//         <MenuItem
//           icon={FcSettings}
//           label="Profile"
//           address="/dashboard"
//           onClick={handleNavigate}
//         />

//         <button
//           onClick={() => {
//             logOut();
//             handleNavigate();
//           }}
//           className="flex w-full items-center gap-3 px-4 py-2 mt-2 rounded-lg text-base-content/80 hover:bg-base-200 transition-all duration-200"
//         >
//           <GrLogout className="w-5 h-5" />
//           <span className="font-medium">Logout</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

////

import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/ManagerMenu"; // keep file name if you want
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
          className="flex w-full items-center gap-3 px-4 py-2 mt-2 rounded-xl text-base-content/80 hover:bg-base-200 transition-all duration-200"
        >
          <GrLogout className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
