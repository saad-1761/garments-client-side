import { useMemo, useState } from "react";
import OrderDetailsModal from "../../Modal/OrderDetailsModal";

const statusBadge = (statusRaw) => {
  const s = (statusRaw || "").toLowerCase();
  if (s === "approved") return "badge badge-success";
  if (s === "rejected") return "badge badge-error";
  return "badge badge-warning"; // pending/default
};

const shortId = (id) => {
  const str = String(id || "");
  if (!str) return "—";
  return str.length > 10 ? `${str.slice(0, 6)}...${str.slice(-4)}` : str;
};

const money = (n) => {
  const num = Number(n || 0);
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(num);
};

const AdminOrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  const userLabel = useMemo(() => {
    const name = order?.customer?.name || "Customer";
    const email = order?.customer?.email || "";
    return email ? `${name} (${email})` : name;
  }, [order]);

  return (
    <>
      <tr className="align-middle">
        <td className="font-mono text-sm">
          <span className="tooltip" data-tip={String(order?._id || "")}>
            {shortId(order?._id)}
          </span>
        </td>

        <td className="min-w-[220px]">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring-1 ring-base-300 bg-base-200 overflow-hidden">
                <img
                  src={order?.customer?.image}
                  alt={order?.customer?.name || "Customer"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-base-content line-clamp-1">
                {order?.customer?.name || "—"}
              </span>
              <span className="text-xs text-base-content/70 line-clamp-1">
                {order?.customer?.email || ""}
              </span>
            </div>
          </div>
        </td>

        <td className="min-w-[260px]">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 h-12 rounded-lg ring-1 ring-base-300 bg-base-200 overflow-hidden">
                <img
                  src={order?.image}
                  alt={order?.productName || "Product"}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-base-content line-clamp-1">
                {order?.productName || "—"}
              </span>
              <span className="text-xs text-base-content/70 line-clamp-1">
                {order?.category || "—"} • {money(order?.unitPrice)}
              </span>
            </div>
          </div>
        </td>

        <td className="font-semibold">{order?.quantity ?? "—"}</td>

        <td>
          <span className={statusBadge(order?.orderStatus)}>
            {(order?.orderStatus || "pending").toUpperCase()}
          </span>
        </td>

        <td className="text-right">
          <button
            className="btn btn-sm btn-primary"
            type="button"
            onClick={() => setOpen(true)}
          >
            View
          </button>
        </td>
      </tr>

      <OrderDetailsModal
        isOpen={open}
        closeModal={() => setOpen(false)}
        order={order}
        userLabel={userLabel}
      />
    </>
  );
};

export default AdminOrderRow;
