import SellerOrderDataRow from "../../../components/Dashboard/TableRows/SellerOrderDataRow";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const ManageOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["seller-orders"],
    queryFn: async () => {
      const res = await axiosSecure(`/manage-orders/${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="container mx-auto py-8 px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full rounded-lg overflow-hidden shadow border border-gray-200 dark:border-gray-700">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-100 dark:bg-gray-800">
                <tr>
                  {[
                    "Name",
                    "Customer",
                    "Price",
                    "Quantity",
                    "Status",
                    "Action",
                  ].map((heading, i) => (
                    <th
                      key={i}
                      className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900">
                {orders.map(
                  (order) => (
                    console.log(order),
                    (<SellerOrderDataRow key={order._id} order={order} />)
                  )
                )}
              </tbody>
            </table>

            {orders.length === 0 && (
              <p className="text-center py-6 text-gray-500 dark:text-gray-400">
                No orders found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageOrders;
