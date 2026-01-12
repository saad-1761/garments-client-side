import Container from "../../components/Shared/Container";

const PrivacyPolicy = () => {
  return (
    <Container>
      <div className="py-10 sm:py-14 max-w-4xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-base-content">
          Privacy Policy
        </h1>
        <p className="mt-4 text-base-content/70 leading-relaxed">
          This is a demo Privacy Policy page. Add details about data collection,
          authentication, and storage practices here.
        </p>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;
