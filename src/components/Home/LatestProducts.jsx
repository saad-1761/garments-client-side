import Card from "./Card";
import Container from "../Shared/Container";
import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const LatestProducts = () => {
  const axiosSecure = useAxiosSecure();
  const { data: latestProducts = [], isLoading } = useQuery({
    queryKey: ["latest-products"],
    queryFn: async () => {
      const result = await axiosSecure(`/latest-products`);
      return result.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <Container>
      <div>
        <h2 className="text-3xl font-semibold text-center mb-6">
          Latest Products
        </h2>
        <p className="text-center text-gray-600">
          Discover our newest arrivals and stay ahead with the latest trends in
          fashion.
        </p>
      </div>
      {latestProducts && latestProducts.length > 0 ? (
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestProducts.map((latestProduct) => (
            <Card key={latestProduct._id} product={latestProduct} />
          ))}
        </div>
      ) : null}
    </Container>
  );
};

export default LatestProducts;
