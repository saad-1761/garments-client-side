import Container from "../../components/Shared/Container";

const ProductionTracking = () => {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Production Tracking
        </h1>
        <p className="mt-3 text-base-content/70 leading-relaxed max-w-3xl">
          Track production steps like Cutting, Sewing, Finishing, QC, Packing and Shipping.
          Customers see a read-only timeline and sellers update progress.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl bg-base-200/40 border border-base-200 p-5">
            <h3 className="font-semibold text-base-content">Customer View</h3>
            <p className="mt-2 text-sm text-base-content/70">
              See updates in a timeline, latest step highlighted, order remains viewable.
            </p>
          </div>
          <div className="rounded-2xl bg-base-200/40 border border-base-200 p-5">
            <h3 className="font-semibold text-base-content">Seller/Manager Updates</h3>
            <p className="mt-2 text-sm text-base-content/70">
              Add tracking updates only after an order is approved (secure role checks).
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductionTracking;
