const badgeClass = (value, type = "status") => {
  const v = (value || "").toLowerCase();
  if (type === "payment") {
    if (v === "paid") return "badge badge-success badge-outline";
    if (v === "pending") return "badge badge-warning badge-outline";
    return "badge badge-ghost";
  }
  // orderStatus
  if (v === "approved") return "badge badge-success badge-outline";
  if (v === "rejected") return "badge badge-error badge-outline";
  return "badge badge-warning badge-outline"; // pending
};

const CustomerOrdersRow = ({ order, onView, onCancel }) => {
  const canCancel =
    (order?.orderStatus || "").toLowerCase() === "pending" &&
    (order?.paymentStatus || "").toLowerCase() === "pending";

  return (
    <tr>
      <td className="font-mono text-xs sm:text-sm">
        <span className="opacity-80">{String(order?._id).slice(-10)}</span>
      </td>

      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 rounded-xl">
              <img src={order?.image} alt={order?.productName} />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-medium text-base-content truncate">
              {order?.productName}
            </p>
            <p className="text-xs text-base-content/60 truncate">
              {order?.category}
            </p>
          </div>
        </div>
      </td>

      <td className="font-medium">{order?.quantity}</td>

      <td>
        <span className={badgeClass(order?.orderStatus, "status")}>
          {order?.orderStatus || "pending"}
        </span>
      </td>

      <td>
        <div className="flex flex-col gap-1">
          <span className={badgeClass(order?.paymentStatus, "payment")}>
            {order?.paymentStatus} ({order?.paymentMethod})
          </span>
          <span className="text-xs text-base-content/60">
            ${order?.totalPrice}
          </span>
        </div>
      </td>

      <td className="text-right">
        <div className="flex justify-end gap-2">
          <button className="btn btn-sm btn-outline" onClick={onView}>
            View
          </button>

          {canCancel ? (
            <button
              className="btn btn-sm btn-error btn-outline"
              onClick={onCancel}
            >
              Cancel
            </button>
          ) : (
            <button className="btn btn-sm btn-ghost" disabled>
              Cancel
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default CustomerOrdersRow;
