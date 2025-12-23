import { BsFingerprint } from "react-icons/bs";
import { GrUserAdmin } from "react-icons/gr";
import MenuItem from "./MenuItem";
import { useState } from "react";
import BecomeSellerModal from "../../../Modal/BecomeSellerModal";

const CustomerMenu = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);

  const openSellerModal = () => {
    setIsOpen(true);
    // optional: close sidebar drawer after clicking become seller
    if (typeof onNavigate === "function") onNavigate();
  };

  return (
    <>
      <MenuItem
        icon={BsFingerprint}
        label="My Orders"
        address="my-orders"
        onClick={onNavigate}
      />

      {/* Become Seller - styled like menu item */}
      <button
        type="button"
        onClick={openSellerModal}
        className={[
          "w-full mt-2",
          "flex items-center gap-3 px-4 py-2.5 rounded-xl",
          "text-base-content/80 hover:bg-base-200 hover:text-base-content",
          "transition-all duration-200 ease-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        ].join(" ")}
      >
        <span className="grid place-items-center w-9 h-9 rounded-lg bg-base-100/60 border border-base-300">
          <GrUserAdmin className="w-5 h-5" />
        </span>
        <span className="font-medium">Become A Seller</span>
      </button>

      <BecomeSellerModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default CustomerMenu;
