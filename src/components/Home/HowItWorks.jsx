import { motion } from "framer-motion";
import { FaUserCheck, FaTshirt, FaBoxes, FaCreditCard } from "react-icons/fa";

const steps = [
  {
    icon: FaUserCheck,
    title: "Create an Account",
    description:
      "Register as a buyer or seller. Sellers can list garments, while buyers can explore products available for bulk ordering.",
  },
  {
    icon: FaTshirt,
    title: "List or Browse Products",
    description:
      "Sellers upload product details including quantity, category, and pricing. Buyers browse verified garments from trusted sellers.",
  },
  {
    icon: FaBoxes,
    title: "Order or Sell in Bulk",
    description:
      "Buyers place bulk orders directly from product pages. Sellers manage inventory and confirm large-scale garment orders.",
  },
  {
    icon: FaCreditCard,
    title: "Secure Payment & Delivery",
    description:
      "Complete payments securely. Orders are processed, packaged, and delivered according to agreed production timelines.",
  },
];

const HowItWorks = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-blue-900 dark:text-blue-100">
          How It Works
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm md:text-base">
          A streamlined process designed for efficient garment production, bulk
          ordering, and seller collaboration.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="
                group
                rounded-2xl
                border
                border-slate-200 dark:border-slate-800
                bg-white/70 dark:bg-slate-900/60
                backdrop-blur
                p-6
                shadow-sm
                hover:shadow-md
                transition
              "
            >
              {/* Icon */}
              <div
                className="
                  flex
                  items-center
                  justify-center
                  h-12
                  w-12
                  rounded-xl
                  bg-sky-100
                  text-sky-600
                  dark:bg-sky-900/40
                  dark:text-sky-400
                  mb-4
                "
              >
                <Icon size={22} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;
