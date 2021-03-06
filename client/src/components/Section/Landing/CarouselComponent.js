import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { withRouter } from "react-router-dom";
import axios from "axios";
const CarouselComponent = ({ history }) => {
  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  };

  const [Product, setProduct] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then((res) => {
      //console.log(res.data);
      setProduct(res.data);
    });
  }, []);

  const Product1 = (
    <div onClick={() => handleClick(Product[Product.length - 1].id)}>
      {Product ? <img src={Product[Product.length - 1].img[0].image} /> : ""}
    </div>
  );

  const Product2 = (
    <div onClick={() => handleClick(Product[Product.length - 2].id)}>
      {Product ? <img src={Product[Product.length - 2].img[0].image} /> : ""}
    </div>
  );

  const Product3 = (
    <div onClick={() => handleClick(Product[Product.length - 3].id)}>
      {Product ? <img src={Product[Product.length - 3].img[0].image} /> : ""}
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
