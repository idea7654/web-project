import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import Ar from "./Ar";
import Star from "./Star";
import axios from "axios";
const Detail = ({ user, match }) => {
  const [Info, setInfo] = useState({
    pname: "",
    content: "",
    id: "",
    imgurl: "",
    category: 0,
  });
  const [Estar, setEstar] = useState([]);
  const [Fstar, setFstar] = useState([]);
  useEffect(async () => {
    const res = await axios
      .get(`http://localhost:8000/api/posts/${match.params.id}`)
      .then((res) => {
        //console.log(res);
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

  useEffect(() => {
    axios.get("http://localhost:8000/api/images/1").then((res) => {
      console.log(res);
    });
  }, []);

  const image = (
    <img
      alt="ecommerce"
      className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
      //src="https://kwakk.s3.ap-northeast-2.amazonaws.com/media/public/3.PNG"
      src={Info.imgurl}
    />
  );

  //const comment =
  return (
    <div>
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {image}
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
      <Comment info={Info} user={user} />
    </div>
  );
};

export default Detail;
