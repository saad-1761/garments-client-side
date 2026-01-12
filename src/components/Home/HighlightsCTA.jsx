import { Link } from "react-router-dom";
import Container from "../Shared/Container";

const HighlightsCTA = () => {
  return (
    <section className="py-10 sm:py-14 bg-base-100">
      <Container>
        <div className="rounded-3xl border border-primary/20 bg-primary/10 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
                Ready to place a bulk garment order?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-base-content/70 leading-relaxed">
                Compare products, order with confidence, and track production updates
                — all from one dashboard.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/all-products" className="btn btn-primary">
                Browse Products
              </Link>
              <Link to="/bulk-garment-orders" className="btn btn-outline btn-primary">
                Bulk Orders
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HighlightsCTA;
