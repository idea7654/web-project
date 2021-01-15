import React, { useState, useEffect } from "react";
import axios from "axios";
const Comment = ({ info, user }) => {
  const [Star, setStar] = useState(["none", "none", "none", "none", "none"]);
  const [Review, setReview] = useState(0);
  const [Comment, setComment] = useState("");
  const handleClick = (index) => {
    setStar(
      Star.map((data, i) => {
        if (i < index) {
          data = "currentColor";
        } else {
          data = "none";
        }
        return data;
      })
    );
    setReview(index);
  };
  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handlePost = () => {
    let body = {
      user: user.user.username,
      comment: Comment,
      star: Review,
    };
    console.log(body);
    // axios
    //   .post(`http://localhost:8000/api/${info.id}/comment`, body)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     alert("로그인이 필요합니다!");
    //   });
  };

  const emptyStar1 = (
    <div onClick={() => handleClick(1)}>
      <svg
        fill={Star[0]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 text-red-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    </div>
  );

  const emptyStar2 = (
    <div onClick={() => handleClick(2)}>
      <svg
        fill={Star[1]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 text-red-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    </div>
  );

  const emptyStar3 = (
    <div onClick={() => handleClick(3)}>
      <svg
        fill={Star[2]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 text-red-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    </div>
  );

  const emptyStar4 = (
    <div onClick={() => handleClick(4)}>
      <svg
        fill={Star[3]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 text-red-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    </div>
  );

  const emptyStar5 = (
    <div onClick={() => handleClick(5)}>
      <svg
        fill={Star[4]}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="w-4 h-4 text-red-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
      </svg>
    </div>
  );
  return (
    <div>
      <div className="bg-white rounded-lg p-3  flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
        <div className="flex flex-row justify-center mr-2">
          <img
            alt="avatar"
            width="48"
            height="48"
            className="rounded-full w-10 h-10 mr-4 shadow-lg mb-4"
            src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
          />
          <h3 className="text-purple-600 font-semibold text-lg text-center md:text-left ">
            @Shanel
          </h3>
        </div>

        <p
          style={{ width: "90%" }}
          className="text-gray-600 text-lg text-center md:text-left "
        >
          Hi good morning will it be the entire house.{" "}
        </p>
      </div>
      <div className="bg-white rounded-lg p-3  flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
        <div className="flex flex-row justify-center mr-2">
          <img
            alt="avatar"
            width="48"
            height="48"
            className="rounded-full w-10 h-10 mr-4 shadow-lg mb-4"
            src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
          />
          <h3 className="text-purple-600 font-semibold text-lg text-center md:text-left ">
            @Tim Motti
          </h3>
        </div>

        <p
          style={{ width: "90%" }}
          className="text-gray-600 text-lg text-center md:text-left "
        >
          <span className="text-purple-600 font-semibold">@Shanel</span> Hello.
          Yes, the entire exterior, including the walls.{" "}
        </p>
      </div>
      <div className="flex justify-center">
        <div className="flex rounded-md mt-8">
          <a className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l hover:bg-blue-500 hover:text-white">
            <span>Prev</span>
          </a>
          <a className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white">
            <span>1</span>
          </a>
          <a className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white">
            <span>2</span>
          </a>
          <a className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 hover:bg-blue-500 hover:text-white">
            <span>3</span>
          </a>
          <a className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r hover:bg-blue-500 hover:text-white">
            <span>Next</span>
          </a>
        </div>
      </div>
      <div className="flex mx-auto items-center justify-center shadow-lg mt-6 mx-8 mb-4 max-w-lg">
        <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
              Add a new comment
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                value={Comment}
                onChange={handleChange}
                className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Type Your Comment"
                required
              ></textarea>
            </div>
            <div className="w-full md:w-full flex justify-between items-start md:w-full px-3">
              <div className="flex flex-row">
                {emptyStar1}
                {emptyStar2}
                {emptyStar3}
                {emptyStar4}
                {emptyStar5}
              </div>
              <div className="-mr-1">
                <input
                  onClick={handlePost}
                  type="button"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="등록하기"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comment;
