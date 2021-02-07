import React from "react";
import { Carousel } from "react-responsive-carousel";
const DetailImage = ({ Images }) => {
  return (
    <div className="w-full h-full">
      <Carousel>
        {Images
          ? Images.map((data, index) => {
              return (
                <img
                  key={index}
                  src={"http://localhost:8000" + data.image}
                  alt=""
                />
              );
            })
          : ""}
      </Carousel>
    </div>
  );
};

export default DetailImage;
