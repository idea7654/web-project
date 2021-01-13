import React, { useState, useEffect } from "react";
import Search from "./Search";
import CarouselComponent from "./CarouselComponent";
import Product from "./Product";
//import axios from "axios";
const Landing = () => {
  // const [Sales, setSales] = useState([]);
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api").then(async (res) => {
  //     await setSales([...Sales, res.data]);
  //     await console.log(Sales);
  //   });
  // }, []);
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
