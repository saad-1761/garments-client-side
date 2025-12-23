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
