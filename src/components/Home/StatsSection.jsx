import Container from "../Shared/Container";

const stats = [
  { label: "Products Listed", value: "500+" },
  { label: "Verified Sellers", value: "120+" },
  { label: "Orders Tracked", value: "2,000+" },
  { label: "Avg. Response Time", value: "< 2 hours" },
];

const StatsSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-base-100">
      <Container>
        <div className="rounded-3xl border border-base-200 bg-base-200/40 p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
            Platform Highlights
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            A quick snapshot of what you can expect.
          </p>

          <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-base-100/60 border border-base-200 p-5">
                <p className="text-2xl sm:text-3xl font-bold text-primary">{s.value}</p>
                <p className="mt-1 text-sm text-base-content/70">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StatsSection;
