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

import { BsFillHouseAddFill } from "react-icons/bs";
import { MdHomeWork, MdOutlineManageHistory } from "react-icons/md";
import MenuItem from "./MenuItem";

const SellerMenu = ({ onNavigate }) => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label="Add Product"
        address="add-product"
        onClick={onNavigate}
      />
      <MenuItem
        icon={MdHomeWork}
        label="My Inventory"
        address="my-inventory"
        onClick={onNavigate}
      />
      <MenuItem
        icon={MdOutlineManageHistory}
        label="Manage Orders"
        address="manage-orders"
        onClick={onNavigate}
      />
    </>
  );
};

export default SellerMenu;
