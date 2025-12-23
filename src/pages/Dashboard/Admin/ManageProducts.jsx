import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import AdminProductRow from "../../../components/Dashboard/TableRows/AdminProductRow";

const ManageProducts = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");

  const {
    data: products = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-product");
      return res.data;
    },
  });

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const sellerName = p?.seller?.name?.toLowerCase?.() || "";
      const sellerEmail = p?.seller?.email?.toLowerCase?.() || "";
      return (
        (p?.name || "").toLowerCase().includes(q) ||
        (p?.category || "").toLowerCase().includes(q) ||
        sellerName.includes(q) ||
        sellerEmail.includes(q)
      );
    });
  }, [products, search]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              All Products
            </h1>
            <p className="text-sm text-base-content/70">
              Manage product info, delete items, and choose what appears on the
              Home page.
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
                placeholder="Search by name, category, seller..."
              />
            </label>

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

        {/* Table Card */}
        <div className="mt-5 card bg-base-100 shadow-md border border-base-300">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-base-200 text-base-content">
                  <tr>
                    <th className="whitespace-nowrap">Image</th>
                    <th className="whitespace-nowrap">Product</th>
                    <th className="whitespace-nowrap">Price</th>
                    <th className="whitespace-nowrap">Category</th>
                    <th className="whitespace-nowrap">Created By</th>
                    <th className="whitespace-nowrap">Show on Home</th>
                    <th className="whitespace-nowrap text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7}>
                        <div className="py-10 text-center text-base-content/70">
                          No products found.
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((product) => (
                      <AdminProductRow
                        key={product?._id}
                        product={product}
                        refetch={refetch}
                      />
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="px-4 py-3 border-t border-base-300 text-sm text-base-content/70 flex items-center justify-between">
              <span>Total: {filtered.length}</span>
              <span className="hidden sm:inline">
                Tip: Turning on “Show on Home” will also bump the product date
                to “now” so it can appear as latest.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProducts;
