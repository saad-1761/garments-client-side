import Banner from "../../components/Home/Banner";
import LatestProducts from "../../components/Home/LatestProducts";
import Container from "../../components/Shared/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner />
      </Container>

      <LatestProducts />
      {/* More components */}
    </div>
  );
};

export default Home;
