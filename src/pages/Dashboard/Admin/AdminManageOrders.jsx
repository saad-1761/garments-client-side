import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminOrderRow from "../../../components/Dashboard/TableRows/AdminOrderRow";

const AdminManageOrders = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all"); // all | pending | approved | rejected

  const {
    data: orders = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosSecure("/all-order");
      return res.data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter((o) => {
      const statusOk =
        status === "all"
          ? true
          : (o?.orderStatus || "").toLowerCase() === status;

      if (!statusOk) return false;
      if (!q) return true;

      const id = String(o?._id || "").toLowerCase();
      const product = (o?.productName || "").toLowerCase();
      const customerName = (o?.customer?.name || "").toLowerCase();
      const customerEmail = (o?.customer?.email || "").toLowerCase();

      return (
        id.includes(q) ||
        product.includes(q) ||
        customerName.includes(q) ||
        customerEmail.includes(q)
      );
    });
  }, [orders, search, status]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              All Orders
            </h1>
            <p className="text-sm text-base-content/70">
              Search & filter orders, view full details and status history.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
            <label className="input input-bordered bg-base-100 flex items-center gap-2 w-full sm:w-80">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-70"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 21l-4.35-4.35" />
                <circle cx="11" cy="11" r="7" />
              </svg>
              <input
                className="grow"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search: order id, customer, product..."
              />
            </label>

            <select
              className="select select-bordered bg-base-100 w-full sm:w-52"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button
              className="btn btn-outline btn-primary"
              onClick={() => refetch()}
              disabled={isFetching}
              type="button"
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body py-4">
              <p className="text-sm text-base-content/70">Total</p>
              <p className="text-2xl font-semibold">{orders.length}</p>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body py-4">
              <p className="text-sm text-base-content/70">Pending</p>
              <p className="text-2xl font-semibold">
                {
                  orders.filter(
                    (o) => (o?.orderStatus || "").toLowerCase() === "pending"
                  ).length
                }
              </p>
            </div>
          </div>
          <div className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body py-4">
              <p className="text-sm text-base-content/70">Paid (online)</p>
              <p className="text-2xl font-semibold">
                {
                  orders.filter(
                    (o) => (o?.paymentStatus || "").toLowerCase() === "paid"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-base-200 text-base-content">
                  <tr>
                    <th className="whitespace-nowrap">Order ID</th>
                    <th className="whitespace-nowrap">User</th>
                    <th className="whitespace-nowrap">Product</th>
                    <th className="whitespace-nowrap">Quantity</th>
                    <th className="whitespace-nowrap">Status</th>
                    <th className="whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="py-10 text-center text-base-content/70">
                          No orders found.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((order) => (
                      <AdminOrderRow key={order?._id} order={order} />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-base-300 text-sm text-base-content/70 flex items-center justify-between">
              <span>Showing: {filtered.length}</span>
              <span className="hidden sm:inline">Filter: {status}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminManageOrders;
