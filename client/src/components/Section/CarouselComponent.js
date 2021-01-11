import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = () => {
  return (
    <div className="carousel-wrapper">
      <Carousel>
        <div>
          <img src="109672.jpg" />
        </div>
        <div>
          <img src="109672.jpg" />
        </div>
        <div>
          <img src="109672.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default CarouselComponent;
