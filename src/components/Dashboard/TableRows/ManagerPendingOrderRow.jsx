import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";

const ManagerPendingOrderRow = ({ order, refetch, onView }) => {
  const axiosSecure = useAxiosSecure();
  const [rejectOpen, setRejectOpen] = useState(false);

  const approve = useMutation({
    mutationFn: async () =>
      axiosSecure.patch(`/manager/orders/${order._id}/approve`),
    onSuccess: async () => {
      toast.success("Order approved");
      await refetch?.();
    },
    onError: (e) => toast.error(e?.response?.data?.message || "Approve failed"),
  });

  const reject = useMutation({
    mutationFn: async () =>
      axiosSecure.patch(`/manager/orders/${order._id}/reject`),
    onSuccess: async () => {
      toast.success("Order rejected");
      await refetch?.();
      setRejectOpen(false);
    },
    onError: (e) => toast.error(e?.response?.data?.message || "Reject failed"),
  });

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

      <td className="text-sm text-base-content/70">
        {order?.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
      </td>

      <td className="text-right">
        <div className="flex justify-end gap-2">
          <button className="btn btn-sm btn-outline" onClick={onView}>
            View
          </button>

          <button
            className="btn btn-sm btn-primary"
            disabled={approve.isPending}
            onClick={() => approve.mutate()}
          >
            {approve.isPending ? "Approving..." : "Approve"}
          </button>

          <button
            className="btn btn-sm btn-error btn-outline"
            onClick={() => setRejectOpen(true)}
          >
            Reject
          </button>
        </div>

        <DeleteModal
          isOpen={rejectOpen}
          closeModal={() => setRejectOpen(false)}
          title="Reject Order?"
          message="This will mark the order as rejected."
          confirmText="Yes, Reject"
          cancelText="No"
          isLoading={reject.isPending}
          onConfirm={() => reject.mutate()}
        />
      </td>
    </tr>
  );
};

export default ManagerPendingOrderRow;
