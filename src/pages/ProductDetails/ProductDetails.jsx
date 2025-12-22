// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import Button from "../../components/Shared/Button/Button";
// import PurchaseModal from "../../components/Modal/PurchaseModal";
// import { useContext, useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
// import { motion } from "framer-motion";
// import { AuthContext } from "../../providers/AuthContext";
// import useRole from "../../hooks/useRole";

// const ProductDetails = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [role] = useRole();
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const { data: product = {}, isLoading } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const result = await axios(
//         `${import.meta.env.VITE_API_URL}/products/${id}`
//       );
//       return result.data;
//     },
//   });

//   const closeModal = () => {
//     setIsOpen(false);
//   };

//   if (isLoading) return <ProductDetailsSkeleton />;

//   const {
//     image,
//     name,
//     description,
//     category,
//     quantity,
//     price,
//     seller,
//     minimumOrder = 1,
//   } = product;

//   /**
//    * ORDER ELIGIBILITY LOGIC
//    */
//   const isOrderDisabled =
//     quantity < minimumOrder || role === "seller" || role === "admin";

//   return (
//     <Container>
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//       >
//         <div className="mx-auto w-full max-w-7xl px-4 py-6">
//           <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Image Section */}
//             <div className="w-full">
//               <motion.div
//                 initial={{ scale: 0.96, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.6, ease: "easeOut" }}
//                 className="relative w-full aspect-[4/3] sm:aspect-[16/9] lg:aspect-square overflow-hidden rounded-2xl border border-sky-200/40 dark:border-sky-500/20 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md shadow-md"
//               >
//                 <img
//                   className="h-full w-full object-cover"
//                   src={image}
//                   alt="Product image"
//                 />
//               </motion.div>
//             </div>

//             {/* Content Section */}
//             <div className="flex flex-col gap-6">
//               <Heading title={name} subtitle={`Category: ${category}`} />

//               <div className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
//                 {description}
//               </div>

//               {/* Seller */}
//               <div className="flex items-center gap-3">
//                 <img
//                   className="h-10 w-10 rounded-full object-cover ring-2 ring-sky-400/30"
//                   alt="Seller avatar"
//                   referrerPolicy="no-referrer"
//                   src={seller?.image}
//                 />
//                 <p className="text-sm sm:text-base text-slate-700 dark:text-slate-200">
//                   Seller: <span className="font-semibold">{seller?.name}</span>
//                 </p>
//               </div>

//               {/* Quantity */}
//               <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
//                 Available Quantity:{" "}
//                 <span className="font-semibold">{quantity}</span>
//               </div>

//               {/* Minimum Order */}
//               <div className="text-sm sm:text-base text-slate-500 dark:text-slate-400">
//                 Minimum Order:{" "}
//                 <span className="font-semibold">{minimumOrder}</span>
//               </div>

//               {/* STOCK WARNING */}
//               {quantity < minimumOrder && (
//                 <p className="text-sm font-medium text-red-500">
//                   Not enough stock to meet the minimum order quantity.
//                 </p>
//               )}

//               {/* Price & Action */}
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-sky-200/30 dark:border-sky-500/20">
//                 <p className="text-2xl sm:text-3xl font-bold text-sky-700 dark:text-sky-400">
//                   ${price}
//                 </p>

//                 <div className="w-full sm:w-48">
//                   <Button
//                     onClick={() => setIsOpen(true)}
//                     label={
//                       quantity < minimumOrder
//                         ? `Minimum order is ${minimumOrder}`
//                         : "Order Now"
//                     }
//                     disabled={isOrderDisabled}
//                   />
//                 </div>
//               </div>

//               {/* Purchase Modal */}
//               <PurchaseModal
//                 product={product}
//                 closeModal={closeModal}
//                 isOpen={isOpen}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </Container>
//   );
// };

// export default ProductDetails;

//////////////////////////

// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import Button from "../../components/Shared/Button/Button";
// import PurchaseModal from "../../components/Modal/PurchaseModal";
// import { useContext, useMemo, useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
// import { motion, AnimatePresence } from "framer-motion";
// import { AuthContext } from "../../providers/AuthContext";
// import useRole from "../../hooks/useRole";

// const ProductDetails = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [role] = useRole();
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const { data: product = {}, isLoading } = useQuery({
//     queryKey: ["product", id],
//     queryFn: async () => {
//       const result = await axios(
//         `${import.meta.env.VITE_API_URL}/products/${id}`
//       );
//       return result.data;
//     },
//   });

//   const closeModal = () => setIsOpen(false);

//   const {
//     image,
//     images,
//     name,
//     description,
//     category,
//     quantity,
//     price,
//     seller,
//     minimumOrder = 1,
//     demoVideoLink,
//     paymentOption,
//   } = product || {};

//   // Build gallery (support new DB structure + fallback)
//   const gallery = useMemo(() => {
//     const arr = Array.isArray(images) ? images.filter(Boolean) : [];
//     if (image && !arr.includes(image)) arr.unshift(image);
//     return arr.length ? arr : [image].filter(Boolean);
//   }, [images, image]);

//   const [activeImage, setActiveImage] = useState(null);

//   // keep selected image valid after product loads
//   const currentImage = useMemo(() => {
//     const initial = gallery?.[0] || "";
//     if (!activeImage || !gallery.includes(activeImage)) return initial;
//     return activeImage;
//   }, [activeImage, gallery]);

//   const normalizedRole = (role || "").toLowerCase();

//   // ✅ user cannot order if seller/manager/admin OR not enough stock
//   const isPrivileged =
//     normalizedRole === "seller" ||
//     normalizedRole === "admin" ||
//     normalizedRole === "manager";

//   const isOrderDisabled = quantity < minimumOrder || isPrivileged;

//   if (isLoading) return <ProductDetailsSkeleton />;

//   return (
//     <Container>
//       <motion.div
//         initial={{ opacity: 0, y: 18 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.45, ease: "easeOut" }}
//       >
//         <div className="mx-auto w-full max-w-7xl px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Left: Image + thumbnails */}
//             <div className="w-full">
//               <div className="space-y-3">
//                 {/* Main Image (slightly smaller) */}
//                 <div
//                   className="
//                     relative overflow-hidden rounded-2xl
//                     border border-base-200
//                     bg-base-100/70 backdrop-blur
//                     shadow-sm
//                     max-w-xl mx-auto
//                   "
//                 >
//                   <div className="aspect-[4/3] sm:aspect-[16/10]">
//                     <AnimatePresence mode="wait">
//                       <motion.img
//                         key={currentImage}
//                         src={currentImage}
//                         alt={name || "Product"}
//                         className="h-full w-full object-cover"
//                         initial={{ opacity: 0, scale: 0.985 }}
//                         animate={{ opacity: 1, scale: 1 }}
//                         exit={{ opacity: 0, scale: 0.99 }}
//                         transition={{ duration: 0.25, ease: "easeOut" }}
//                       />
//                     </AnimatePresence>
//                   </div>

//                   {/* small overlay badge */}
//                   {paymentOption && (
//                     <div className="absolute left-3 top-3">
//                       <span className="badge badge-primary badge-outline uppercase">
//                         {paymentOption}
//                       </span>
//                     </div>
//                   )}
//                 </div>

//                 {/* Thumbnails */}
//                 {gallery.length > 1 && (
//                   <div className="max-w-xl mx-auto">
//                     <div className="flex gap-2 overflow-x-auto pb-1">
//                       {gallery.map((img, idx) => {
//                         const isActive = img === currentImage;
//                         return (
//                           <button
//                             key={`${img}-${idx}`}
//                             type="button"
//                             onClick={() => setActiveImage(img)}
//                             className={`
//                               relative shrink-0 rounded-xl overflow-hidden
//                               border transition
//                               ${
//                                 isActive
//                                   ? "border-primary"
//                                   : "border-base-200 hover:border-primary/50"
//                               }
//                             `}
//                             aria-label={`Preview image ${idx + 1}`}
//                           >
//                             <img
//                               src={img}
//                               alt={`Preview ${idx + 1}`}
//                               className="h-16 w-16 sm:h-18 sm:w-18 object-cover"
//                             />
//                             {isActive && (
//                               <span className="absolute inset-0 ring-2 ring-primary/40 rounded-xl" />
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                     <p className="mt-2 text-xs text-base-content/60">
//                       Click a thumbnail to preview.
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right: Content */}
//             <div className="flex flex-col gap-5">
//               <Heading title={name} subtitle={`Category: ${category || "—"}`} />

//               <div className="text-base sm:text-lg text-base-content/70 leading-relaxed">
//                 {description}
//               </div>

//               {/* Meta cards */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <div className="p-4 rounded-2xl border border-base-200 bg-base-200/40">
//                   <p className="text-xs text-base-content/60">Available</p>
//                   <p className="text-lg font-semibold text-base-content">
//                     {quantity}
//                   </p>
//                   <p className="text-xs text-base-content/60">
//                     MOQ: <span className="font-medium">{minimumOrder}</span>
//                   </p>
//                 </div>

//                 <div className="p-4 rounded-2xl border border-base-200 bg-base-200/40">
//                   <p className="text-xs text-base-content/60">Price</p>
//                   <p className="text-lg font-semibold text-base-content">
//                     ${price}
//                   </p>
//                   <p className="text-xs text-base-content/60">
//                     Payment:{" "}
//                     <span className="font-medium uppercase">
//                       {paymentOption || "—"}
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               {/* Seller */}
//               <div className="flex items-center gap-3">
//                 <img
//                   className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
//                   alt="Seller avatar"
//                   referrerPolicy="no-referrer"
//                   src={seller?.image}
//                 />
//                 <div className="min-w-0">
//                   <p className="text-sm sm:text-base text-base-content">
//                     Seller:{" "}
//                     <span className="font-semibold">{seller?.name || "—"}</span>
//                   </p>
//                   <p className="text-xs text-base-content/60 truncate">
//                     {seller?.email}
//                   </p>
//                 </div>
//               </div>

//               {/* Optional Demo Video */}
//               {demoVideoLink ? (
//                 <a
//                   href={demoVideoLink}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="link link-primary text-sm"
//                 >
//                   Watch demo video
//                 </a>
//               ) : null}

//               {/* Warnings */}
//               {quantity < minimumOrder && (
//                 <div className="alert alert-warning">
//                   <span>
//                     Not enough stock to meet the minimum order quantity.
//                   </span>
//                 </div>
//               )}

//               {isPrivileged && (
//                 <div className="alert">
//                   <span className="text-base-content/70">
//                     Ordering is disabled for <b>{role}</b> accounts.
//                   </span>
//                 </div>
//               )}

//               {/* Action */}
//               <div className="pt-4 border-t border-base-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//                 <p className="text-2xl sm:text-3xl font-bold text-primary">
//                   ${price}
//                 </p>

//                 <div className="w-full sm:w-56">
//                   <Button
//                     onClick={() => setIsOpen(true)}
//                     label={
//                       isPrivileged
//                         ? "Ordering Disabled"
//                         : quantity < minimumOrder
//                         ? `Minimum order is ${minimumOrder}`
//                         : "Order Now"
//                     }
//                     disabled={isOrderDisabled}
//                   />
//                 </div>
//               </div>

//               {/* Purchase Modal */}
//               <PurchaseModal
//                 product={product}
//                 closeModal={closeModal}
//                 isOpen={isOpen}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </Container>
//   );
// };

// export default ProductDetails;

/////////////////////

// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import Button from "../../components/Shared/Button/Button";
// import PurchaseModal from "../../components/Modal/PurchaseModal";
// import { useContext, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
// import { motion } from "framer-motion";
// import { AuthContext } from "../../providers/AuthContext";
// import useRole from "../../hooks/useRole";

// const ProductDetails = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [role] = useRole();
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const { data: product = {}, isLoading } = useQuery({
//     queryKey: ["product", id], // ✅ important
//     enabled: !!id, // ✅ important
//     queryFn: async () => {
//       const result = await axios(
//         `${import.meta.env.VITE_API_URL}/products/${id}`
//       );
//       return result.data;
//     },
//   });

//   const closeModal = () => setIsOpen(false);

//   if (isLoading) return <ProductDetailsSkeleton />;

//   const {
//     image,
//     images,
//     name,
//     description,
//     category,
//     quantity,
//     price,
//     seller,
//     minimumOrder = 1,
//   } = product;

//   // ✅ Multi-image preview (fallback to single image)
//   const gallery = useMemo(() => {
//     const arr = Array.isArray(images) ? images.filter(Boolean) : [];
//     if (arr.length) return arr;
//     return image ? [image] : [];
//   }, [images, image]);

//   const [activeImg, setActiveImg] = useState(gallery?.[0] || image || "");

//   // update active image when product changes
//   useMemo(() => {
//     setActiveImg(gallery?.[0] || image || "");
//   }, [id, gallery, image]);

//   const isOrderDisabled =
//     quantity < minimumOrder ||
//     role === "seller" ||
//     role === "admin" ||
//     role === "manager";

//   return (
//     <Container>
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35, ease: "easeOut" }}
//       >
//         <div className="mx-auto w-full max-w-7xl px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Images */}
//             <div className="w-full">
//               <div className="rounded-2xl border border-base-200 bg-base-100/60 backdrop-blur shadow-sm p-3">
//                 {/* Main image (slightly smaller) */}
//                 <div className="relative w-full aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-base-200">
//                   {activeImg ? (
//                     <img
//                       className="h-full w-full object-cover"
//                       src={activeImg}
//                       alt={name || "Product"}
//                     />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center text-base-content/50">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 {/* Thumbnails (reduced for small screens) */}
//                 {gallery.length > 1 && (
//                   <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
//                     {gallery.map((src) => {
//                       const isActive = src === activeImg;
//                       return (
//                         <button
//                           key={src}
//                           type="button"
//                           onClick={() => setActiveImg(src)}
//                           className={`shrink-0 rounded-xl border transition
//                             ${
//                               isActive
//                                 ? "border-primary"
//                                 : "border-base-200 hover:border-primary/50"
//                             }
//                           `}
//                         >
//                           <img
//                             src={src}
//                             alt="preview"
//                             className="
//                               object-cover rounded-xl
//                               w-14 h-14 sm:w-16 sm:h-16  // ✅ small screen smaller
//                             "
//                           />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex flex-col gap-6">
//               <Heading title={name} subtitle={`Category: ${category}`} />

//               <div className="text-base sm:text-lg text-base-content/80 leading-relaxed">
//                 {description}
//               </div>

//               <div className="flex items-center gap-3">
//                 <img
//                   className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
//                   alt="Seller avatar"
//                   referrerPolicy="no-referrer"
//                   src={seller?.image}
//                 />
//                 <p className="text-sm sm:text-base text-base-content">
//                   Seller: <span className="font-semibold">{seller?.name}</span>
//                 </p>
//               </div>

//               <div className="text-sm sm:text-base text-base-content/70">
//                 Available Quantity:{" "}
//                 <span className="font-semibold">{quantity}</span>
//               </div>

//               <div className="text-sm sm:text-base text-base-content/70">
//                 Minimum Order:{" "}
//                 <span className="font-semibold">{minimumOrder}</span>
//               </div>

//               {quantity < minimumOrder && (
//                 <p className="text-sm font-medium text-error">
//                   Not enough stock to meet the minimum order quantity.
//                 </p>
//               )}

//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-base-200">
//                 <p className="text-2xl sm:text-3xl font-bold text-primary">
//                   ${price}
//                 </p>

//                 <div className="w-full sm:w-56">
//                   <Button
//                     onClick={() => setIsOpen(true)}
//                     label={
//                       quantity < minimumOrder
//                         ? `Minimum order is ${minimumOrder}`
//                         : "Order Now"
//                     }
//                     disabled={isOrderDisabled}
//                   />
//                 </div>
//               </div>

//               <PurchaseModal
//                 product={product}
//                 closeModal={closeModal}
//                 isOpen={isOpen}
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </Container>
//   );
// };

// export default ProductDetails;

/////////////

// import Container from "../../components/Shared/Container";
// import Heading from "../../components/Shared/Heading";
// import Button from "../../components/Shared/Button/Button";
// import PurchaseModal from "../../components/Modal/PurchaseModal";
// import { useContext, useEffect, useMemo, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
// import { motion } from "framer-motion";
// import { AuthContext } from "../../providers/AuthContext";
// import useRole from "../../hooks/useRole";

// const ProductDetails = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [role] = useRole();
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);

//   const {
//     data: product = {},
//     isLoading,
//     refetch, // ✅ for purchase modal refetch after COD
//   } = useQuery({
//     queryKey: ["product", id],
//     enabled: !!id,
//     queryFn: async () => {
//       const result = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products/${id}`
//       );
//       return result.data;
//     },
//   });

//   const closeModal = () => setIsOpen(false);

//   if (isLoading) return <ProductDetailsSkeleton />;

//   const {
//     image,
//     images,
//     name,
//     description,
//     category,
//     quantity,
//     price,
//     seller,
//     minimumOrder = 1,
//     paymentOption, // ✅ from new DB
//   } = product || {};

//   // ✅ Multi-image gallery (supports new + old)
//   const gallery = useMemo(() => {
//     const arr = Array.isArray(images) ? images.filter(Boolean) : [];
//     if (image && !arr.includes(image)) arr.unshift(image);
//     return arr.length ? arr : image ? [image] : [];
//   }, [images, image]);

//   const [activeImg, setActiveImg] = useState(gallery?.[0] || "");

//   // ✅ Update active image when product/galleries change
//   useEffect(() => {
//     setActiveImg(gallery?.[0] || "");
//   }, [id, gallery]);

//   // ✅ Payment label badge
//   const paymentLabel =
//     (paymentOption || "cod").toLowerCase() === "payfirst"
//       ? "PayFirst"
//       : "Cash on Delivery";

//   const isOrderDisabled =
//     quantity < minimumOrder ||
//     role === "seller" ||
//     role === "admin" ||
//     role === "manager";

//   return (
//     <Container>
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.35, ease: "easeOut" }}
//       >
//         <div className="mx-auto w-full max-w-7xl px-4 py-6">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
//             {/* Images */}
//             <div className="w-full">
//               <div className="rounded-2xl border border-base-200 bg-base-100/60 backdrop-blur shadow-sm p-3">
//                 {/* Main image */}
//                 <div className="relative w-full aspect-[4/3] lg:aspect-square overflow-hidden rounded-2xl bg-base-200">
//                   {activeImg ? (
//                     <img
//                       className="h-full w-full object-cover"
//                       src={activeImg}
//                       alt={name || "Product"}
//                     />
//                   ) : (
//                     <div className="h-full w-full flex items-center justify-center text-base-content/50">
//                       No Image
//                     </div>
//                   )}
//                 </div>

