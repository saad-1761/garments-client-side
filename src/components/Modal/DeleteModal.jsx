// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

// const DeleteModal = ({ closeModal, isOpen }) => {
//   return (
//     <Dialog
//       open={isOpen}
//       as="div"
//       className="relative z-10 focus:outline-none "
//       onClose={closeModal}
//     >
//       <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//         <div className="flex min-h-full items-center justify-center p-4">
//           <DialogPanel
//             transition
//             className="w-full max-w-md bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0 shadow-xl rounded-2xl"
//           >
//             <DialogTitle
//               as="h3"
//               className="text-lg font-medium leading-6 text-gray-900"
//             >
//               Are you sure?
//             </DialogTitle>
//             <div className="mt-2">
//               <p className="text-sm text-gray-500">
//                 You cannot undo once it&apos;s done!
//               </p>
//             </div>
//             <hr className="mt-8 " />
//             <div className="flex mt-2 justify-around">
//               <button
//                 type="button"
//                 className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
//               >
//                 Yes
//               </button>
//               <button
//                 type="button"
//                 className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
//                 onClick={closeModal}
//               >
//                 No
//               </button>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default DeleteModal;

/////////
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

const DeleteModal = ({
  closeModal,
  isOpen,
  title = "Are you sure?",
  message = "You cannot undo once it&apos;s done!",
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  isLoading = false,
  disabled = false,
}) => {
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-50 focus:outline-none"
      onClose={isLoading ? () => {} : closeModal}
    >
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

      <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            className="w-full max-w-md rounded-2xl border border-base-200
            bg-base-100 text-base-content shadow-2xl p-6
            transition duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-lg font-semibold">
              {title}
            </DialogTitle>

            <p className="mt-2 text-sm text-base-content/70">{message}</p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={closeModal}
                disabled={isLoading}
              >
                {cancelText}
              </button>

              <button
                type="button"
                className="btn btn-error"
                onClick={onConfirm}
                disabled={disabled || isLoading}
              >
                {isLoading ? "Processing..." : confirmText}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
