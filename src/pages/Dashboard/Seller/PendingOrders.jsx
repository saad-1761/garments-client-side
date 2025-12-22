import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManagerPendingOrderRow from "../../../components/Dashboard/TableRows/ManagerPendingOrderRow";
import CustomerOrderDetailsModal from "../../../components/Modal/CustomerOrderDetailsModal";

const PendingOrders = () => {
  const axiosSecure = useAxiosSecure();
  const [viewOrder, setViewOrder] = useState(null);

  const {
    data: orders = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["manager-orders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/orders?status=pending");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 py-6">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              Pending Orders
            </h1>
            <p className="text-sm text-base-content/70">
              Pending: <span className="font-semibold">{orders.length}</span>
            </p>
          </div>
          <button
            className="btn btn-outline btn-primary"
            onClick={() => refetch()}
          >
            Refresh
          </button>
        </div>

        <div className="mt-5 card bg-base-100/80 backdrop-blur border border-base-200 shadow-sm">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-base-content/70">
                    <th>Order ID</th>
                    <th>User</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Order Date</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <ManagerPendingOrderRow
                      key={o._id}
                      order={o}
                      refetch={refetch}
                      onView={() => setViewOrder(o)}
                    />
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6}>
                        <div className="py-10 text-center text-base-content/60">
                          No pending orders.
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <CustomerOrderDetailsModal
        isOpen={!!viewOrder}
        closeModal={() => setViewOrder(null)}
        order={viewOrder}
      />
    </section>
  );
};

export default PendingOrders;
