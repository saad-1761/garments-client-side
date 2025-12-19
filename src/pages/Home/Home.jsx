import Banner from "../../components/Home/Banner";
import HowItWorks from "../../components/Home/HowItWorks";
import LatestProducts from "../../components/Home/LatestProducts";
import NewsLetter from "../../components/Home/NewsLetter";
import Reviews from "../../components/Home/Reviews";
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
      <Reviews />
      <NewsLetter />
    </div>
  );
};

export default Home;
