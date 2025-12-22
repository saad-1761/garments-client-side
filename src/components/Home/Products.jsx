// import Card from "./Card";
// import Container from "../Shared/Container";
// import { useQuery } from "@tanstack/react-query";

// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";

// const Products = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["products"],
//     queryFn: async () => {
//       const result = await axiosSecure(`/products`);
//       return result.data;
//     },
//   });

//   if (isLoading) {
//     return (
//       <Container>
//         <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
//           {Array.from({ length: 12 }).map((_, i) => (
//             <ProductCardSkeleton key={i} />
//           ))}
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       {products && products.length > 0 ? (
//         <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
//           {products.map((product) => (
//             <Card key={product._id} product={product} />
//           ))}
//         </div>
//       ) : null}
//     </Container>
//   );
// };

// export default Products;

/////////////////

import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";
import Card from "./Card";

const Products = () => {
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/products");
      return res.data;
    },
  });

  return (
    <Container>
      {/* Header */}
      <div className="pt-8 sm:pt-10 flex items-end justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
            All Products
          </h1>
          <p className="text-sm text-base-content/70">
            Browse our latest items ({products?.length || 0})
          </p>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products?.length ? (
        <div className="mt-6 pb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {products.map((product) => (
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