//                 {/* Thumbnails */}
//                 {gallery.length > 1 && (
//                   <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
//                     {gallery.map((src, idx) => {
//                       const isActive = src === activeImg;
//                       return (
//                         <button
//                           key={`${src}-${idx}`}
//                           type="button"
//                           onClick={() => setActiveImg(src)}
//                           className={`shrink-0 rounded-xl border transition
//                             ${
//                               isActive
//                                 ? "border-primary"
//                                 : "border-base-200 hover:border-primary/50"
//                             }
//                           `}
//                         >
//                           <img
//                             src={src}
//                             alt="preview"
//                             className="
//                               object-cover rounded-xl
//                               w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
//                             "
//                           />
//                         </button>
//                       );
//                     })}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Content */}
//             <div className="flex flex-col gap-6">
//               {/* Title + Payment Badge */}
//               <div className="flex flex-wrap items-start gap-2">
//                 <div className="min-w-0">
//                   <Heading title={name} subtitle={`Category: ${category}`} />
//                 </div>
//                 <span className="badge badge-primary badge-outline mt-1">
//                   {paymentLabel}
//                 </span>
//               </div>

//               <div className="text-base sm:text-lg text-base-content/80 leading-relaxed">
//                 {description}
//               </div>

//               {/* Seller */}
//               <div className="flex items-center gap-3">
//                 <img
//                   className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
//                   alt="Seller avatar"
//                   referrerPolicy="no-referrer"
//                   src={seller?.image}
//                 />
//                 <p className="text-sm sm:text-base text-base-content">
//                   Seller:{" "}
//                   <span className="font-semibold">{seller?.name || "-"}</span>
//                 </p>
//               </div>

