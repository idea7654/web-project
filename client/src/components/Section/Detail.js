import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
const Detail = ({ user, match }) => {
  const [Info, setInfo] = useState({
    pname: "",
    content: "",
    id: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${match.params.id}`)
      .then((res) => {
        setInfo(res.data);
      });
  }, []);
  const star = (
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

  const emptyStar = (
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

  const image = (
    <img
      alt="ecommerce"
      className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
      src={process.env.PUBLIC_URL + "/109672.jpg"}
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
              <a className="bg-blue-500 rounded-lg font-bold text-white text-center px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-600">
                Ar Start
              </a>
            </div>
            <div className="flex mb-4">
              <span className="flex items-center">
                {star}
                {star}
                {star}
                {star}
                {emptyStar}
                <span className="text-gray-600 ml-3">리뷰개수</span>
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
