import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import ProductCardSkeleton from "../Skeleton/ProductCardSkeleton";

const LatestProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { data: latestProducts = [], isLoading } = useQuery({
    queryKey: ["latest-products"],
    queryFn: async () => {
      const result = await axiosSecure(`/latest-products`);
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <Container>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div>
        <h2 className="text-3xl font-semibold text-center mb-6 text-blue-900 dark:text-blue-100">
          Latest Products
        </h2>
        <p className="text-center text-gray-600">
          Discover our newest arrivals and stay ahead with the latest trends in
          fashion.
        </p>
      </div>
      {latestProducts && latestProducts.length > 0 ? (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
          className="pt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestProducts.map((latestProduct) => (
            <Card key={latestProduct._id} product={latestProduct} />
          ))}
        </motion.div>
      ) : null}
    </Container>
  );
};

export default LatestProducts;
