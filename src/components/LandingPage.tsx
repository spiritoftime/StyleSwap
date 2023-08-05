import { Toaster } from "./ui/toaster";

import Features from "./Features";
import useSmoothScroll from "@/custom_hooks/useSmoothScroll";
import FAQ from "./FAQ";
import Demo from "./Demo";
import Hero from "./Hero";
// #111724
const LandingPage = () => {
  useSmoothScroll();
  return (
    <div className="flex flex-col px-6 sm:px-20">
      <Hero />
      <Demo />
      <Features />
      <FAQ />
      <Toaster />
    </div>
  );
};

export default LandingPage;
