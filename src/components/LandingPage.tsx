import React from "react";
import { Toaster } from "./ui/toaster";
import firstImage from "../assets/image-1.png";
import secondImage from "../assets/image-2.png";
import { Separator } from "./ui/separator";
import Carousel from "./Carousel";
import Features from "./Features";
// #111724
const LandingPage = () => {
  return (
    <div className="flex flex-col mx-6 sm:mx-12">
      <section className="flex gap-8 pt-16">
        <div className="w-[50%]">
          <h1 className="text-3xl font-heading sm:text-5xl md:text-6xl text-[#0f172a] lg:text-7xl">
            AI video/image software for your editing needs.
          </h1>
          <Separator className="mt-12 mb-4 bg-black h-[2px]" />
          <a href="#features" className="cursor-pointer scroll-smooth">
            OUR SOLUTIONS
          </a>
        </div>
        <div className="w-[50%]">
          <Carousel images={[firstImage, secondImage]} />
        </div>
      </section>
      <Features />
      <Toaster />
    </div>
  );
};

export default LandingPage;
