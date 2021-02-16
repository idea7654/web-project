import React from "react";
const Ar = ({ product }) => {
  return (
    <div className="mt-3">
      <a
        className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600"
        onClick={() =>
          window.open(
            `https://webxr-furniture.netlify.app/?model=${product}`,
            "_blank"
          )
        }
      >
        Ar start
      </a>
    </div>
  );
};

export default Ar;
