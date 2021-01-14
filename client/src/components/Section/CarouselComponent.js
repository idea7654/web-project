import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { withRouter } from "react-router-dom";
const CarouselComponent = ({ history }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/detail");
  };
  return (
    <div className="carousel-wrapper">
      <Carousel>
        <div onClick={handleClick}>
          <img src="109672.jpg" />
        </div>
        <div onClick={handleClick}>
          <img src="109672.jpg" />
        </div>
        <div onClick={handleClick}>
          <img src="109672.jpg" />
        </div>
      </Carousel>
    </div>
  );
};

export default withRouter(CarouselComponent);
