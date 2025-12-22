// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";

// const PurchaseModal = ({ closeModal, isOpen, product }) => {
//   const { user } = useAuth();

//   const {
//     _id,
//     name,
//     image,
//     description,
//     category,
//     price,
//     quantity: availableQuantity,
//     minimumOrder = 1,
//     seller,
//   } = product || {};

//   const [orderQty, setOrderQty] = useState(minimumOrder);
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [loading, setLoading] = useState(false);

//   const totalPrice = orderQty * price;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (orderQty < minimumOrder || orderQty > availableQuantity) return;

//     const orderPayload = {
//       productId: _id,
//       productName: name,
//       category,
//       image: image,
//       description: description,
//       unitPrice: price,
//       quantity: orderQty,
//       totalPrice,
//       paymentMethod,
//       paymentStatus: paymentMethod === "online" ? "paid" : "pending",
//       seller,
//       customer: {
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//       },
//       deliveryAddress: e.target.address.value,
//       contactNumber: e.target.phone.value,
//       notes: e.target.notes.value,
//     };

//     try {
//       setLoading(true);

//       if (paymentMethod === "online") {
//         const { data } = await axios.post(
//           `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//           orderPayload
//         );
//         window.location.href = data.url;
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/orders`,
//           orderPayload
//         );
//         closeModal();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
//       <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <DialogPanel className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-xl">
//           <DialogTitle className="text-lg font-semibold mb-4">
//             Order Product
//           </DialogTitle>

//           <form onSubmit={handleSubmit} className="space-y-4 text-sm">
//             {/* Read-only fields */}
//             <input value={user?.email} readOnly className="input w-full" />
//             <input value={name} readOnly className="input w-full" />
//             <input value={`$${price}`} readOnly className="input w-full" />

//             {/* Quantity */}
//             <input
//               type="number"
//               min={minimumOrder}
//               max={availableQuantity}
//               value={orderQty}
//               onChange={(e) => setOrderQty(Number(e.target.value))}
//               className="input w-full"
//               required
//             />

//             {/* Total */}
//             <input
//               value={`Total: $${totalPrice}`}
//               readOnly
//               className="input w-full font-semibold"
//             />

//             {/* Contact */}
//             <input
//               name="phone"
//               placeholder="Contact Number"
//               className="input w-full"
//               required
//             />

//             <textarea
//               name="address"
//               placeholder="Delivery Address"
//               className="textarea w-full"
//               required
//             />

//             <textarea
//               name="notes"
//               placeholder="Additional Instructions (optional)"
//               className="textarea w-full"
//             />

//             {/* Payment Method */}
//             <div className="flex gap-4">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={paymentMethod === "online"}
//                   onChange={() => setPaymentMethod("online")}
//                 />
//                 Online Payment
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   checked={paymentMethod === "cod"}
//                   onChange={() => setPaymentMethod("cod")}
//                 />
//                 Cash on Delivery
//               </label>
//             </div>

//             {/* Actions */}
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="btn btn-primary flex-1"
//               >
//                 {paymentMethod === "online"
//                   ? "Proceed to Pay"
//                   : "Confirm Order"}
//               </button>

//               <button
//                 type="button"
//                 onClick={closeModal}
//                 className="btn btn-outline flex-1"
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// };

// export default PurchaseModal;

////////////////////////////

// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { Fragment, useEffect, useMemo, useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import { toast } from "react-hot-toast";

// const PurchaseModal = ({ closeModal, isOpen, product, activeImage }) => {
//   const { user } = useAuth();

//   const {
//     _id,
//     name,
//     image,
//     images,
//     description,
//     category,
//     price,
//     quantity: availableQuantity,
//     minimumOrder = 1,
//     seller,
//     paymentOption, // new DB field: "cod" | "payfirst" | "online" etc.
//   } = product || {};

//   // Build gallery safely (supports new DB + old)
//   const gallery = useMemo(() => {
//     const arr = Array.isArray(images) ? images.filter(Boolean) : [];
//     if (image && !arr.includes(image)) arr.unshift(image);
//     return arr.length ? arr : [image].filter(Boolean);
//   }, [images, image]);

//   const previewImage = activeImage || gallery?.[0];

//   const [orderQty, setOrderQty] = useState(minimumOrder);
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (isOpen) {
//       setOrderQty(minimumOrder);
//       const normalized = (paymentOption || "").toLowerCase();
//       if (normalized === "cod") setPaymentMethod("cod");
//       else setPaymentMethod("online");
//     }
//   }, [isOpen, minimumOrder, paymentOption]);

//   const totalPrice = Number(orderQty || 0) * Number(price || 0);

//   const qtyTooLow = orderQty < minimumOrder;
//   const qtyTooHigh = orderQty > availableQuantity;
//   const qtyInvalid = qtyTooLow || qtyTooHigh;

//   const normalizedPaymentOption = (paymentOption || "").toLowerCase();
//   const allowCOD =
//     normalizedPaymentOption === "cod" || !normalizedPaymentOption;
//   const allowOnline = normalizedPaymentOption !== "cod"; // payfirst/online both allowed

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (qtyInvalid) return;

//     const orderPayload = {
//       productId: _id,
//       productName: name,
//       category,
//       image: previewImage || image,
//       description,
//       unitPrice: price,
//       quantity: Number(orderQty),
//       totalPrice,
//       paymentMethod, // "online" | "cod"
//       paymentStatus: paymentMethod === "online" ? "paid" : "pending",
//       seller,
//       customer: {
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//       },
//       deliveryAddress: e.target.address.value,
//       contactNumber: e.target.phone.value,
//       notes: e.target.notes.value,
//     };

//     try {
//       setLoading(true);

//       if (paymentMethod === "online") {
//         const { data } = await axios.post(
//           `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//           orderPayload
//         );
//         window.location.href = data.url;
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/orders`,
//           orderPayload
//         );
//         toast.success("Order placed (COD)");
//         closeModal();
//       }
//     } catch (err) {
//       toast.error(
//         err?.response?.data?.message || err?.message || "Order failed"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={loading ? () => {} : closeModal}
//       as={Fragment}
//     >
//       <div className="fixed inset-0 z-50">
//         {/* Backdrop */}
//         <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

//         <div className="relative min-h-screen flex items-center justify-center p-4">
//           <DialogPanel
//             className="
//               w-full max-w-2xl
//               max-h-[90vh]
//               rounded-2xl
//               bg-base-100 text-base-content
//               border border-base-200 shadow-2xl
//               flex flex-col overflow-hidden
//             "
//           >
//             {/* Header (fixed) */}
//             <div className="p-5 sm:p-6 border-b border-base-200 flex items-start justify-between gap-4 shrink-0">
//               <div className="min-w-0">
//                 <DialogTitle className="text-lg sm:text-xl font-semibold">
//                   Place an Order
//                 </DialogTitle>
//                 <p className="text-sm text-base-content/70 mt-1 line-clamp-1">
//                   {name} • {category}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 className="btn btn-sm btn-ghost"
//                 onClick={closeModal}
//                 disabled={loading}
//               >
//                 ✕
//               </button>
//             </div>

//             {/* Body (scrollable) */}
//             <div className="p-5 sm:p-6 overflow-y-auto flex-1">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//                 {/* Left: Preview + Summary */}
//                 <div className="space-y-4">
//                   <div className="rounded-2xl border border-base-200 bg-base-200/40 overflow-hidden">
//                     {/* ✅ Smaller preview on small screens */}
//                     <div className="h-40 sm:h-52 lg:h-56 w-full">
//                       <img
//                         src={previewImage}
//                         alt={name}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>
//                   </div>

//                   <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
//                     <p className="text-xs text-base-content/60">Seller</p>
//                     <div className="flex items-center gap-3 mt-2">
//                       <img
//                         src={seller?.image}
//                         alt={seller?.name}
//                         className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
//                         referrerPolicy="no-referrer"
//                       />
//                       <div className="min-w-0">
//                         <p className="font-medium">{seller?.name || "—"}</p>
//                         <p className="text-xs text-base-content/60 truncate">
//                           {seller?.email}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
//                       <div>
//                         <p className="text-xs text-base-content/60">In stock</p>
//                         <p className="font-semibold">{availableQuantity}</p>
//                       </div>
//                       <div>
//                         <p className="text-xs text-base-content/60">MOQ</p>
//                         <p className="font-semibold">{minimumOrder}</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right: Form */}
//                 <form onSubmit={handleSubmit} className="space-y-3">
//                   {/* Read-only */}
//                   <label className="form-control">
//                     <span className="label-text text-base-content/70">
//                       Your Email
//                     </span>
//                     <input
//                       value={user?.email || ""}
//                       readOnly
//                       className="input input-bordered bg-base-200/50"
//                     />
//                   </label>

//                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                     <label className="form-control">
//                       <span className="label-text text-base-content/70">
//                         Unit Price
//                       </span>
//                       <input
//                         value={`$${price ?? 0}`}
//                         readOnly
//                         className="input input-bordered bg-base-200/50"
//                       />
//                     </label>

//                     <label className="form-control">
//                       <span className="label-text text-base-content/70">
//                         Quantity
//                         <span className="ml-2 text-xs text-base-content/50">
//                           (min {minimumOrder}, max {availableQuantity})
//                         </span>
//                       </span>

//                       <input
//                         type="number"
//                         min={minimumOrder}
//                         max={availableQuantity}
//                         value={orderQty}
//                         onChange={(e) => setOrderQty(Number(e.target.value))}
//                         className={`input input-bordered ${
//                           qtyInvalid ? "input-error" : ""
//                         }`}
//                         required
//                       />

//                       {qtyTooLow && (
//                         <span className="mt-1 text-xs text-error">
//                           Quantity must be at least {minimumOrder}.
//                         </span>
//                       )}
//                       {qtyTooHigh && (
//                         <span className="mt-1 text-xs text-error">
//                           Quantity cannot exceed stock ({availableQuantity}).
//                         </span>
//                       )}
//                     </label>
//                   </div>

//                   <label className="form-control">
//                     <span className="label-text text-base-content/70">
//                       Total
//                     </span>
//                     <input
//                       value={`$${Number.isFinite(totalPrice) ? totalPrice : 0}`}
//                       readOnly
//                       className="input input-bordered bg-base-200/50 font-semibold"
//                     />
//                   </label>

//                   <label className="form-control">
//                     <span className="label-text text-base-content/70">
//                       Contact Number
//                     </span>
//                     <input
//                       name="phone"
//                       placeholder="017XXXXXXXX"
//                       className="input input-bordered"
//                       required
//                     />
//                   </label>

//                   <label className="form-control">
//                     <span className="label-text text-base-content/70">
//                       Delivery Address
//                     </span>
//                     <textarea
//                       name="address"
//                       placeholder="City, Area, House/Street..."
//                       className="textarea textarea-bordered min-h-20"
//                       required
//                     />
//                   </label>

//                   <label className="form-control">
//                     <span className="label-text text-base-content/70">
//                       Notes{" "}
//                       <span className="text-xs text-base-content/50">
//                         (optional)
//                       </span>
//                     </span>
//                     <textarea
//                       name="notes"
//                       placeholder="Any instructions..."
//                       className="textarea textarea-bordered min-h-16"
//                     />
//                   </label>

//                   {/* Payment */}
//                   <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
//                     <p className="text-sm font-medium">Payment Method</p>

//                     <div className="mt-3 flex flex-col sm:flex-row gap-3">
//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           className="radio radio-primary"
//                           checked={paymentMethod === "online"}
//                           onChange={() => setPaymentMethod("online")}
//                           disabled={!allowOnline}
//                         />
//                         <span className={!allowOnline ? "opacity-50" : ""}>
//                           Online Payment{" "}
//                           {normalizedPaymentOption === "payfirst"
//                             ? "(PayFirst)"
//                             : ""}
//                         </span>
//                       </label>

//                       <label className="flex items-center gap-2 cursor-pointer">
//                         <input
//                           type="radio"
//                           className="radio radio-primary"
//                           checked={paymentMethod === "cod"}
//                           onChange={() => setPaymentMethod("cod")}
//                           disabled={!allowCOD}
//                         />
//                         <span className={!allowCOD ? "opacity-50" : ""}>
//                           Cash on Delivery
//                         </span>
//                       </label>
//                     </div>

//                     {!allowCOD && (
//                       <p className="mt-2 text-xs text-base-content/60">
//                         COD is not available for this product.
//                       </p>
//                     )}
//                   </div>

//                   {/* Keep buttons here for mobile scroll comfort */}
//                   <div className="pt-2 flex flex-col sm:flex-row gap-3">
//                     <button
//                       type="submit"
//                       disabled={loading || qtyInvalid}
//                       className="btn btn-primary flex-1"
//                     >
//                       {loading
//                         ? "Processing..."
//                         : paymentMethod === "online"
//                         ? "Proceed to Pay"
//                         : "Confirm Order"}
//                     </button>

//                     <button
//                       type="button"
//                       onClick={closeModal}
//                       disabled={loading}
//                       className="btn btn-outline flex-1"
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </form>
//               </div>

//               <p className="mt-5 text-xs text-base-content/60">
//                 Your order will be reviewed by the seller. Stock validation will
//                 be enforced on the server.
//               </p>
//             </div>
//           </DialogPanel>
//         </div>
//       </div>
//     </Dialog>
//   );
// };

// export default PurchaseModal;

////////////////////

// import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
// import { useState } from "react";
// import useAuth from "../../hooks/useAuth";
// import axios from "axios";
// import { useQueryClient } from "@tanstack/react-query";
// import toast from "react-hot-toast";

// const PurchaseModal = ({ closeModal, isOpen, product }) => {
//   const { user } = useAuth();
//   const queryClient = useQueryClient();

//   const {
//     _id,
//     name,
//     image,
//     images,
//     description,
//     category,
//     price,
//     quantity: availableQuantity,
//     minimumOrder = 1,
//     seller,
//   } = product || {};

//   const cover =
//     (Array.isArray(images) && images.length > 0 && images[0]) || image;

//   const [orderQty, setOrderQty] = useState(minimumOrder);
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [loading, setLoading] = useState(false);

//   const totalPrice = orderQty * (Number(price) || 0);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (orderQty < minimumOrder || orderQty > availableQuantity) {
//       toast.error("Invalid quantity");
//       return;
//     }

//     const orderPayload = {
//       productId: _id,
//       productName: name,
//       category,
//       image: cover,
//       description,
//       unitPrice: price,
//       quantity: orderQty,
//       totalPrice,
//       paymentMethod,
//       paymentStatus: paymentMethod === "online" ? "paid" : "pending",
//       seller,
//       customer: {
//         name: user?.displayName,
//         email: user?.email,
//         image: user?.photoURL,
//       },
//       deliveryAddress: e.target.address.value,
//       contactNumber: e.target.phone.value,
//       notes: e.target.notes.value,
//     };

//     try {
//       setLoading(true);

//       if (paymentMethod === "online") {
//         const { data } = await axios.post(
//           `${import.meta.env.VITE_API_URL}/create-checkout-session`,
//           orderPayload
//         );
//         window.location.href = data.url;
//       } else {
//         await axios.post(
//           `${import.meta.env.VITE_API_URL}/orders`,
//           orderPayload
//         );

//         // ✅ AUTO REFRESH PRODUCT DETAILS (no reload)
//         await queryClient.invalidateQueries({ queryKey: ["product", _id] });

//         // optional: also refresh product lists
//         await queryClient.invalidateQueries({ queryKey: ["products"] });

//         toast.success("Order placed successfully");
//         closeModal();
//       }
//     } catch (err) {
//       toast.error(err?.response?.data?.message || "Order failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={loading ? () => {} : closeModal}
//       className="relative z-50"
//     >
//       <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />

//       <div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4">
//         {/* ✅ Make it scrollable + max height */}
//         <DialogPanel
//           className="
//             w-full max-w-lg rounded-2xl
//             bg-base-100 text-base-content
//             border border-base-200 shadow-2xl
//             max-h-[85vh] overflow-y-auto
//           "
//         >
//           <div className="p-5 sm:p-6">
//             <div className="flex items-start justify-between gap-3">
//               <div>
//                 <DialogTitle className="text-lg font-semibold">
//                   Order Product
//                 </DialogTitle>
//                 <p className="text-xs text-base-content/60">
//                   {name} · {category}
//                 </p>
//               </div>

//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={loading}
//                 className="btn btn-sm btn-ghost"
//               >
//                 ✕
//               </button>
//             </div>

//             {/* small preview */}
//             <div className="mt-4 flex items-center gap-3 rounded-2xl border border-base-200 bg-base-200/40 p-3">
//               <img
//                 src={cover}
//                 alt={name}
//                 className="w-14 h-14 rounded-xl object-cover"
//               />
//               <div className="flex-1">
//                 <p className="font-semibold line-clamp-1">{name}</p>
//                 <p className="text-xs text-base-content/60">
//                   Available: {availableQuantity} · MOQ: {minimumOrder}
//                 </p>
//               </div>
//               <div className="text-right">
//                 <p className="font-bold text-primary">${price}</p>
//                 <p className="text-xs text-base-content/60">per unit</p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
//               {/* Read-only fields */}
//               <label className="form-control w-full">
//                 <span className="label-text text-base-content/70">Email</span>
//                 <input
//                   value={user?.email || ""}
//                   readOnly
//                   className="input input-bordered bg-base-200/40"
//                 />
//               </label>

//               {/* Quantity */}
//               <label className="form-control w-full">
//                 <span className="label-text text-base-content/70">
//                   Quantity
//                 </span>
//                 <input
//                   type="number"
//                   min={minimumOrder}
//                   max={availableQuantity}
//                   value={orderQty}
//                   onChange={(e) => setOrderQty(Number(e.target.value))}
//                   className="input input-bordered"
//                   required
//                 />
//                 <span className="label-text-alt text-base-content/60">
//                   Min {minimumOrder}, Max {availableQuantity}
//                 </span>
//               </label>

//               {/* Total */}
//               <div className="rounded-2xl border border-base-200 bg-base-200/40 p-3 flex items-center justify-between">
//                 <span className="text-base-content/70">Total</span>
//                 <span className="font-bold text-primary">${totalPrice}</span>
//               </div>

//               {/* Contact */}
//               <label className="form-control w-full">
//                 <span className="label-text text-base-content/70">
//                   Contact Number
//                 </span>
//                 <input
//                   name="phone"
//                   placeholder="017XXXXXXXX"
//                   className="input input-bordered"
//                   required
//                 />
//               </label>

//               <label className="form-control w-full">
//                 <span className="label-text text-base-content/70">
//                   Delivery Address
//                 </span>
//                 <textarea
//                   name="address"
//                   placeholder="Your full address"
//                   className="textarea textarea-bordered"
//                   required
//                 />
//               </label>

//               <label className="form-control w-full">
//                 <span className="label-text text-base-content/70">
//                   Notes (optional)
//                 </span>
//                 <textarea
//                   name="notes"
//                   placeholder="Any special instruction"
//                   className="textarea textarea-bordered"
//                 />
//               </label>

//               {/* Payment Method */}
//               <div className="rounded-2xl border border-base-200 bg-base-200/40 p-3">
//                 <p className="text-sm font-medium mb-2">Payment Method</p>
//                 <div className="flex flex-col sm:flex-row gap-3">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="pay"
//                       className="radio radio-primary"
//                       checked={paymentMethod === "online"}
//                       onChange={() => setPaymentMethod("online")}
//                     />
//                     <span>Online Payment</span>
//                   </label>

//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="pay"
//                       className="radio radio-primary"
//                       checked={paymentMethod === "cod"}
//                       onChange={() => setPaymentMethod("cod")}
//                     />
//                     <span>Cash on Delivery</span>
//                   </label>
//                 </div>
//               </div>

//               {/* Actions */}
//               <div className="pt-2 flex flex-col sm:flex-row gap-3">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="btn btn-primary flex-1"
//                 >
//                   {loading
//                     ? "Processing..."
//                     : paymentMethod === "online"
//                     ? "Proceed to Pay"
//                     : "Confirm Order"}
//                 </button>

//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   disabled={loading}
//                   className="btn btn-outline flex-1"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </DialogPanel>
//       </div>
//     </Dialog>
//   );
// };

// export default PurchaseModal;

/////////////

import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { toast } from "react-hot-toast";

const PurchaseModal = ({
  closeModal,
  isOpen,
  product,
  activeImage,
  refetchProduct, // ✅ pass refetch from ProductDetails useQuery
}) => {
  const { user } = useAuth();

  const {
    _id,
    name,
    image,
    images,
    description,
    category,
    price,
    quantity: availableQuantity,
    minimumOrder = 1,
    seller,
    paymentOption, // "cod" | "payfirst"
  } = product || {};

  // gallery supports new + old DB
  const gallery = useMemo(() => {
    const arr = Array.isArray(images) ? images.filter(Boolean) : [];
    if (image && !arr.includes(image)) arr.unshift(image);
    return arr.length ? arr : [image].filter(Boolean);
  }, [images, image]);

  const previewImage = activeImage || gallery?.[0];

  const normalizedPaymentOption = (paymentOption || "cod").toLowerCase();
  const allowCOD = normalizedPaymentOption === "cod";
  const allowOnline = normalizedPaymentOption === "payfirst";

  // ✅ payment method is driven by product paymentOption
  const initialPaymentMethod = allowOnline ? "online" : "cod";

  const [orderQty, setOrderQty] = useState(minimumOrder);
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setOrderQty(minimumOrder);
      setPaymentMethod(initialPaymentMethod);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, minimumOrder, normalizedPaymentOption]);

  const totalPrice = Number(orderQty || 0) * Number(price || 0);

  const qtyTooLow = orderQty < minimumOrder;
  const qtyTooHigh = orderQty > availableQuantity;
  const qtyInvalid = qtyTooLow || qtyTooHigh;

  const paymentBadge =
    normalizedPaymentOption === "payfirst" ? "PayFirst" : "Cash on Delivery";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (qtyInvalid) return;

    const orderPayload = {
      productId: _id,
      productName: name,
      category,
      image: previewImage || image,
      description,
      unitPrice: Number(price),
      quantity: Number(orderQty),
      totalPrice: Number(totalPrice),
      paymentMethod, // "online" | "cod"
      paymentStatus: paymentMethod === "online" ? "paid" : "pending",
      seller,
      customer: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
      deliveryAddress: e.target.address.value,
      contactNumber: e.target.phone.value,
      notes: e.target.notes.value,
    };

    try {
      setLoading(true);

      if (paymentMethod === "online") {
        // ✅ PayFirst = Stripe
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/create-checkout-session`,
          orderPayload
        );
        window.location.href = data.url;
        return;
      }

      // ✅ COD order
      await axios.post(`${import.meta.env.VITE_API_URL}/orders`, orderPayload);

      toast.success("Order placed (COD)");
      closeModal();

      // ✅ Refetch product so quantity updates instantly
      await refetchProduct?.();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Order failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={loading ? () => {} : closeModal}
      as={Fragment}
    >
      <div className="fixed inset-0 z-50">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative min-h-screen flex items-center justify-center p-3 sm:p-4">
          <DialogPanel
            className="
              w-full max-w-3xl
              max-h-[92vh]
              rounded-2xl
              bg-base-100 text-base-content
              border border-base-200 shadow-2xl
              overflow-hidden
              flex flex-col
            "
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-base-200 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <DialogTitle className="text-base sm:text-lg font-semibold">
                  Checkout
                </DialogTitle>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-base-content/70 line-clamp-1">
                    {name} • {category}
                  </span>
                  <span className="badge badge-primary badge-outline">
                    {paymentBadge}
                  </span>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-sm btn-ghost"
                onClick={closeModal}
                disabled={loading}
              >
                ✕
              </button>
            </div>

            {/* Body (scrollable) */}
            <div className="p-4 sm:p-5 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
                {/* Left: Product summary */}
                <div className="space-y-4">
                  <div className="rounded-2xl border border-base-200 bg-base-200/40 overflow-hidden">
                    {/* ✅ smaller on mobile */}
                    <div className="h-36 sm:h-48 lg:h-56 w-full">
                      <img
                        src={previewImage}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">${price}</p>
                      <p className="text-xs text-base-content/60">
                        Stock:{" "}
                        <span className="font-semibold">
                          {availableQuantity}
                        </span>
                      </p>
                    </div>

                    <p className="mt-2 text-xs text-base-content/70 line-clamp-3">
                      {description}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      <img
                        src={seller?.image}
                        alt={seller?.name}
                        className="w-9 h-9 rounded-full object-cover ring-2 ring-primary/20"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {seller?.name || "—"}
                        </p>
                        <p className="text-xs text-base-content/60 truncate">
                          {seller?.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-base-100/60 border border-base-200 p-3">
                        <p className="text-xs text-base-content/60">MOQ</p>
                        <p className="font-semibold">{minimumOrder}</p>
                      </div>
                      <div className="rounded-xl bg-base-100/60 border border-base-200 p-3">
                        <p className="text-xs text-base-content/60">Total</p>
                        <p className="font-semibold">${totalPrice || 0}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label className="form-control">
                    <span className="label-text text-base-content/70">
                      Your Email
                    </span>
                    <input
                      value={user?.email || ""}
                      readOnly
                      className="input input-bordered bg-base-200/50"
                    />
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="form-control">
                      <span className="label-text text-base-content/70">
                        Quantity
                      </span>
                      <input
                        type="number"
                        min={minimumOrder}
                        max={availableQuantity}
                        value={orderQty}
                        onChange={(e) => setOrderQty(Number(e.target.value))}
                        className={`input input-bordered ${
                          qtyInvalid ? "input-error" : ""
                        }`}
                        required
                      />
                      {qtyTooLow && (
                        <span className="mt-1 text-xs text-error">
                          Minimum {minimumOrder}
                        </span>
                      )}
                      {qtyTooHigh && (
                        <span className="mt-1 text-xs text-error">
                          Max available {availableQuantity}
                        </span>
                      )}
                    </label>

                    <label className="form-control">
                      <span className="label-text text-base-content/70">
                        Contact Number
                      </span>
                      <input
                        name="phone"
                        placeholder="017XXXXXXXX"
                        className="input input-bordered"
                        required
                      />
                    </label>
                  </div>

                  <label className="form-control">
                    <span className="label-text text-base-content/70">
                      Delivery Address
                    </span>
                    <textarea
                      name="address"
                      placeholder="City, Area, House/Street..."
                      className="textarea textarea-bordered min-h-20"
                      required
                    />
                  </label>

                  <label className="form-control">
                    <span className="label-text text-base-content/70">
                      Notes{" "}
                      <span className="text-xs text-base-content/50">
                        (optional)
                      </span>
                    </span>
                    <textarea
                      name="notes"
                      placeholder="Any instructions..."
                      className="textarea textarea-bordered min-h-16"
                    />
                  </label>

                  {/* Payment Method (locked by product paymentOption) */}
                  <div className="rounded-2xl border border-base-200 bg-base-200/40 p-4">
                    <p className="text-sm font-medium">Payment</p>

                    <div className="mt-3 flex flex-col gap-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          className="radio radio-primary"
                          checked={paymentMethod === "online"}
                          onChange={() => setPaymentMethod("online")}
                          disabled={!allowOnline}
                        />
                        <span className={!allowOnline ? "opacity-50" : ""}>
                          PayFirst (Online)
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          className="radio radio-primary"
                          checked={paymentMethod === "cod"}
                          onChange={() => setPaymentMethod("cod")}
                          disabled={!allowCOD}
                        />
                        <span className={!allowCOD ? "opacity-50" : ""}>
                          Cash on Delivery
                        </span>
                      </label>

                      <p className="mt-1 text-xs text-base-content/60">
                        This product allows:{" "}
                        <span className="font-semibold">{paymentBadge}</span>
                      </p>
                    </div>
                  </div>

                  {/* spacer so sticky footer doesn’t overlap */}
                  <div className="h-2" />
                </form>
              </div>

              <p className="mt-4 text-xs text-base-content/60">
                Stock and MOQ are validated again on the server for safety.
              </p>
            </div>

            {/* Footer (sticky actions) */}
            <div className="p-4 sm:p-5 border-t border-base-200 bg-base-100/90 backdrop-blur flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="btn btn-ghost sm:order-1"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => {
                  // submit the form programmatically
                  const form =
                    document.querySelector("dialog [data-purchase-form]") ||
                    null;
                  // (we don't rely on this; users can submit via Enter too)
                }}
                className="hidden"
              />

              <button
                form=""
                onClick={(e) => {
                  // trigger native submit
                  const forms = e.currentTarget
                    .closest("div")
                    ?.previousElementSibling?.querySelectorAll("form");
                  const form = forms?.[0];
                  if (form) form.requestSubmit();
                }}
                disabled={loading || qtyInvalid}
                className="btn btn-primary flex-1"
              >
                {loading
                  ? "Processing..."
                  : paymentMethod === "online"
                  ? "Proceed to Pay"
                  : "Confirm Order"}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PurchaseModal;
