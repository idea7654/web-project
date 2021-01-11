import React from "react";
import Search from "./Search";
import CarouselComponent from "./CarouselComponent";
import Product from "./Product";
const Landing = () => {
  return (
    <div className="flex flex-col">
      <div>
        <Search />
      </div>
      <div className="flex justify-center">
        <h2 className="mt-6 mx-10">Recent Product</h2>
      </div>

      <div className="mt-6 mx-10">
        <CarouselComponent />
      </div>

      <div className="mt-6 mx-10">
        <div className="flex justify-center">
          <h2>Best Product</h2>
        </div>
        <Product />
      </div>
    </div>
  );
};

export default Landing;
