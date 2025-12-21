import { useEffect, useRef } from "react";

const CustomerOrderDetailsModal = ({ isOpen, closeModal, order }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (isOpen && !d.open) d.showModal();
    if (!isOpen && d.open) d.close();
  }, [isOpen]);

  if (!order) return null;

  const status = (order?.orderStatus || "pending").toLowerCase();
  const createdAt = order?.createdAt ? new Date(order.createdAt) : null;

  const steps = [
    { title: "Order Placed", done: true, time: createdAt?.toLocaleString() },
    { title: "Pending Review", done: status === "pending" },
    { title: "Approved", done: status === "approved" },
    { title: "Rejected", done: status === "rejected" },
  ];

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-2xl bg-base-100 text-base-content border border-base-200 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Order Details</h3>
            <p className="text-sm text-base-content/70 font-mono break-all">
              {order?._id}
            </p>
          </div>
          <button
            className="btn btn-sm btn-ghost"
            type="button"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>

        <div className="divider my-3" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl border border-base-200 bg-base-200/40">
            <p className="text-xs text-base-content/70">Product</p>
            <p className="font-semibold">{order?.productName}</p>
            <p className="text-xs text-base-content/60">{order?.category}</p>
          </div>

          <div className="p-4 rounded-2xl border border-base-200 bg-base-200/40">
            <p className="text-xs text-base-content/70">Quantity</p>
            <p className="font-semibold">{order?.quantity}</p>
            <p className="text-xs text-base-content/60">
              Unit: ${order?.unitPrice} · Total: ${order?.totalPrice}
            </p>
          </div>

          <div className="p-4 rounded-2xl border border-base-200 bg-base-200/40">
            <p className="text-xs text-base-content/70">Payment</p>
            <p className="font-semibold uppercase">
              {order?.paymentStatus} ({order?.paymentMethod})
            </p>
            {order?.transactionId && (
              <p className="text-xs text-base-content/60 font-mono break-all mt-1">
                {order.transactionId}
              </p>
            )}
          </div>

          <div className="p-4 rounded-2xl border border-base-200 bg-base-200/40">
            <p className="text-xs text-base-content/70">Status</p>
            <p className="font-semibold uppercase">{order?.orderStatus}</p>
            <p className="text-xs text-base-content/60">
              {createdAt ? createdAt.toLocaleString() : ""}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="font-semibold mb-2">Tracking Timeline</h4>
          <ul className="steps steps-vertical w-full">
            {steps.map((s, idx) => (
              <li key={idx} className={`step ${s.done ? "step-primary" : ""}`}>
                <div className="text-left">
                  <p className="font-medium">{s.title}</p>
                  {s.time ? (
                    <p className="text-xs text-base-content/60">{s.time}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="modal-action">
          <button type="button" className="btn btn-ghost" onClick={closeModal}>
            Close
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

export default CustomerOrderDetailsModal;
