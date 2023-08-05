import firstImage from "../assets/image-1.png";

import secondImage from "../assets/image-2.png";
import { Separator } from "./ui/separator";
import Carousel from "./Carousel";
const Hero = () => {
  return (
    <header className="container flex flex-col gap-8 py-8 pt-16 space-y-6 js-show-on-scroll dark:bg-transparent md:py-12 lg:py-24 lg:flex-row">
      <div className="lg:w-[50%] w-full">
        <h1 className="text-3xl leading-tight font-bold font-heading sm:text-5xl md:text-6xl text-[#0f172a] lg:text-7xl">
          AI video/image software for your editing needs.
        </h1>
        <Separator className="mt-12 mb-4 bg-black h-[2px]" />
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg mobile:text-base hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
          >
            Get started
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
          <a
            href="#features"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-center uppercase border border-gray-300 rounded-lg cursor-pointer mobile:text-base hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 text-gradient scroll-smooth"
          >
            OUR SOLUTIONS
          </a>
        </div>
      </div>
      <section className="w-full  js-show-on-scroll">
        <Carousel images={[firstImage, secondImage]} />
      </section>
    </header>
  );
};

export default Hero;
