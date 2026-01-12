import Container from "../../components/Shared/Container";

const BulkGarmentOrders = () => {
  return (
    <Container>
      <div className="py-10 sm:py-14">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Bulk Garment Orders
        </h1>
        <p className="mt-3 text-base-content/70 leading-relaxed max-w-3xl">
          Place large quantity orders with clear MOQ, secure checkout options, and
          order tracking. This page is informational (frontend-only).
        </p>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {[
            ["MOQ based ordering", "Order only when MOQ is satisfied."],
            ["Production timeline", "Follow updates from approval to delivery."],
            ["Seller communication", "Review product details before ordering."],
          ].map(([title, desc]) => (
            <div key={title} className="rounded-2xl bg-base-200/40 border border-base-200 p-5">
              <h3 className="font-semibold text-base-content">{title}</h3>
              <p className="mt-2 text-sm text-base-content/70">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BulkGarmentOrders;
