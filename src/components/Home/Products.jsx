// import Container from "../Shared/Container";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
// import Card from "./Card";

// const Products = () => {
//   const axiosSecure = useAxiosSecure();

//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/products");
//       return res.data;
//     },
//   });

//   return (
//     <Container>
//       {/* Header */}
//       <div className="pt-8 sm:pt-10 flex items-end justify-between gap-3">
//         <div>
//           <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
//             All Products
//           </h1>
//           <p className="text-sm text-base-content/70">
//             Browse our latest items ({products?.length || 0})
//           </p>
//         </div>
//       </div>

//       {/* Grid */}
//       {isLoading ? (
//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//           {Array.from({ length: 9 }).map((_, i) => (
//             <ProductCardSkeleton key={i} />
//           ))}
//         </div>
//       ) : products?.length ? (
//         <div className="mt-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
//           {products.map((product) => (
//             <Card key={product?._id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <div className="mt-10 mb-16 text-center text-base-content/60">
//           No products found.
//         </div>
//       )}
//     </Container>
//   );
// };

// export default Products;

import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
import Card from "./Card";
import { useMemo, useState } from "react";

const Products = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  /* ----------------------------------------
     Build unique categories dynamically
  ---------------------------------------- */
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p?.category).filter(Boolean));
    return Array.from(set);
  }, [products]);

  /* ----------------------------------------
     Filter products by search + category
  ---------------------------------------- */
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product?.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = activeCategory
        ? product?.category === activeCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

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
              Browse our latest items ({filteredProducts.length})
            </p>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full sm:w-64"
          />
        </div>

        {/* Category Buttons */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() =>
                    setActiveCategory((prev) =>
                      prev === category ? null : category
                    )
                  }
                  className={`btn btn-sm ${
                    isActive ? "btn-primary" : "btn-outline btn-primary"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredProducts.length ? (
        <div className="mt-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product?._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-10 mb-16 text-center text-base-content/60">
          No products found.
        </div>
      )}
    </Container>
  );
};

export default Products;
