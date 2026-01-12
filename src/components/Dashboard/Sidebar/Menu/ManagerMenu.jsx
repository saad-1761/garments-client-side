// import { BsFillHouseAddFill } from "react-icons/bs";
// import { AiOutlineProduct } from "react-icons/ai";
// import { MdPendingActions, MdFactCheck } from "react-icons/md";
// import MenuItem from "./MenuItem";

// const ManagerMenu = ({ onNavigate }) => {
//   return (
//     <>
//       <MenuItem
//         onClick={onNavigate}
//         icon={BsFillHouseAddFill}
//         label="Add Product"
//         address="add-product"
//       />
//       <MenuItem
//         onClick={onNavigate}
//         icon={AiOutlineProduct}
//         label="Manage Products"
//         address="manage-products"
//       />
//       <MenuItem
//         onClick={onNavigate}
//         icon={MdPendingActions}
//         label="Pending Orders"
//         address="pending-orders"
//       />
//       <MenuItem
//         onClick={onNavigate}
//         icon={MdFactCheck}
//         label="Approved Orders"
//         address="approved-orders"
//       />
//     </>
//   );
// };

// export default ManagerMenu;

///

import { BsFillHouseAddFill } from "react-icons/bs";
import { AiOutlineProduct } from "react-icons/ai";
import { MdPendingActions, MdFactCheck } from "react-icons/md";
import { IoStatsChartOutline } from "react-icons/io5";
import MenuItem from "./MenuItem";

const ManagerMenu = ({ onNavigate }) => {
  return (
    <>
      <MenuItem
        onClick={onNavigate}
        icon={IoStatsChartOutline}
        label="Statistics"
        address="statistics"
      />

      <MenuItem
        onClick={onNavigate}
        icon={BsFillHouseAddFill}
        label="Add Product"
        address="add-product"
      />
      <MenuItem
        onClick={onNavigate}
        icon={AiOutlineProduct}
        label="Manage Products"
        address="manage-products"
      />
      <MenuItem
        onClick={onNavigate}
        icon={MdPendingActions}
        label="Pending Orders"
        address="pending-orders"
      />
      <MenuItem
        onClick={onNavigate}
        icon={MdFactCheck}
        label="Approved Orders"
        address="approved-orders"
      />
    </>
  );
};

export default ManagerMenu;
