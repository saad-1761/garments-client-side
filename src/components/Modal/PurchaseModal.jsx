import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { motion } from "framer-motion";

const PurchaseModal = ({ closeModal, isOpen, product }) => {
  const { user } = useAuth();
  const { _id, name, category, price, description, image, seller } =
    product || {};

  const handlePayment = async () => {
    const paymentInfo = {
      productId: _id,
      name,
      category,
      price,
      description,
      image,
      quantity: 1,
      seller,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-50"
        onClose={closeModal}
      >
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel
            className="
        w-full max-w-md
        rounded-2xl
        bg-white/90 dark:bg-slate-900/90
        backdrop-blur-xl
        border border-sky-200/40 dark:border-sky-500/20
        shadow-2xl
        p-6
        transition-all
      "
          >
            <DialogTitle className="text-lg font-semibold text-center text-slate-800 dark:text-slate-100">
              Review Before Purchase
            </DialogTitle>

            <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <p>
                <span className="font-medium">Product:</span> {name}
              </p>
              <p>
                <span className="font-medium">Category:</span> {category}
              </p>
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {user?.displayName}
              </p>
              <p className="text-lg font-semibold text-sky-700 dark:text-sky-400">
                Price: ${price}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={handlePayment}
                className="
            flex-1 rounded-lg py-2.5 text-sm font-semibold
            bg-sky-600 hover:bg-sky-700
            text-white transition
          "
              >
                Pay
              </button>

              <button
                onClick={closeModal}
                className="
            flex-1 rounded-lg py-2.5 text-sm font-semibold
            bg-slate-200 hover:bg-slate-300
            dark:bg-slate-700 dark:hover:bg-slate-600
            text-slate-800 dark:text-slate-200
            transition
          "
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </motion.div>
  );
};

export default PurchaseModal;
