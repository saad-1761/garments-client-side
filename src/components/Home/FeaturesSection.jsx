import { FiShield, FiTruck, FiRepeat, FiCheckCircle } from "react-icons/fi";
import Container from "../Shared/Container";

const features = [
  {
    title: "Verified Sellers",
    desc: "Work with trusted sellers who pass our verification checks.",
    icon: FiCheckCircle,
  },
  {
    title: "Secure Payments",
    desc: "Safer checkout flow with payment status tracking.",
    icon: FiShield,
  },
  {
    title: "Production Tracking",
    desc: "Track order progress from cutting to delivery updates.",
    icon: FiRepeat,
  },
  {
    title: "Fast Delivery",
    desc: "Clear timelines and updates for smooth delivery.",
    icon: FiTruck,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-base-100">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-base-content">
              Why Fabrica?
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              Built for bulk garment orders with transparency and control.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="card bg-base-200/40 border border-base-200 shadow-sm"
            >
              <div className="card-body p-5">
                <div className="flex items-center gap-3">
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20">
                    <f.icon className="w-5 h-5 text-primary" />
                  </span>
                  <h3 className="font-semibold text-base-content">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;
