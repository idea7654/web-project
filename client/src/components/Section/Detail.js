import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import Ar from "./Ar";
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
    await setInfo(res.data);
    const star = await Math.round(res.data.star);
    await setFstar(star);
    await setEstar(5 - star);
    await console.log(Fstar, Estar);
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
                {[...Array(Fstar)].map((n, index) => {
                  return (
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  );
                })}
                {[...Array(Estar)].map((n, index) => {
                  return (
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 text-red-500"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                    </svg>
                  );
                })}
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
