import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
import Card from "./Card";
import { useEffect, useMemo, useState } from "react";

const PER_PAGE = 6;

const buildPages = (current, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages = [1];
  const left = Math.max(2, current - 1);
  const right = Math.min(total - 1, current + 1);

  if (left > 2) pages.push("...");

  for (let i = left; i <= right; i++) pages.push(i);

  if (right < total - 1) pages.push("...");

  pages.push(total);
  return pages;
};

const Products = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [page, setPage] = useState(1);

  // ✅ debounce search
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  // ✅ reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, activeCategory]);

  // ✅ categories (array)
  const {
    data: categories = [],
    isLoading: catLoading,
    isError: catError,
  } = useQuery({
    queryKey: ["product-categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products/categories");
      return Array.isArray(res.data) ? res.data.filter(Boolean) : [];
    },
    retry: 1,
  });

  // ✅ paginated products (object)
  const { data, isLoading, isFetching, isFetched } = useQuery({
    queryKey: ["products", page, PER_PAGE, debouncedSearch, activeCategory],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", String(PER_PAGE));
      if (debouncedSearch) params.set("search", debouncedSearch);
      if (activeCategory) params.set("category", activeCategory);

      const res = await axiosSecure.get(`/products?${params.toString()}`);
      return res.data; // { products, total, page, limit, totalPages }
    },
    keepPreviousData: true,
  });

  const products = Array.isArray(data?.products) ? data.products : [];
  const total = Number(data?.total || 0);
  const totalPages = Math.max(Number(data?.totalPages || 1), 1);

  // ✅ FIX: clamp only after we have fetched data
  useEffect(() => {
    if (!isFetched) return;
    if (page > totalPages) setPage(totalPages);
    if (page < 1) setPage(1);
  }, [isFetched, page, totalPages]);

  // ✅ Scroll top when pagination/filters actually change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, activeCategory, debouncedSearch]);

  const pages = useMemo(() => buildPages(page, totalPages), [page, totalPages]);

  const showingFrom = total === 0 ? 0 : (page - 1) * PER_PAGE + 1;
  const showingTo = Math.min(page * PER_PAGE, total);

  const loading = isLoading || catLoading;

  return (
    <Container>
      {/* Header */}
      <div className="pt-8 sm:pt-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              All Products
            </h1>

            <p className="text-sm text-base-content/70">
              {isFetching ? (
                <span className="inline-flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs" />
                  Updating...
                </span>
              ) : (
                <>
                  Showing <span className="font-semibold">{showingFrom}</span>–
                  <span className="font-semibold">{showingTo}</span> of{" "}
                  <span className="font-semibold">{total}</span>
                </>
              )}
            </p>
          </div>

          {/* Search */}
          <div className="w-full sm:w-80">
            <label className="input input-bordered flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 opacity-60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Search by product name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {!!search && (
                <button
                  type="button"
                  className="btn btn-ghost btn-xs"
                  onClick={() => setSearch("")}
                >
                  ✕
                </button>
              )}
            </label>
          </div>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveCategory("")}
            className={[
              "btn btn-sm rounded-full",
              !activeCategory ? "btn-primary" : "btn-outline btn-primary",
            ].join(" ")}
          >
            All
          </button>

          {!catLoading &&
            !catError &&
            categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() =>
                    setActiveCategory((prev) => (prev === cat ? "" : cat))
                  }
                  className={[
                    "btn btn-sm rounded-full",
                    isActive ? "btn-primary" : "btn-outline btn-primary",
                  ].join(" ")}
                >
                  {cat}
                </button>
              );
            })}
        </div>

        {/* Active filter chips */}
        {(activeCategory || debouncedSearch) && (
          <div className="flex flex-wrap items-center gap-2">
            {activeCategory && (
              <span className="badge badge-primary badge-outline">
                Category: {activeCategory}
              </span>
            )}
            {debouncedSearch && (
              <span className="badge badge-ghost">
                Search: “{debouncedSearch}”
              </span>
            )}

            <button
              type="button"
              className="btn btn-xs btn-ghost"
              onClick={() => {
                setActiveCategory("");
                setSearch("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length ? (
        <>
          <div className="mt-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {products.map((product) => (
              <Card key={product?._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="pb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-base-content/70">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>

            <div className="join">
              <button
                className="btn btn-sm join-item"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Prev
              </button>

              {pages.map((p, idx) =>
                p === "..." ? (
                  <button
                    key={`dots-${idx}`}
                    className="btn btn-sm join-item btn-ghost cursor-default"
                    disabled
                  >
                    ...
                  </button>
                ) : (
                  <button
                    key={p}
                    className={[
                      "btn btn-sm join-item",
                      p === page ? "btn-primary" : "btn-ghost",
                    ].join(" ")}
                    disabled={isFetching}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                className="btn btn-sm join-item"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next →
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-10 mb-16 text-center text-base-content/60">
          No products found.
        </div>
      )}
    </Container>
  );
};

export default Products;