//               <div className="text-sm sm:text-base text-base-content/70">
//                 Available Quantity:{" "}
//                 <span className="font-semibold">{quantity}</span>
//               </div>

//               <div className="text-sm sm:text-base text-base-content/70">
//                 Minimum Order:{" "}
//                 <span className="font-semibold">{minimumOrder}</span>
//               </div>

//               {quantity < minimumOrder && (
//                 <p className="text-sm font-medium text-error">
//                   Not enough stock to meet the minimum order quantity.
//                 </p>
//               )}

//               {/* Price + Action */}
//               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-base-200">
//                 <p className="text-2xl sm:text-3xl font-bold text-primary">
//                   ${price}
//                 </p>

//                 <div className="w-full sm:w-56">
//                   <Button
//                     onClick={() => setIsOpen(true)}
//                     label={
//                       quantity < minimumOrder
//                         ? `Minimum order is ${minimumOrder}`
//                         : "Order Now"
//                     }
//                     disabled={isOrderDisabled}
//                   />
//                 </div>
//               </div>

//               {/* Purchase Modal */}
//               <PurchaseModal
//                 product={product}
//                 closeModal={closeModal}
//                 isOpen={isOpen}
//                 activeImage={activeImg} // ✅ ensures order payload uses selected image
//                 refetchProduct={refetch} // ✅ so COD orders update quantity without reload
//               />
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </Container>
//   );
// };

