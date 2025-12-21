import { useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ConfirmCancelOrderModal = ({ isOpen, closeModal, order, refetch }) => {
  const dialogRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  if (!order) return null;

  const canCancel =
    (order?.orderStatus || "").toLowerCase() === "pending" &&
    (order?.paymentStatus || "").toLowerCase() === "pending";

  const mutation = useMutation({
    mutationFn: async () => {
      if (!order?._id) throw new Error("Order id missing");
      const res = await axiosSecure.delete(`/orders/${order._id}`);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Order cancelled & stock restored");
      await refetch?.();
      closeModal();
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Cancel failed"
      );
    },
  });

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-lg bg-base-100 text-base-content border border-base-200 shadow-xl">
        <h3 className="font-bold text-lg">Cancel Order?</h3>
        <p className="mt-2 text-sm text-base-content/70">
          {canCancel
            ? "This will cancel your order and restore stock."
            : "This order cannot be cancelled (paid or not pending)."}
        </p>

        <div className="mt-4 p-3 rounded-2xl border border-base-200 bg-base-200/40">
          <p className="font-semibold">{order?.productName}</p>
          <p className="text-xs text-base-content/60">
            Qty: {order?.quantity} · Payment: {order?.paymentStatus} (
            {order?.paymentMethod})
          </p>
          <p className="text-xs text-base-content/60 font-mono break-all mt-1">
            Order ID: {order?._id}
          </p>
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={closeModal}>
            Close
          </button>

          <button
            type="button"
            className="btn btn-error"
            disabled={!canCancel || mutation.isPending}
            onClick={() => mutation.mutate()}
          >
            {mutation.isPending ? "Cancelling..." : "Yes, Cancel"}
          </button>
        </div>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close" onClick={closeModal}>
          close
        </button>
      </form>
    </dialog>
  );
};

export default ConfirmCancelOrderModal;
