import Banner from "../../components/Home/Banner";
import CategoriesSection from "../../components/Home/CategoriesSection";
import FAQSection from "../../components/Home/FAQSection";
import FeaturesSection from "../../components/Home/FeaturesSection";
import HighlightsCTA from "../../components/Home/HighlightsCTA";
import HowItWorks from "../../components/Home/HowItWorks";
import LatestProducts from "../../components/Home/LatestProducts";
import NewsLetter from "../../components/Home/NewsLetter";
import Reviews from "../../components/Home/Reviews";
import StatsSection from "../../components/Home/StatsSection";
import Container from "../../components/Shared/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <Banner />
      </Container>
<FeaturesSection/>
      <LatestProducts />
      <CategoriesSection/>
      <HowItWorks />
      {/* More components */}
      <StatsSection></StatsSection>
      <Reviews />
      <HighlightsCTA></HighlightsCTA>
      <FAQSection></FAQSection>
      <NewsLetter />
    </div>
  );
};

export default Home;