// export default ProductDetails;

/////

import Container from "../../components/Shared/Container";
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
import PurchaseModal from "../../components/Modal/PurchaseModal";
import { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProductDetailsSkeleton from "../../components/Skeleton/ProductDetailsSceleton";
import { motion } from "framer-motion";
import { AuthContext } from "../../providers/AuthContext";
import useRole from "../../hooks/useRole";

const ProductDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [role] = useRole();
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    data: product = {},
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["product", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}`
      );
      return res.data;
    },
  });

  const {
    image,
    images,
    name,
    description,
    category,
    quantity = 0,
    price = 0,
    seller,
    minimumOrder = 1,
    paymentOption, // "cod" | "payfirst"
  } = product || {};

  // ✅ Build gallery safely (supports new + old db)
  const gallery = useMemo(() => {
    const arr = Array.isArray(images) ? images.filter(Boolean) : [];
    if (image && !arr.includes(image)) arr.unshift(image);
    return arr;
  }, [images, image]);

  // ✅ Active image state
  const [activeImg, setActiveImg] = useState("");

  // ✅ Set default active image when product/gallery changes
  useEffect(() => {
    setActiveImg(gallery?.[0] || "");
  }, [gallery, id]);

  const closeModal = () => setIsOpen(false);

  const isOrderDisabled =
    quantity < minimumOrder ||
    role === "seller" ||
    role === "admin" ||
    role === "manager";

  const paymentLabel =
    (paymentOption || "").toLowerCase() === "cod"
      ? "Cash on Delivery"
      : (paymentOption || "").toLowerCase() === "payfirst"
      ? "Pay First (Online)"
      : "Online / COD";

  if (isLoading) return <ProductDetailsSkeleton />;

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <div className="w-full">
              <div className="rounded-2xl border border-base-200 bg-base-100/60 backdrop-blur shadow-sm p-3">
                {/* Main image (slightly smaller) */}
                <div className="relative w-full aspect-[4/3] lg:aspect-[5/4] overflow-hidden rounded-2xl bg-base-200">
                  {activeImg ? (
                    <img
                      className="h-full w-full object-cover"
                      src={activeImg}
                      alt={name || "Product"}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-base-content/50">
                      No Image
                    </div>
                  )}
                </div>

                {/* Thumbnails (smaller on small screens) */}
                {gallery.length > 1 && (
                  <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                    {gallery.map((src) => {
                      const isActive = src === activeImg;
                      return (
                        <button
                          key={src}
                          type="button"
                          onClick={() => setActiveImg(src)}
                          className={`shrink-0 rounded-xl border transition ${
                            isActive
                              ? "border-primary"
                              : "border-base-200 hover:border-primary/50"
                          }`}
                        >
                          <img
                            src={src}
                            alt="preview"
                            className="object-cover rounded-xl w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-6">
              <Heading title={name} subtitle={`Category: ${category}`} />

              <div className="text-base sm:text-lg text-base-content/80 leading-relaxed">
                {description}
              </div>

              {/* Seller */}
              <div className="flex items-center gap-3">
                <img
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                  alt="Seller avatar"
                  referrerPolicy="no-referrer"
                  src={seller?.image}
                />
                <p className="text-sm sm:text-base text-base-content">
                  Seller: <span className="font-semibold">{seller?.name}</span>
                </p>
              </div>

              {/* Stock & MOQ */}
              <div className="text-sm sm:text-base text-base-content/70">
                Available Quantity:{" "}
                <span className="font-semibold">{quantity}</span>
              </div>

              <div className="text-sm sm:text-base text-base-content/70">
                Minimum Order:{" "}
                <span className="font-semibold">{minimumOrder}</span>
              </div>

              {/* Payment info */}
              <div className="text-sm sm:text-base text-base-content/70">
                Payment: <span className="font-semibold">{paymentLabel}</span>
              </div>

              {quantity < minimumOrder && (
                <p className="text-sm font-medium text-error">
                  Not enough stock to meet the minimum order quantity.
                </p>
              )}

              {/* Price + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-base-200">
                <p className="text-2xl sm:text-3xl font-bold text-primary">
                  ${price}
                </p>

                <div className="w-full sm:w-56">
                  <Button
                    onClick={() => setIsOpen(true)}
                    label={
                      quantity < minimumOrder
                        ? `Minimum order is ${minimumOrder}`
                        : "Order Now"
                    }
                    disabled={isOrderDisabled}
                  />
                </div>
              </div>

              {/* Purchase Modal (pass refetch so quantity updates immediately after COD) */}
              <PurchaseModal
                product={product}
                closeModal={closeModal}
                isOpen={isOpen}
                refetchProduct={refetch}
                activeImage={activeImg}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

export default ProductDetails;
