import { useState, useEffect } from "react";
type ImagesArray = string[];
interface CarouselProps {
  images: ImagesArray;
}

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // Auto navigate to the next image every 3 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <div className="relative w-full h-44 mobile:h-56 sm:h-96">
      {images.map((image, index: number) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full max-h-[280px] sm:max-h-full  transition-opacity duration-500 ease-in-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            className="object-contain w-full max-h-[280px] sm:max-h-full "
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
