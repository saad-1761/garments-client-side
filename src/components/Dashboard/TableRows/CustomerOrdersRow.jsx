// // import { useState } from 'react'
// // import DeleteModal from '../../Modal/DeleteModal'
// // const CustomerOrderDataRow = ({ order }) => {
// //   let [isOpen, setIsOpen] = useState(false)
// //   const closeModal = () => setIsOpen(false)

// //   const { image, name, category, price, quantity, status } = order || {}

// //   return (
// //     <tr>
// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <div className='flex items-center'>
// //           <div className='shrink-0'>
// //             <div className='block relative'>
// //               <img
// //                 alt='profile'
// //                 src={image}
// //                 className='mx-auto object-cover rounded h-10 w-15 '
// //               />
// //             </div>
// //           </div>
// //         </div>
// //       </td>

// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <p className='text-gray-900'>{name}</p>
// //       </td>
// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <p className='text-gray-900'>{category}</p>
// //       </td>
// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <p className='text-gray-900'>${price}</p>
// //       </td>
// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <p className='text-gray-900'>{quantity}</p>
// //       </td>
// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <p className='text-gray-900'>{status}</p>
// //       </td>

// //       <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
// //         <button
// //           onClick={() => setIsOpen(true)}
// //           className='relative disabled:cursor-not-allowed cursor-pointer inline-block px-3 py-1 font-semibold text-lime-900 leading-tight'
// //         >
// //           <span className='absolute cursor-pointer inset-0 bg-red-200 opacity-50 rounded-full'></span>
// //           <span className='relative cursor-pointer'>Cancel</span>
// //         </button>

// //         <DeleteModal isOpen={isOpen} closeModal={closeModal} />
// //       </td>
// //     </tr>
// //   )
// // }

// // export default CustomerOrderDataRow

// const statusBadge = (s = "") => {
//   const v = s.toLowerCase();
//   if (v === "approved") return "badge-success";
//   if (v === "rejected") return "badge-error";
//   return "badge-warning"; // pending
// };

// const paymentBadge = (paymentStatus = "", method = "") => {
//   const ps = paymentStatus.toLowerCase();
//   if (ps === "paid") return "badge-success";
//   if ((method || "").toLowerCase() === "cod") return "badge-warning";
//   return "badge-ghost";
// };

// const CustomerOrdersRow = ({ order, onView, onCancel }) => {
//   const canCancel =
//     (order?.orderStatus || "").toLowerCase() === "pending" &&
//     (order?.paymentStatus || "").toLowerCase() === "pending";

//   return (
//     <tr className="text-base-content">
//       {/* Order ID */}
//       <td>
//         <p className="font-mono text-xs sm:text-sm break-all">{order?._id}</p>
//         <p className="text-xs text-base-content/60">
//           {order?.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
//         </p>
//       </td>

//       {/* Product */}
//       <td>
//         <div className="flex items-center gap-3">
//           <div className="avatar">
//             <div className="w-10 h-10 rounded-lg ring-1 ring-base-300 bg-base-200 overflow-hidden">
//               <img
//                 src={order?.image}
//                 alt={order?.productName}
//                 className="object-cover w-full h-full"
//                 loading="lazy"
//               />
//             </div>
//           </div>
//           <div className="min-w-0">
//             <p className="font-semibold line-clamp-1">{order?.productName}</p>
//             <p className="text-xs text-base-content/60 line-clamp-1">
//               {order?.category}
//             </p>
//           </div>
//         </div>
//       </td>

//       {/* Quantity */}
//       <td className="font-semibold">{order?.quantity ?? "—"}</td>

//       {/* Status */}
//       <td>
//         <span
//           className={`badge badge-outline ${statusBadge(
//             order?.orderStatus
//           )} uppercase`}
//         >
//           {order?.orderStatus || "pending"}
//         </span>
//       </td>

//       {/* Payment */}
//       <td>
//         <div className="flex flex-col gap-1">
//           <span
//             className={`badge badge-outline ${paymentBadge(
//               order?.paymentStatus,
//               order?.paymentMethod
//             )} uppercase`}
//           >
//             {order?.paymentStatus || "pending"}
//           </span>
//           <span className="text-xs text-base-content/60 uppercase">
//             {order?.paymentMethod || "cod"}
//           </span>
//         </div>
//       </td>

