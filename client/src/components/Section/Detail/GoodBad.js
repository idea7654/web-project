import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../../context/UserContext";
import RecommendContext from "../../../context/RecommendContext";
const GoodBad = ({ data }) => {
  //const [Good, setGood] = useState(false);
  //const [Bad, setBad] = useState(false);
  const [User, Dispatch] = useContext(UserContext);
  const [Total, setTotal] = useState(0);
  const [Recommend, RecommendDispatch] = useContext(RecommendContext);
  const handleGood = async () => {
    if (!Recommend.Bad) {
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
            //setGood(true);
            RecommendDispatch({
              type: "SET_GOOD",
              value: true,
              id: data.id,
            });
          } else {
            setTotal(Total - 1);
            //setGood(false);
            RecommendDispatch({
              type: "SET_GOOD_CANCEL",
              value: false,
              id: data.id,
            });
          }
        })
        .catch((err) => {
          alert("로그인이 필요합니다!");
        });
    } else {
      alert("비추천한 댓글은 추천할 수 없습니다!");
    }
  };

  const handleBad = async () => {
    if (!Recommend.Good) {
      let formData = await new FormData();
      await formData.append("recommand", "down");
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
          if (res.data === -1) {
            setTotal(Total - 1);
            //setBad(true);
            RecommendDispatch({
              type: "SET_BAD",
              value: true,
              id: data.id,
            });
          } else {
            setTotal(Total + 1);
            //setBad(false);
            RecommendDispatch({
              type: "SET_BAD_CANCEL",
              value: false,
              id: data.id,
            });
          }
        })
        .catch((err) => {
          alert("로그인이 필요합니다!");
        });
    } else {
      alert("추천한 댓글에는 비추천할 수 없습니다!");
    }
  };

  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, []);
  return (
    <div className="flex flex-row mt-2">
      {Recommend.Good && Recommend.Id.indexOf(data.id) !== -1 ? (
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
        onClick={handleBad}
        style={{ filter: "opacity(.4) drop-shadow(0 0 0 gray)" }}
        className="w-6 h-6 mr-4 mt-0.5"
        src="/bad.png"
        alt=""
      />
      <img className="w-6 h-6 mr-2" src="/comment.png" />
      <div className="mr-2">{data.reply ? data.reply.length : 0}</div>
    </div>
  );
};

export default GoodBad;
