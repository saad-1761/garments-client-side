import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

const About = () => {
  return (
    <Container>
      <section className="py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">
            About <span className="text-primary">La Fabrica</span>
          </h1>
          <p className="text-base-content/70 text-lg">
            A trusted digital ecosystem for large-scale garments production,
            connecting buyers and manufacturers with transparency.
          </p>
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold">Who We Are</h2>
            <p className="text-base-content/70 leading-relaxed">
              La Fabrica is a modern garments production platform designed for
              bulk ordering, verified sellers, and seamless transaction
              management.
            </p>
            <p className="text-base-content/70 leading-relaxed">
              Our mission is to simplify procurement while ensuring trust,
              efficiency, and accountability across the supply chain.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                title: "Verified Sellers",
                desc: "All sellers go through a verification process.",
              },
              {
                title: "Bulk Orders",
                desc: "Optimized for wholesale and large production runs.",
              },
              {
                title: "Secure Payments",
                desc: "End-to-end protected transactions.",
              },
              {
                title: "Transparent Workflow",
                desc: "Clear pricing, timelines, and quantities.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="
                  bg-base-100
                  border border-base-300
                  rounded-xl
                  p-6
                  hover:border-primary
                  transition
                "
              >
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-base-content/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {[
              {
                q: "Who can sell on La Fabrica?",
                a: "Only verified garment manufacturers and approved sellers can list products to ensure quality and trust.",
              },
              {
                q: "Is La Fabrica suitable for small orders?",
                a: "The platform is optimized for bulk and wholesale orders, but minimum order quantities depend on sellers.",
              },
              {
                q: "How are payments handled?",
                a: "Payments are processed securely through protected gateways, ensuring safety for both buyers and sellers.",
              },
              {
                q: "Can I track my order?",
                a: "Yes. Order status, production progress, and delivery updates are available in real time.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="
                  collapse collapse-arrow
                  bg-base-100
                  border border-base-300
                  rounded-xl
                "
              >
                <input type="checkbox" />
                <div className="collapse-title font-medium">{item.q}</div>
                <div className="collapse-content text-base-content/70">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </Container>
  );
};

export default About;
