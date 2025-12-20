import { useQuery } from "@tanstack/react-query";
import ProductDataRow from "../../../components/Dashboard/TableRows/ProductDataRow";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const MyInventory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["seller-inventory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure(`/my-inventory/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {[
                    "Image",
                    "Name",
                    "Category",
                    "Price",
                    "Quantity",
                    "Delete",
                    "Update",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="bg-white dark:bg-gray-900">
                {products.map((product) => (
                  <ProductDataRow key={product._id} product={product} />
                ))}
              </tbody>
            </table>

            {products.length === 0 && (
              <p className="text-center py-6 text-gray-500 dark:text-gray-400">
                No products found in inventory.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyInventory;
