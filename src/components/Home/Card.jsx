// import { Link } from "react-router";
// import { motion } from "framer-motion";

// const cardVariants = {
//   hidden: {
//     opacity: 0,
//     y: 30,
//   },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.45,
//       ease: "easeOut",
//     },
//   },
// };

// const Card = ({ product }) => {
//   const { _id, name, image, quantity, price, category } = product || {};

//   return (
//     <motion.div
//       variants={cardVariants}
//       initial="hidden"
//       animate="visible"
//       whileHover={{ y: -6, scale: 1.02 }}
//       whileTap={{ scale: 0.98 }}
//       className="h-full"
//     >
//       <Link
//         to={`/product/${_id}`}
//         className="
//           group col-span-1
//           rounded-2xl
//           overflow-hidden
//           border
//           border-sky-200/40 dark:border-sky-500/20
//           bg-white/80 dark:bg-slate-900/70
//           backdrop-blur-md
//           shadow-sm hover:shadow-xl
//           transition-shadow duration-300
//           block h-full
//         "
//       >
//         <div className="flex flex-col h-full">
//           {/* Image */}
//           <div className="relative aspect-square overflow-hidden">
//             <img
//               src={image}
//               alt="Product Image"
//               className="
//                 h-full w-full object-cover
//                 transition-transform duration-500
//                 group-hover:scale-110
//               "
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
//           </div>

//           {/* Content */}
//           <div className="flex flex-col gap-2 p-4">
//             <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
//               {name}
//             </h3>

//             <p className="text-sm text-slate-600 dark:text-slate-400">
//               Category: <span className="font-medium">{category}</span>
//             </p>

//             <p className="text-sm text-slate-600 dark:text-slate-400">
//               Quantity: <span className="font-medium">{quantity}</span>
//             </p>

//             <div className="mt-auto pt-3 flex items-center justify-between">
//               <span className="text-base font-semibold text-sky-700 dark:text-sky-400">
//                 Price: {price}$
//               </span>

//               <span
//                 className="
//                   text-xs font-medium
//                   px-3 py-1
//                   rounded-full
//                   bg-sky-100/70 dark:bg-sky-500/10
//                   text-sky-700 dark:text-sky-300
//                   opacity-0 group-hover:opacity-100
//                   transition
//                 "
//               >
//                 View
//               </span>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default Card;
/////////////

import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const prettyPayment = (v) => {
  const x = (v || "").toLowerCase();
  if (x === "cod") return "COD";
  if (x === "payfirst") return "PayFirst";
  if (x === "online") return "Online";
  return v || "—";
};

const Card = ({ product }) => {
  console.log("product id:", product?._id);

  const { _id, name, image, images, quantity, price, category, paymentOption } =
    product || {};

  const cover =
    (Array.isArray(images) && images.length > 0 && images[0]) || image;

  const stockLabel =
    typeof quantity === "number" ? `${quantity} in stock` : "Stock —";

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <div
        className="
          h-full rounded-2xl overflow-hidden
          border border-base-200
          bg-base-100/70 backdrop-blur
          shadow-sm hover:shadow-xl
          transition-shadow duration-300
        "
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-base-200">
          {cover ? (
            <img
              src={cover}
              alt={name || "Product"}
              className="
                h-full w-full object-cover
                transition-transform duration-500
                hover:scale-105
              "
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-base-content/50">
              No Image
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            <span className="badge badge-primary badge-sm">
              {prettyPayment(paymentOption)}
            </span>
            <span className="badge badge-ghost badge-sm bg-base-100/70 border border-base-200">
              {stockLabel}
            </span>
          </div>

          {/* Fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 hover:opacity-100 transition" />
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col gap-2 h-[170px]">
          <h3 className="text-lg font-semibold text-base-content line-clamp-1">
            {name}
          </h3>

          <p className="text-sm text-base-content/70">
            Category: <span className="font-medium">{category || "—"}</span>
          </p>

          <div className="mt-auto flex items-center justify-between">
            <span className="text-base font-semibold text-primary">
              ${price ?? 0}
            </span>

            <Link
              to={`/product/${_id}`}
              className="btn btn-sm btn-outline btn-primary"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;
