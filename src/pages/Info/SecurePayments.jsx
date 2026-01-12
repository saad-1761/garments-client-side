import Container from "../../components/Shared/Container";

const SecurePayments = () => {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Secure Payments
        </h1>
        <p className="mt-3 text-base-content/70 leading-relaxed max-w-3xl">
          Products can support COD or PayFirst (online) depending on seller settings.
          We store payment status and order details for clarity.
        </p>

        <div className="mt-6 rounded-3xl border border-base-200 bg-base-200/40 p-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <span className="badge badge-primary badge-outline">COD</span>
            <span className="badge badge-primary badge-outline">PayFirst</span>
            <span className="badge badge-ghost">Status Tracking</span>
          </div>
          <p className="mt-3 text-sm text-base-content/70">
            Payment availability is shown on product details and enforced on checkout.
          </p>
        </div>
      </div>
    </Container>
  );
};

export default SecurePayments;
