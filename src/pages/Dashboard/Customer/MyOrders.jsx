// import { useQuery } from '@tanstack/react-query'
// import CustomerOrderDataRow from '../../../components/Dashboard/TableRows/CustomerOrderDataRow'
// import useAuth from '../../../hooks/useAuth'
// import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
// import useAxiosSecure from '../../../hooks/useAxiosSecure'

// const MyOrders = () => {
//   const { user } = useAuth()
//   const axiosSecure = useAxiosSecure()
//   const { data: orders = [], isLoading } = useQuery({
//     queryKey: ['orders', user?.email],
//     queryFn: async () => {
//       const result = await axiosSecure(`/my-orders`)
//       return result.data
//     },
//   })
//   console.log(orders)

//   if (isLoading) return <LoadingSpinner />
//   return (
//     <>
//       <div className='container mx-auto px-4 sm:px-8'>
//         <div className='py-8'>
//           <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
//             <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
//               <table className='min-w-full leading-normal'>
//                 <thead>
//                   <tr>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Image
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Name
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Category
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Price
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Quantity
//                     </th>
//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Status
//                     </th>

//                     <th
//                       scope='col'
//                       className='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
//                     >
//                       Action
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {orders.map(order => (
//                     <CustomerOrderDataRow key={order._id} order={order} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default MyOrders

////////////////

// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAuth from "../../../hooks/useAuth";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
// import CustomerOrdersRow from "../../../components/Dashboard/TableRows/CustomerOrdersRow";

// import CustomerOrderDetailsModal from "../../../components/Modal/CustomerOrderDetailsModal";
// import ConfirmCancelOrderModal from "../../../components/Modal/ConfirmCancelOrderModal";

// const MyOrders = () => {
//   const { user } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const [viewOrder, setViewOrder] = useState(null);
//   const [cancelOrder, setCancelOrder] = useState(null);

//   const {
//     data: orders = [],
//     isLoading,
//     refetch,
//     isFetching,
//   } = useQuery({
//     queryKey: ["my-orders", user?.email],
//     enabled: !!user?.email,
//     queryFn: async () => {
//       const res = await axiosSecure.get("/my-orders");
//       return res.data;
//     },
//   });

//   if (isLoading) return <LoadingSpinner />;

//   return (
//     <section className="w-full">
//       <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 py-6">
//         {/* Header */}
//         <div className="flex items-end justify-between gap-3">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
//               My Orders
//             </h1>
//             <p className="text-sm text-base-content/70">
//               Showing <span className="font-semibold">{orders.length}</span>{" "}
//               order{orders.length !== 1 ? "s" : ""}.
//             </p>
//           </div>

//           <button
//             className="btn btn-outline btn-primary"
//             onClick={() => refetch()}
//             disabled={isFetching}
//           >
//             {isFetching ? "Refreshing..." : "Refresh"}
//           </button>
//         </div>

//         {/* Table */}
//         <div className="mt-5 card bg-base-100/80 backdrop-blur border border-base-200 shadow-sm">
//           <div className="card-body p-0">
//             <div className="overflow-x-auto">
//               <table className="table table-zebra">
//                 <thead>
//                   <tr className="text-base-content/70">
//                     <th>Order ID</th>
//                     <th>Product</th>
//                     <th>Quantity</th>
//                     <th>Status</th>
//                     <th>Payment</th>
//                     <th className="text-right">Actions</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   {orders.map((order) => (
//                     <CustomerOrdersRow
//                       key={order._id}
//                       order={order}
//                       onView={() => setViewOrder(order)}
//                       onCancel={() => setCancelOrder(order)}
//                     />
//                   ))}

//                   {orders.length === 0 && (
//                     <tr>
//                       <td colSpan={6}>
//                         <div className="py-10 text-center text-base-content/60">
//                           No orders found.
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* View Modal */}
//       <CustomerOrderDetailsModal
//         isOpen={!!viewOrder}
//         closeModal={() => setViewOrder(null)}
//         order={viewOrder}
//       />

//       {/* Cancel Confirm Modal */}
//       <ConfirmCancelOrderModal
//         isOpen={!!cancelOrder}
//         closeModal={() => setCancelOrder(null)}
//         order={cancelOrder}
//         refetch={refetch}
//       />
//     </section>
//   );
// };

// export default MyOrders;

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import CustomerOrdersRow from "../../../components/Dashboard/TableRows/CustomerOrdersRow";
import CustomerOrderDetailsModal from "../../../components/Modal/CustomerOrderDetailsModal";

const MyOrders = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [viewOrder, setViewOrder] = useState(null);

  const {
    data: orders = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["my-orders", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/my-orders");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <section className="w-full">
      <div className="mx-auto max-w-6xl px-3 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="flex items-end justify-between gap-3">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold text-base-content">
              My Orders
            </h1>
            <p className="text-sm text-base-content/70">
              Showing <span className="font-semibold">{orders.length}</span>{" "}
              order{orders.length !== 1 ? "s" : ""}.
            </p>
          </div>

          <button
            className="btn btn-outline btn-primary"
            onClick={() => refetch()}
            disabled={isFetching}
          >
            {isFetching ? "Refreshing..." : "Refresh"}
          </button>
        </div>

        {/* Table */}
        <div className="mt-5 card bg-base-100/80 backdrop-blur border border-base-200 shadow-sm">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead>
                  <tr className="text-base-content/70">
                    <th>Order ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <CustomerOrdersRow
                      key={order._id}
                      order={order}
                      onView={() => setViewOrder(order)}
                      refetch={refetch}
                    />
                  ))}

                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6}>
                        <div className="py-10 text-center text-base-content/60">
                          No orders found.
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

      {/* View Modal */}
      <CustomerOrderDetailsModal
        isOpen={!!viewOrder}
        closeModal={() => setViewOrder(null)}
        order={viewOrder}
      />
    </section>
  );
};

export default MyOrders;
