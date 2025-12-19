import { motion } from "framer-motion";

const NewsLetter = () => {
  return (
    <section className="py-16 bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-base-300
            bg-base-200/60
            backdrop-blur-xl
            p-6
            sm:p-8
            md:p-10
          "
        >
          {/* Decorative Gradient Accent */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-cyan-400/10 via-blue-500/10 to-indigo-500/10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="max-w-xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-semibold">
                Stay Updated with Industry Insights
              </h2>
              <p className="mt-3 text-base-content/70 text-sm sm:text-base">
                Get updates on new garment lots, verified sellers, pricing
                trends, and platform features—delivered straight to your inbox.
              </p>
            </div>

            {/* Right Form */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full md:w-auto flex flex-col sm:flex-row items-stretch gap-3"
            >
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="
                  w-full
                  sm:w-72
                  rounded-lg
                  px-4
                  py-3
                  text-sm
                  bg-base-100
                  border
                  border-base-300
                  focus:outline-none
                  focus:ring-2
                  focus:ring-cyan-400
                "
              />

              <button
                type="submit"
                className="
                  rounded-lg
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  bg-gradient-to-r
                  from-cyan-500
                  via-blue-500
                  to-indigo-500
                  hover:opacity-90
                  transition
                "
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsLetter;
