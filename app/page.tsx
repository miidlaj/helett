import LandingCarousel from "@/components/landing-carousel";
import { FeaturedProducts } from "@/components/featured-products";
import FrequentQuestions from "@/components/frequent-questions";

export default function Home() {
  return (
    <main>
      <div className="flex justify-center w-full">
        <LandingCarousel />
      </div>
      <FeaturedProducts />
      <FrequentQuestions />
    </main>
  );
}
