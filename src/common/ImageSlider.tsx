import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { baseImgUrl } from "@/routes";
import { GrNext, GrPrevious } from "react-icons/gr";

interface ImageSliderProps {
  images: string[];
  autoSlide?: boolean;
  interval?: number;
  slidesToShow?: number;
  width?: number;
  height?: number;
}

const ImageSlider: React.FC<ImageSliderProps> = ({
  images,
  autoSlide = true,
  interval = 5000,
  slidesToShow = 1,
  width = 60,
  height = 25,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (autoSlide) {
      intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
    }

    return () => clearInterval(intervalId);
  }, [autoSlide, interval, images]);

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - slidesToShow + images.length) % images.length
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slidesToShow) % images.length);
  };

  return (
    <div className="relative overflow-hidden mt-2 r-2xl:mt-[-14px] group">
      <AnimatePresence initial={false} custom={currentIndex}>
        <div className="flex gap-10">
          {Array.from({ length: slidesToShow }).map((_, index) => (
            <motion.img
              key={index}
              src={`${baseImgUrl}/${
                images[(currentIndex + index) % images.length]
              }`}
              alt={`slide-${(currentIndex + index) % images.length}`}
              className={`w-[${width}%] mx-auto h-[${height}rem] object-cover transition-transform duration-500 ease-in-out`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          ))}
        </div>
      </AnimatePresence>

      <button
        className="absolute  hidden group-hover:flex items-center cursor-pointer top-1/2 left-4 transform -translate-y-1/2 px-4 transition duration-1000 hover:cursor-pointer h-12 w-12 rounded-full bg-gray-100"
        onClick={handlePrevClick}
      >
        <GrPrevious />
      </button>
      <button
        className="absolute top-1/2   hidden group-hover:flex items-center cursor-pointer right-4 transform -translate-y-1/2 px-4 transition duration-1000 hover:cursor-pointer h-12 w-12 rounded-full bg-gray-100"
        onClick={handleNextClick}
      >
        <GrNext />
      </button>
    </div>
  );
};

export default ImageSlider;
