// import { Dialog, DialogTitle, DialogPanel } from '@headlessui/react'
// import useAxiosSecure from '../../hooks/useAxiosSecure'
// import toast from 'react-hot-toast'
// const BecomeSellerModal = ({ closeModal, isOpen }) => {
//   const axiosSecure = useAxiosSecure()

//   const handleRequest = async () => {
//     try {
//       await axiosSecure.post('/become-seller')
//       toast.success('Request sent, please wait for admin approval!')
//     } catch (err) {
//       console.log(err)
//       toast.error(err?.response?.data?.message)
//     } finally {
//       closeModal()
//     }
//   }

//   return (
//     <Dialog
//       open={isOpen}
//       as='div'
//       className='relative z-10 focus:outline-none '
//       onClose={close}
//     >
//       <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
//         <div className='flex min-h-full items-center justify-center p-4'>
//           <DialogPanel
//             transition
//             className='w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl'
//           >
//             <DialogTitle
//               as='h3'
//               className='text-lg font-medium text-center leading-6 text-gray-900'
//             >
//               Become A Seller!
//             </DialogTitle>
//             <div className='mt-2'>
//               <p className='text-sm text-gray-500'>
//                 Please read all the terms & conditions before becoming a seller.
//               </p>
//             </div>
//             <hr className='mt-8 ' />
//             <div className='flex mt-2 justify-around'>
//               <button
//                 onClick={handleRequest}
//                 type='button'
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2'
//               >
//                 Continue
//               </button>
//               <button
//                 type='button'
//                 className='cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2'
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   )
// }

// export default BecomeSellerModal

////////

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaStore, FaShieldAlt, FaCheckCircle } from "react-icons/fa";

const BecomeSellerModal = ({ closeModal, isOpen }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    try {
      setLoading(true);
      await axiosSecure.post("/become-seller");
      toast.success("Request sent, please wait for admin approval!");
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={loading ? () => {} : closeModal}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="
              w-full max-w-lg rounded-2xl
              bg-base-100 text-base-content
              border border-base-200
              shadow-2xl
              overflow-hidden
              transition duration-300 ease-out
              data-[closed]:scale-95 data-[closed]:opacity-0
            "
          >
            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-base-200 bg-base-200/40">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <FaStore className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <DialogTitle className="text-lg sm:text-xl font-semibold">
                    Become a Seller
                  </DialogTitle>
                  <p className="text-sm text-base-content/70">
                    Send a request for admin approval
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-4">
              <p className="text-sm text-base-content/70 leading-relaxed">
                Before becoming a seller, please make sure you understand our
                marketplace rules and quality standards. Your request will be
                reviewed by the admin team.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-2xl border border-base-200 bg-base-200/30 p-3">
                  <div className="flex items-center gap-2">
                    <FaShieldAlt className="text-primary" />
                    <p className="text-sm font-medium">Safe & Verified</p>
                  </div>
                  <p className="mt-1 text-xs text-base-content/60">
                    Admin approval required
                  </p>
                </div>

                <div className="rounded-2xl border border-base-200 bg-base-200/30 p-3">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    <p className="text-sm font-medium">Quality Products</p>
                  </div>
                  <p className="mt-1 text-xs text-base-content/60">
                    Maintain accurate stock
                  </p>
                </div>

                <div className="rounded-2xl border border-base-200 bg-base-200/30 p-3">
                  <div className="flex items-center gap-2">
                    <FaCheckCircle className="text-primary" />
                    <p className="text-sm font-medium">Fast Updates</p>
                  </div>
                  <p className="mt-1 text-xs text-base-content/60">
                    Keep orders updated
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-200/30 p-4">
                <p className="text-sm font-semibold">Terms (short)</p>
                <ul className="mt-2 text-xs text-base-content/70 list-disc list-inside space-y-1">
                  <li>No counterfeit or prohibited items.</li>
                  <li>Accurate product info & images.</li>
                  <li>Respect delivery timelines and customer support.</li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-5 sm:p-6 border-t border-base-200 flex flex-col sm:flex-row gap-3 justify-end">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeModal}
                disabled={loading}
              >
                Cancel
              </button>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleRequest}
                disabled={loading}
                className="btn btn-primary"
              >
                {loading ? "Sending..." : "Continue"}
              </motion.button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default BecomeSellerModal;
