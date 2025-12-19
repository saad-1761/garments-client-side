import { Link } from "react-router";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 border-t border-base-300">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold tracking-wide">La Fabrica</h2>
            <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
              A modern garments production platform connecting manufacturers,
              sellers, and buyers with transparency and scale.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-5">
              {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map(
                (Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label="Social link"
                    className="
                    p-2 rounded-full
                    border border-base-300
                    text-base-content/70
                    hover:text-primary
                    hover:border-primary
                    transition
                  "
                  >
                    <Icon size={14} />
                  </a>
                )
              )}
            </div>
          </div>

          {/* Services */}
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Services
            </h6>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>Bulk Garment Orders</li>
              <li>Verified Sellers</li>
              <li>Production Tracking</li>
              <li>Secure Payments</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Company
            </h6>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>
                <Link to="/about" className="hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/all-products"
                  className="hover:text-primary transition"
                >
                  Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h6 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Legal
            </h6>
            <ul className="space-y-2 text-sm text-base-content/70">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-base-content/60">
          <p>© {new Date().getFullYear()} La Fabrica. All rights reserved.</p>

          <p className="text-center sm:text-right">
            Built for modern garment manufacturing.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
