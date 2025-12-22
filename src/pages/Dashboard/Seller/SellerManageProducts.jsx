import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import ManagerProductRow from "../../../components/Dashboard/TableRows/ManagerProductRow";

const SellerManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [q, setQ] = useState("");

  const {
    data: products = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["manager-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/products");
      return res.data;
    },
  });

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter((p) => {
      return (
        (p?.name || "").toLowerCase().includes(s) ||
        (p?.category || "").toLowerCase().includes(s)
      );
    });
  }, [products, q]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              Manage Products
            </h1>
            <p className="text-sm text-base-content/70">
              Your products:{" "}
              <span className="font-semibold">{products.length}</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or category..."
              className="input input-bordered w-full sm:w-64"
            />
            <button
              className="btn btn-outline btn-primary"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </button>
          </div>
        </div>

        <div className="mt-5 card bg-base-100/80 backdrop-blur border border-base-200 shadow-sm">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-base-content/70">
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Payment Mode</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <ManagerProductRow
                      key={p._id}
                      product={p}
                      refetch={refetch}
                    />
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={5}>
                        <div className="py-10 text-center text-base-content/60">
                          No products found.
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
    </section>
  );
};

export default SellerManageProducts;
