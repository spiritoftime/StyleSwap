import { Toaster } from "./ui/toaster";
import firstImage from "../assets/image-1.png";

import secondImage from "../assets/image-2.png";
import { Separator } from "./ui/separator";
import Carousel from "./Carousel";
import Features from "./Features";
import useSmoothScroll from "@/custom_hooks/useSmoothScroll";
import FAQ from "./FAQ";
// #111724
const LandingPage = () => {
  useSmoothScroll();
  return (
    <div className="flex flex-col px-6 sm:px-20">
      <section className="flex flex-col gap-8 pt-16 lg:flex-row js-show-on-scroll">
        <div className="lg:w-[50%] w-full">
          <h1 className="text-3xl leading-tight font-bold font-heading sm:text-5xl md:text-6xl text-[#0f172a] lg:text-7xl">
            AI video/image software for your editing needs.
          </h1>
          <Separator className="mt-12 mb-4 bg-black h-[2px]" />
          <a
            href="#features"
            className="font-semibold uppercase cursor-pointer text-gradient scroll-smooth"
          >
            OUR SOLUTIONS
          </a>
        </div>
        <section className=" js-show-on-scroll lg:w-[50%] w-full">
          <Carousel images={[firstImage, secondImage]} />
        </section>
      </section>
      <Features />
      <FAQ />
      <Toaster />
    </div>
  );
};

export default LandingPage;
