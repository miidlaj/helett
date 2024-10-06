import LandingCarousel from "@/components/landing-carousel";
import { FeaturedProducts } from "@/components/featured-products";
import FrequentQuestions from "@/components/frequent-questions";

export default function Home() {
  return (
    <main>
      <LandingCarousel />
      <FeaturedProducts />
      <FrequentQuestions />
    </main>
  );
}
