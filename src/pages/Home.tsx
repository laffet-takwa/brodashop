import { useState } from "react";
import Hero from "../components/Hero";
import Marquee from "../components/Marquee";
import NewArrivals from "../components/NewArrivals";
import CollectionShowcase from "../components/CollectionShowcase";
import EditorialStory from "../components/EditorialStory";
import FeaturedProduct from "../components/FeaturedProduct";
import BestSellers from "../components/BestSellers";
import PromoBanner from "../components/PromoBanner";
import Testimonials from "../components/Testimonials";
import InstagramGallery from "../components/InstagramGallery";
import Newsletter from "../components/Newsletter";
import FAQ from "../components/FAQ";
import QuickViewModal from "../components/QuickViewModal";
import type { Product } from "../data/products";

export default function Home() {
  const [quickView, setQuickView] = useState<Product | null>(null);

  return (
    <>
      <Hero />
      <Marquee />
      <NewArrivals onQuickView={setQuickView} />
      <CollectionShowcase />
      <EditorialStory />
      <FeaturedProduct />
      <BestSellers onQuickView={setQuickView} />
      <PromoBanner />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
      <FAQ />
      <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
