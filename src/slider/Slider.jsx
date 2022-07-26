import React, { useState, useEffect } from "react";
import "./Slider.css";
import BtnSlider from "./BtnSlider";
import { dataSlider } from "../data/dummy";
import { Box } from "@mui/system";

function Slider() {
  // swipe detection
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      prevSlide();
    }
    if (isRightSwipe) {
      nextSlide();
    }
  };
  // swipe detection
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const autoPlayTime = 3000;
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, autoPlayTime);

    return () => clearTimeout(timer);
  }, [slideIndex]);

  return (
    <div className="container-slider">
      {dataSlider.map((slide, index) => {
        return (
          <div
            key={index}
            className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
          >
            <picture>
              <source
                media="(max-width: 650px)"
                srcSet={slide.mobileLink}
              ></source>
              <img
                src={slide.imgLink}
                draggable={false}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              />
            </picture>
          </div>
        );
      })}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <BtnSlider moveSlide={prevSlide} direction={"next"} />
        <BtnSlider moveSlide={nextSlide} direction={"prev"} />
      </Box>
      <div className="container-dots">
        {Array.from({ length: 6 }).map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Slider;
