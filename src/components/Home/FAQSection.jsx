import Container from "../Shared/Container";

const faqs = [
  {
    q: "Can I order without creating an account?",
    a: "You need an account to place orders and track production updates.",
  },
  {
    q: "How does production tracking work?",
    a: "Sellers update tracking steps after approval. Customers can view a read-only timeline.",
  },
  {
    q: "What payment methods are supported?",
    a: "Products can support COD or PayFirst (online) depending on seller settings.",
  },
  {
    q: "Can a seller place an order?",
    a: "Sellers/Managers cannot place orders by design.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-base-100">
      <Container>
        <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
          FAQ
        </h2>
        <p className="text-sm text-base-content/70 mt-1">
          Common questions about ordering and tracking.
        </p>

        <div className="mt-6 space-y-3">
          {faqs.map((f) => (
            <div key={f.q} className="collapse collapse-arrow bg-base-200/40 border border-base-200 rounded-2xl">
              <input type="checkbox" />
              <div className="collapse-title text-base font-semibold text-base-content">
                {f.q}
              </div>
              <div className="collapse-content">
                <p className="text-sm text-base-content/70 leading-relaxed">{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQSection;
