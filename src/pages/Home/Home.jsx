import Banner from "../../components/Home/Banner";
import HowItWorks from "../../components/Home/HowItWorks";
import LatestProducts from "../../components/Home/LatestProducts";
import Container from "../../components/Shared/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner />
      </Container>

      <LatestProducts />
      <HowItWorks />
      {/* More components */}
    </div>
  );
};

export default Home;
