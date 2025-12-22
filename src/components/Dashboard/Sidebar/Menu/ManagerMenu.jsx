// import { BsFillHouseAddFill } from "react-icons/bs";
// import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
// import MenuItem from "./MenuItem";
// const SellerMenu = () => {
//   return (
//     <>
//       <MenuItem
//         icon={BsFillHouseAddFill}
//         label="Add Product"
//         address="add-product"
//       />
//       <MenuItem icon={MdHomeWork} label="My Inventory" address="my-inventory" />
//       <MenuItem
//         icon={MdOutlineManageHistory}
//         label="Manage Orders"
//         address="manage-orders"
//       />
//     </>
//   );
// };

// export default SellerMenu;

/////////////

// import { BsFillHouseAddFill } from "react-icons/bs";
// import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
// import MenuItem from "./MenuItem";

// const SellerMenu = ({ onNavigate }) => {
//   return (
//     <>
//       <MenuItem
//         icon={BsFillHouseAddFill}
//         label="Add Product"
//         address="add-product"
//         onClick={onNavigate}
//       />
//       <MenuItem
//         icon={MdHomeWork}
//         label="My Inventory"
//         address="my-inventory"
//         onClick={onNavigate}
//       />
//       <MenuItem
//         icon={MdOutlineManageHistory}
//         label="Manage Orders"
//         address="manage-orders"
//         onClick={onNavigate}
//       />
//     </>
//   );
// };

// export default SellerMenu;

///////

import { BsFillHouseAddFill } from "react-icons/bs";
import { MdOutlineManageHistory } from "react-icons/md";
import { AiOutlineProduct } from "react-icons/ai";
import { MdPendingActions, MdFactCheck } from "react-icons/md";
import MenuItem from "./MenuItem";

const ManagerMenu = ({ onNavigate }) => {
  return (
    <>
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
