import { useEffect, useRef } from "react";

const ConfirmModal = ({
  isOpen,
  closeModal,
  title,
  description,
  confirmText = "Confirm",
  confirmVariant = "primary", // "primary" | "error"
  onConfirm,
  disabled = false,
}) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box bg-base-100 text-base-content">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-3 text-base-content/70">{description}</p>

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={closeModal}>
            Cancel
          </button>

          <button
            type="button"
            className={`btn ${
              confirmVariant === "error" ? "btn-error" : "btn-primary"
            }`}
            onClick={onConfirm}
            disabled={disabled}
          >
            {confirmText}
          </button>
        </div>
      </div>

      {/* backdrop */}
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default ConfirmModal;
