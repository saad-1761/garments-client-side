/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef } from "react";

const fmtDate = (iso) => {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

const money = (n) => {
  const num = Number(n || 0);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

const pill = (label, cls) => (
  <span className={`badge ${cls} badge-outline`}>{label}</span>
);

const OrderDetailsModal = ({ isOpen, closeModal, order, userLabel }) => {
  const dialogRef = useRef(null);

  // normalize possible Mongo $date shape
  const createdAt = useMemo(() => {
    const raw = order?.createdAt;
    if (!raw) return null;
    if (typeof raw === "string") return raw;
    if (raw?.$date) return raw.$date;
    return raw;
  }, [order]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) dialog.showModal();
    if (!isOpen && dialog.open) dialog.close();
  }, [isOpen]);

  const orderId = String(order?._id || "");
  const status = (order?.orderStatus || "pending").toLowerCase();
  const paymentMethod = (order?.paymentMethod || "—").toUpperCase();
  const paymentStatus = (order?.paymentStatus || "—").toUpperCase();

  return (
    <dialog ref={dialogRef} className="modal" onClose={closeModal}>
      <div className="modal-box w-11/12 max-w-4xl bg-base-100 text-base-content">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg">Order Details</h3>
            <p className="text-sm text-base-content/70 font-mono break-all">
              {orderId || "—"}
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

        {/* Summary */}
        <div className="flex flex-wrap gap-2">
          {status === "approved" && pill("APPROVED", "badge-success")}
          {status === "rejected" && pill("REJECTED", "badge-error")}
          {status === "pending" && pill("PENDING", "badge-warning")}
          {pill(`PAYMENT: ${paymentMethod}`, "badge-primary")}
          {pill(`PAY STATUS: ${paymentStatus}`, "badge-secondary")}
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Product */}
          <div className="card bg-base-100 border border-base-300 shadow-sm lg:col-span-2">
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-xl ring-1 ring-base-300 bg-base-200 overflow-hidden">
                    <img
                      src={order?.image}
                      alt={order?.productName || "Product"}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-semibold line-clamp-1">
                    {order?.productName || "—"}
                  </p>
                  <p className="text-sm text-base-content/70 line-clamp-1">
                    {order?.category || "—"} • Product ID:{" "}
                    <span className="font-mono">{order?.productId || "—"}</span>
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-base-200/60 border border-base-300">
                  <p className="text-xs text-base-content/70">Unit Price</p>
                  <p className="font-semibold">{money(order?.unitPrice)}</p>
                </div>
                <div className="p-3 rounded-xl bg-base-200/60 border border-base-300">
                  <p className="text-xs text-base-content/70">Quantity</p>
                  <p className="font-semibold">{order?.quantity ?? "—"}</p>
                </div>
                <div className="p-3 rounded-xl bg-base-200/60 border border-base-300">
                  <p className="text-xs text-base-content/70">Total</p>
                  <p className="font-semibold">{money(order?.totalPrice)}</p>
                </div>
                <div className="p-3 rounded-xl bg-base-200/60 border border-base-300">
                  <p className="text-xs text-base-content/70">Created</p>
                  <p className="font-semibold">{fmtDate(createdAt)}</p>
                </div>
              </div>

              {order?.description && (
                <div className="mt-4">
                  <p className="text-sm text-base-content/70 mb-1">
                    Description
                  </p>
                  <p className="text-sm">{order.description}</p>
                </div>
              )}
            </div>
          </div>

          {/* Right: Customer + Delivery */}
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
              <p className="font-semibold">Customer</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring-1 ring-base-300 bg-base-200 overflow-hidden">
                    <img
                      src={order?.customer?.image}
                      alt={order?.customer?.name || "Customer"}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-medium line-clamp-1">
                    {order?.customer?.name || "—"}
                  </p>
                  <p className="text-xs text-base-content/70 line-clamp-1">
                    {order?.customer?.email || "—"}
                  </p>
                </div>
              </div>

              <div className="divider my-3" />

              <p className="font-semibold">Seller</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="avatar">
                  <div className="w-12 h-12 rounded-full ring-1 ring-base-300 bg-base-200 overflow-hidden">
                    <img
                      src={order?.seller?.image}
                      alt={order?.seller?.name || "Seller"}
                      className="object-cover w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-medium line-clamp-1">
                    {order?.seller?.name || "—"}
                  </p>
                  <p className="text-xs text-base-content/70 line-clamp-1">
                    {order?.seller?.email || "—"}
                  </p>
                </div>
              </div>

              <div className="divider my-3" />

              <p className="font-semibold">Delivery</p>
              <div className="mt-2 space-y-1 text-sm">
                <p>
                  <span className="text-base-content/70">Address:</span>{" "}
                  {order?.deliveryAddress || "—"}
                </p>
                <p>
                  <span className="text-base-content/70">Phone:</span>{" "}
                  {order?.contactNumber || "—"}
                </p>
                {order?.notes && (
                  <p>
                    <span className="text-base-content/70">Notes:</span>{" "}
                    {order?.notes}
                  </p>
                )}
                {order?.transactionId && (
                  <p className="break-all">
                    <span className="text-base-content/70">Txn:</span>{" "}
                    <span className="font-mono">{order.transactionId}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tracking / History */}
        {/* <div className="mt-4 card bg-base-100 border border-base-300 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between">
              <p className="font-semibold">Tracking History</p>
              <span className="text-xs text-base-content/60">
                (Add real history from DB later)
              </span>
            </div>
            <ul className="timeline timeline-vertical lg:timeline-horizontal mt-3">
              <li>
                <div className="timeline-start text-xs opacity-70">Created</div>
                <div className="timeline-middle">●</div>
                <div className="timeline-end timeline-box bg-base-200/60 border border-base-300">
                  Order placed
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start text-xs opacity-70">Payment</div>
                <div className="timeline-middle">●</div>
                <div className="timeline-end timeline-box bg-base-200/60 border border-base-300">
                  {paymentMethod === "ONLINE"
                    ? "Online payment"
                    : "Cash on delivery"}
                </div>
                <hr />
              </li>
              <li>
                <hr />
                <div className="timeline-start text-xs opacity-70">Status</div>
                <div className="timeline-middle">●</div>
                <div className="timeline-end timeline-box bg-base-200/60 border border-base-300">
                  {status.toUpperCase()}
                </div>
              </li>
            </ul>
          </div>
        </div> */}

        <div className="modal-action">
          <button className="btn btn-ghost" type="button" onClick={closeModal}>
            Close
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

export default OrderDetailsModal;
