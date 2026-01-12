import Container from "../../components/Shared/Container";

const VerifiedSellers = () => {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Verified Sellers
        </h1>
        <p className="mt-3 text-base-content/70 leading-relaxed max-w-3xl">
          Verified sellers help ensure a smoother bulk ordering experience.
          This page is informational (frontend-only).
        </p>

        <div className="mt-6 rounded-3xl border border-base-200 bg-base-200/40 p-6">
          <ul className="list-disc pl-5 text-sm sm:text-base text-base-content/70 space-y-2">
            <li>Profile completion & identity checks</li>
            <li>Consistent order fulfillment history</li>
            <li>Clear product details including MOQ and payment option</li>
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default VerifiedSellers;
