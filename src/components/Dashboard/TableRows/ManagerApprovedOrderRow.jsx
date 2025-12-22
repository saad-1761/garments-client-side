const ManagerApprovedOrderRow = ({ order, onAddTracking, onViewTracking }) => {
  const approvedAt = order?.approvedAt
    ? new Date(order.approvedAt).toLocaleString()
    : "";

  return (
    <tr>
      <td className="font-mono text-xs break-all">{order?._id}</td>

      <td>
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-9 h-9 rounded-full ring-1 ring-base-300 overflow-hidden">
              <img src={order?.customer?.image} alt={order?.customer?.name} />
            </div>
          </div>
          <div>
            <p className="font-semibold">{order?.customer?.name}</p>
            <p className="text-xs text-base-content/60">
              {order?.customer?.email}
            </p>
          </div>
        </div>
      </td>

      <td>
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-9 h-9 rounded-xl ring-1 ring-base-300 overflow-hidden">
              <img src={order?.image} alt={order?.productName} />
            </div>
          </div>
          <p className="font-semibold">{order?.productName}</p>
        </div>
      </td>

      <td className="font-semibold">{order?.quantity}</td>

      <td className="text-sm text-base-content/70">{approvedAt}</td>

      <td className="text-right">
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={onAddTracking}
          >
            Add Tracking
          </button>
          <button className="btn btn-sm btn-outline" onClick={onViewTracking}>
            View Tracking
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ManagerApprovedOrderRow;