//       {/* Actions */}
//       <td className="text-right">
//         <div className="flex justify-end gap-2">
//           <button
//             className="btn btn-sm btn-outline btn-primary"
//             onClick={onView}
//           >
//             View
//           </button>

//           {canCancel ? (
//             <button
//               className="btn btn-sm btn-outline btn-error"
//               onClick={onCancel}
//             >
//               Cancel
//             </button>
//           ) : (
//             <button
//               className="btn btn-sm btn-ghost"
//               disabled
//               title="Only pending unpaid orders can be cancelled"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </td>
//     </tr>
//   );
// };

// export default CustomerOrdersRow;
/////////
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import DeleteModal from "../../Modal/DeleteModal";

const statusBadge = (s = "") => {
  const v = s.toLowerCase();
  if (v === "approved") return "badge-success";
  if (v === "rejected") return "badge-error";
  return "badge-warning"; // pending
};

const paymentBadge = (paymentStatus = "", method = "") => {
  const ps = paymentStatus.toLowerCase();
  if (ps === "paid") return "badge-success";
  if ((method || "").toLowerCase() === "cod") return "badge-warning";
  return "badge-ghost";
};

const CustomerOrdersRow = ({ order, onView, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isCancelOpen, setIsCancelOpen] = useState(false);

  const canCancel = useMemo(() => {
    const os = (order?.orderStatus || "").toLowerCase();
    const ps = (order?.paymentStatus || "").toLowerCase();
    return os === "pending" && ps === "pending";
  }, [order]);

  const cancelMutation = useMutation({
    mutationFn: async (orderId) => {
      const res = await axiosSecure.delete(`/orders/${orderId}`);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Order cancelled & stock restored");
      await refetch?.();
      setIsCancelOpen(false);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message || err?.message || "Cancel failed"
      );
    },
  });

  return (
    <tr className="text-base-content">
      {/* Order ID */}
      <td>
        <p className="font-mono text-xs sm:text-sm break-all">{order?._id}</p>
        <p className="text-xs text-base-content/60">
          {order?.createdAt ? new Date(order.createdAt).toLocaleString() : ""}
        </p>
      </td>

      {/* Product */}
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="w-10 h-10 rounded-lg ring-1 ring-base-300 bg-base-200 overflow-hidden">
              <img
                src={order?.image}
                alt={order?.productName}
                className="object-cover w-full h-full"
                loading="lazy"
              />
            </div>
          </div>
          <div className="min-w-0">
            <p className="font-semibold line-clamp-1">{order?.productName}</p>
            <p className="text-xs text-base-content/60 line-clamp-1">
              {order?.category}
            </p>
          </div>
        </div>
      </td>

      {/* Quantity */}
      <td className="font-semibold">{order?.quantity ?? "—"}</td>

      {/* Status */}
      <td>
        <span
          className={`badge badge-outline ${statusBadge(
            order?.orderStatus
          )} uppercase`}
        >
          {order?.orderStatus || "pending"}
        </span>
      </td>

      {/* Payment */}
      <td>
        <div className="flex flex-col gap-1">
          <span
            className={`badge badge-outline ${paymentBadge(
              order?.paymentStatus,
              order?.paymentMethod
            )} uppercase`}
          >
            {order?.paymentStatus || "pending"}
          </span>
          <span className="text-xs text-base-content/60 uppercase">
            {order?.paymentMethod || "cod"}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="text-right">
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-outline btn-primary"
            onClick={onView}
          >
            View
          </button>

          <button
            className="btn btn-sm btn-outline btn-error"
            disabled={!canCancel}
            title={
              !canCancel ? "Only pending unpaid orders can be cancelled" : ""
            }
            onClick={() => setIsCancelOpen(true)}
          >
            Cancel
          </button>
        </div>

        {/* Cancel Confirm Modal */}
        <DeleteModal
          isOpen={isCancelOpen}
          closeModal={() => setIsCancelOpen(false)}
          title="Cancel Order?"
          message={
            canCancel
              ? "This will cancel your order and restore product stock."
              : "This order cannot be cancelled (paid or not pending)."
          }
          confirmText="Yes, Cancel"
          cancelText="No"
          disabled={!canCancel}
          isLoading={cancelMutation.isPending}
          onConfirm={() => cancelMutation.mutate(order?._id)}
        />
      </td>
    </tr>
  );
};

export default CustomerOrdersRow;
