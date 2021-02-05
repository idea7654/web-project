import React, { useEffect, useState, useContext } from "react";
import Comment from "./Comment";
import Ar from "./Ar";
import Star from "./Star";
import axios from "axios";
import DetailImage from "./DetailImage";
import Update from "./Update";
import { UserContext } from "../../context/context";
const Detail = ({ match }) => {
  const [Info, setInfo] = useState({
    pname: "",
    content: "",
    id: "",
    imgurl: "",
    category: 0,
  });
  const [Estar, setEstar] = useState([]);
  const [Fstar, setFstar] = useState([]);
  const [Images, setImages] = useState([]);
  const [User, setUser] = useContext(UserContext);
  useEffect(async () => {
    const res = await axios
      .get(`http://localhost:8000/api/posts/${match.params.id}`)
      .then((res) => {
        switch (res.data.category) {
          case 1:
            res.data.category = "의자";
            break;
          case 2:
            res.data.category = "책상";
            break;
          case 3:
            res.data.category = "서랍";
            break;
          case 4:
            res.data.category = "소형수납";
            break;
          case 5:
            res.data.category = "주방 부속품";
            break;
        }
        return res;
      });
    await axios.get("http://localhost:8000/api/auth/user/list").then((res2) => {
      res2.data.map((data) => {
        res.data.comments.map((data2) => {
          if (data2.comment_user === data.id) {
            data2.comment_user = data.username;
          }
          data2.reply.map((data3) => {
            if (data3.comment_user === data.id) {
              data3.comment_user = data.username;
            }
            return data3;
          });
          return data2;
        });
        return data;
      });
    });
    await setInfo(res.data);
    const star = await Math.round(res.data.star);
    await setFstar(star);
    await setEstar(5 - star);
  }, []);

  return (
    <div>
      <div className="container px-5 py-5 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* {image} */}
          <DetailImage Images={Info.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <div className="flex justify-between">
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {Info.pname}
              </h1>
              <Ar />
            </div>
            <div className="flex mb-4">
              <span className="flex items-center">
                <Star fStar={Fstar} eStar={Estar} />
                <span className="text-gray-600 ml-3">{Info.category}</span>
              </span>
            </div>
            <p className="leading-relaxed">{Info.content}</p>
          </div>
        </div>
      </div>
      <Comment info={Info} setInfo={setInfo} />
      {console.log(User.user.id, Info)}
      {User.user.id === Info.owner ? (
        <div className="flex justify-end mb-3">
          <a className="bg-blue-500 rounded-lg font-bold text-white text-center mr-3 px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600">
            수정
          </a>
          <a className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600">
            삭제
          </a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Detail;
