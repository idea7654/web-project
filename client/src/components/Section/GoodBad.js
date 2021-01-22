import React, { useState } from "react";

const GoodBad = () => {
  const [Good, setGood] = useState(false);
  //const [Bad, setBad] = useState(false);
  const [GoodColor, setGoodColor] = useState("gray");

  const handleGood = () => {
    setGood(!Good);
    if (Good) {
      setGoodColor("red");
    } else {
      setGoodColor("gray");
    }
  };

  const handleBad = () => {
    //setBad(!Bad);
  };
  return (
    <div className="flex flex-row mt-2">
      <img
        onClick={handleGood}
        className="w-6 h-6 mr-4"
        src="/good.png"
        alt=""
        style={{
          filter: `opacity(.4) drop-shadow(0 0 0 ${GoodColor})`,
        }}
      />
      <img
        style={{ filter: "opacity(.4) drop-shadow(0 0 0 gray)" }}
        onClick={handleBad}
        className="w-6 h-6 mr-2"
        src="/bad.png"
        alt=""
      />
    </div>
  );
};

export default GoodBad;
