/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Container from "../../components/Shared/Container";

const Contact = () => {
  return (
    <Container>
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="py-16"
      >
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Get in <span className="text-primary">Touch</span>
          </h1>
          <p className="text-base-content/70 text-lg">
            Have questions about orders, selling, or partnerships? We’re here to
            help.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Information</h2>

            <p className="text-base-content/70 leading-relaxed">
              Reach out to La Fabrica for support, business inquiries, or
              collaboration opportunities in the garments production sector.
            </p>

            <div className="space-y-3 text-sm">
              <p>
                <span className="font-medium">Email:</span>{" "}
                support@lafabrica.com
              </p>
              <p>
                <span className="font-medium">Phone:</span> +880 1234 567 890
              </p>
              <p>
                <span className="font-medium">Location:</span> Dhaka, Bangladesh
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="
              bg-base-100
              border border-base-300
              rounded-xl
              p-8
              space-y-6
            "
          >
            <div>
              <label className="text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input input-bordered w-full mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="textarea textarea-bordered w-full mt-1"
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </motion.section>
    </Container>
  );
};

export default Contact;
