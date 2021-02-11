import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/context";
const GoodBad = ({ id }) => {
  const [Good, setGood] = useState(false);
  const [User, setUser] = useContext(UserContext);
  const handleGood = async () => {
    let formData = await new FormData();
    await setGood(!Good);
    await formData.append("recommand", "up");
    const token = await `token ${User.token}`;
    await axios
      .post(`http://localhost:8000/api/comment/${id}/recommand/`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  const handleBad = () => {};
  return (
    <div className="flex flex-row mt-2">
      {Good ? (
        <img
          onClick={handleGood}
          className="w-6 h-6 mr-4"
          src="/good.png"
          alt=""
          style={{
            filter: `opacity(.4) drop-shadow(0 0 0 red)`,
          }}
        />
      ) : (
        <img
          onClick={handleGood}
          className="w-6 h-6 mr-4"
          src="/good.png"
          alt=""
          style={{
            filter: `opacity(.4) drop-shadow(0 0 0 gray)`,
          }}
        />
      )}
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
