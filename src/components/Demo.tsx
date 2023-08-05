import Carousel from "./Carousel";
import firstImage from "../assets/image-1.png";

import secondImage from "../assets/image-2.png";
const Demo = () => {
  return (
    <div className="container py-8 space-y-6 js-show-on-scroll bg-[#f9f9f9] dark:bg-transparent md:py-12 lg:py-24">
      <h2 className="font-heading text-3xl leading-[1.1] font-bold text-center  sm:text-3xl md:text-6xl">
        Use Case Demonstration
      </h2>
      <p className="leading-normal text-center text-muted-foreground sm:text-lg sm:leading-7">
        Some interesting use cases for StyleSwap!
      </p>
      <div className="flex flex-col justify-between w-full gap-8 lg:pt-16 lg:flex-row">
        <div className="list-group w-full lg:w-[40%] ">
          <ul className="flex flex-col  text-sm font-medium  bg-[#4169E1] border  rounded-lg   text-gradient">
            <li className="w-full px-4 py-4 border-b border-black rounded-t-lg dark:border-gray-600">
              Generate Professional Linkedin Photo
            </li>
            <li className="w-full px-4 py-4 border-b border-black dark:border-gray-600">
              Use Case 2
            </li>
            <li className="w-full px-4 py-4 border-b border-black dark:border-gray-600">
              Use Case 3
            </li>
            <li className="w-full px-4 py-4 rounded-b-lg">Use Case 4</li>
          </ul>
        </div>

        <Carousel images={[firstImage, secondImage]} />
      </div>
    </div>
  );
};

export default Demo;
