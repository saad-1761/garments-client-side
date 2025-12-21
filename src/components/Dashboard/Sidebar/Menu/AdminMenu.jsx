// import { FaUserCog, FaUserTag } from "react-icons/fa";
// import MenuItem from "./MenuItem";
// import { MdProductionQuantityLimits } from "react-icons/md";
// import { AiOutlineProduct } from "react-icons/ai";

// const AdminMenu = () => {
//   return (
//     <>
//       <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
//       <MenuItem
//         icon={FaUserTag}
//         label="Seller Requests"
//         address="seller-requests"
//       />
//       <MenuItem
//         icon={AiOutlineProduct}
//         label="All Products"
//         address="all-products"
//       />
//       <MenuItem
//         icon={MdProductionQuantityLimits}
//         label="All Orders"
//         address="all-orders"
//       />
//     </>
//   );
// };

// export default AdminMenu;

/////////////

import { FaUserCog, FaUserTag } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import MenuItem from "./MenuItem";

const AdminMenu = ({ onNavigate }) => {
  return (
    <>
      <MenuItem
        icon={FaUserCog}
        label="Manage Users"
        address="manage-users"
        onClick={onNavigate}
      />
      <MenuItem
        icon={FaUserTag}
        label="Seller Requests"
        address="seller-requests"
        onClick={onNavigate}
      />
      <MenuItem
        icon={AiOutlineProduct}
        label="All Products"
        address="all-products"
        onClick={onNavigate}
      />
      <MenuItem
        icon={MdProductionQuantityLimits}
        label="All Orders"
        address="all-orders"
        onClick={onNavigate}
      />
    </>
  );
};

export default AdminMenu;
