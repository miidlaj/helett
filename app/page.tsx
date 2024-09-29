import LandingCarousel from "@/components/landing-carousel";
import { FeaturedProducts } from "@/components/carousel";
import FrequentQuestions from "@/components/frequent-questions";

export default function Home() {
  return (
    <main className="">
      <LandingCarousel />
      <FeaturedProducts />
      <FrequentQuestions />
    </main>
  );
}
