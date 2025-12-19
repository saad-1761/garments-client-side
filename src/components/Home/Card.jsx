import { Link } from "react-router";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

const Card = ({ product }) => {
  const { _id, name, image, quantity, price, category } = product || {};

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="h-full"
    >
      <Link
        to={`/product/${_id}`}
        className="
          group col-span-1
          rounded-2xl
          overflow-hidden
          border
          border-sky-200/40 dark:border-sky-500/20
          bg-white/80 dark:bg-slate-900/70
          backdrop-blur-md
          shadow-sm hover:shadow-xl
          transition-shadow duration-300
          block h-full
        "
      >
        <div className="flex flex-col h-full">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden">
            <img
              src={image}
              alt="Product Image"
              className="
                h-full w-full object-cover
                transition-transform duration-500
                group-hover:scale-110
              "
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-2 p-4">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 line-clamp-1">
              {name}
            </h3>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Category: <span className="font-medium">{category}</span>
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              Quantity: <span className="font-medium">{quantity}</span>
            </p>

            <div className="mt-auto pt-3 flex items-center justify-between">
              <span className="text-base font-semibold text-sky-700 dark:text-sky-400">
                Price: {price}$
              </span>

              <span
                className="
                  text-xs font-medium
                  px-3 py-1
                  rounded-full
                  bg-sky-100/70 dark:bg-sky-500/10
                  text-sky-700 dark:text-sky-300
                  opacity-0 group-hover:opacity-100
                  transition
                "
              >
                View
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default Card;
