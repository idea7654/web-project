import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/context";
const GoodBad = ({ data }) => {
  const [Good, setGood] = useState(false);
  const [User, setUser] = useContext(UserContext);
  const [Total, setTotal] = useState(0);
  const handleGood = async () => {
    let formData = await new FormData();
    await formData.append("recommand", "up");
    const token = await `token ${User.token}`;
    await axios
      .post(
        `http://localhost:8000/api/comment/${data.id}/recommand/`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        if (res.data === 1) {
          setTotal(Total + 1);
        } else {
          setTotal(Total - 1);
        }
      });
  };

  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, []);

  const handleBad = () => {};
  return (
    <div className="flex flex-row mt-2">
      {Good ? (
        <img
          onClick={handleGood}
          className="w-6 h-6 mr-2"
          src="/good.png"
          alt=""
          style={{
            filter: `opacity(.4) drop-shadow(0 0 0 red)`,
          }}
        />
      ) : (
        <img
          onClick={handleGood}
          className="w-6 h-6 mr-2"
          src="/good.png"
          alt=""
          style={{
            filter: `opacity(.4) drop-shadow(0 0 0 gray)`,
          }}
        />
      )}
      <div className="mr-4">{Total}</div>
      <img
        style={{ filter: "opacity(.4) drop-shadow(0 0 0 gray)" }}
        onClick={handleBad}
        className="w-6 h-6 mr-4 mt-0.5"
        src="/bad.png"
        alt=""
      />
      <img className="w-6 h-6 mr-2" src="/comment.png" />
      <div className="mr-2">{data ? data.reply.length : 0}</div>
    </div>
  );
};

export default GoodBad;
