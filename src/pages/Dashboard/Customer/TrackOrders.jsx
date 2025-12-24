import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { MdOutlineTrackChanges } from "react-icons/md";

const TrackOrders = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: orders = [],
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["track-orders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/orders/me");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  if (isError) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          {error?.response?.data?.message || "Failed to load orders"}
        </div>
        <button className="btn btn-primary mt-4" onClick={refetch}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              Track Orders
            </h1>
            <p className="text-sm text-base-content/70">
              Track progress of your approved orders
            </p>
          </div>

          <button
            className="btn btn-outline btn-primary"
            onClick={refetch}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Orders */}
        {!orders.length ? (
          <div className="mt-6 card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body">
              <p className="text-base-content/70">
                You don’t have any orders to track yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition"
              >
                <div className="card-body">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 rounded-xl bg-base-200 overflow-hidden border border-base-300 shrink-0">
                      <img
                        src={order.image}
                        alt={order.productName}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-base-content line-clamp-1">
                        {order.productName}
                      </p>

                      <p className="text-sm text-base-content/70 mt-1">
                        Quantity Ordered:{" "}
                        <span className="font-semibold">{order.quantity}</span>
                      </p>

                      <p className="text-xs text-base-content/50 mt-1 break-all">
                        Order ID: <span className="font-mono">{order._id}</span>
                      </p>

                      <span
                        className={`mt-2 inline-block badge ${
                          order.orderStatus === "approved"
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4">
                    <Link
                      to={`/dashboard/track-order/${order._id}`}
                      className="btn btn-primary w-full"
                    >
                      <MdOutlineTrackChanges className="w-4 h-4 mr-1" />
                      Track Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrackOrders;
