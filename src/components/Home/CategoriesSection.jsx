import Container from "../Shared/Container";

const categories = [
  { name: "Shirts", hint: "Corporate & casual bulk orders" },
  { name: "T-Shirts", hint: "Events, campaigns & uniforms" },
  { name: "Hoodies", hint: "Premium winter collections" },
  { name: "Pants", hint: "Workwear & fashion lines" },
  { name: "Jackets", hint: "Outerwear manufacturing" },
  { name: "Accessories", hint: "Brand add-ons & packaging" },
];

const CategoriesSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-base-100">
      <Container>
        <div className="flex items-end justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
              Browse by Category
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              Quickly explore items based on your production needs.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-base-200 bg-base-200/40 p-5 hover:border-primary/40 transition"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-base-content">{c.name}</h3>
                <span className="badge badge-primary badge-outline">Explore</span>
              </div>
              <p className="mt-2 text-sm text-base-content/70">{c.hint}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
