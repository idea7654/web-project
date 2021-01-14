import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
const CarouselComponent = ({ history }) => {
  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  };

  const [Product, setProduct] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then((res) => {
      setProduct(res.data);
    });
  }, []);

  const Product1 = (
    <div onClick={() => handleClick(Product[Product.length - 1].id)}>
      <img src="109672.jpg" />
    </div>
  );

  const Product2 = (
    <div onClick={() => handleClick(Product[Product.length - 2].id)}>
      <img src="109672.jpg" />
    </div>
  );

  const Product3 = (
    <div onClick={() => handleClick(Product[Product.length - 3].id)}>
      <img src="109672.jpg" />
    </div>
  );
  return (
    <div className="carousel-wrapper">
      <Carousel>
        {Product1}
        {Product2}
        {Product3}
      </Carousel>
    </div>
  );
};

export default withRouter(CarouselComponent);
