import { Toaster } from "./ui/toaster";
import firstImage from "../../public/image-1.jpg";

import secondImage from "../../public/image-2.jpg";
import { Separator } from "./ui/separator";
import Carousel from "./Carousel";
import Features from "./Features";
// #111724
const LandingPage = () => {
  return (
    <div className="flex flex-col mx-6 sm:mx-20">
      <section className="flex flex-col gap-8 pt-16 lg:flex-row">
        <div className="lg:w-[50%] w-full">
          <h1 className="text-3xl font-heading sm:text-5xl md:text-6xl text-[#0f172a] lg:text-7xl">
            AI video/image software for your editing needs.
          </h1>
          <Separator className="mt-12 mb-4 bg-black h-[2px]" />
          <a href="#features" className="cursor-pointer scroll-smooth">
            OUR SOLUTIONS
          </a>
        </div>
        <div className="lg:w-[50%] w-full">
          <Carousel images={[firstImage, secondImage]} />
        </div>
      </section>
      <Features />
      <Toaster />
    </div>
  );
};

export default LandingPage;
