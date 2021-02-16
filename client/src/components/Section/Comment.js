import React, { useState, useContext } from "react";
import GoodBad from "./GoodBad";
import axios from "axios";
import { UserContext } from "../../context/context";
import Reply from "./Reply";
const Comment = ({ info, setInfo }) => {
  const [Star, setStar] = useState(["none", "none", "none", "none", "none"]);
  const [Review, setReview] = useState(0);
  const [Comment, setComment] = useState("");
  const [User, setUser] = useContext(UserContext);
  const [Page, setPage] = useState(1);
  const [ReplyData, setReplyData] = useState(null);
  const [ShowModal, setShowModal] = useState(false);
  const PageLimit = 5;
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
    e.preventDefault();
    setComment(e.target.value);
  };
  const handlePost = () => {
    if (User.user) {
      let body = {
        comment_user: User.user.id,
        comment_text: Comment,
        cstar: Review,
      };
      axios
        .post(`http://localhost:8000/api/comment/${info.id}/`, body)
        .then(async (res) => {
          await axios
            .get("http://localhost:8000/api/auth/user/list")
            .then((res2) => {
              res2.data.map((data) => {
                if (data.id === res.data.comment_user) {
                  res.data.comment_user = data.username;
                }
                return data;
              });
            });
          await setInfo({
            ...info,
            comments: [res.data, ...info.comments],
          });
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("로그인이 필요합니다!");
    }
  };

  const handlePrev = () => {
    if (Page > 1) {
      setPage(Page - 1);
    }
  };

  const handleNext = () => {
    if (Page < 3 && info.comments.length / 5 > Page) {
      setPage(Page + 1);
    }
  };

  const changePage = (page) => {
    setPage(page);
  };

  const handleReply = (data) => {
    setShowModal(true);
    setReplyData(data);
  };

  return (
    <div>
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
                {Star.map((data, index) => {
                  return (
                    <div key={index + 1} onClick={() => handleClick(index + 1)}>
                      <svg
                        fill={Star[index]}
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
                })}
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
      {info.comments
        ? info.comments.map((data, index) => {
            if (index < Page * PageLimit && index >= (Page - 1) * PageLimit)
              return (
                <div key={index}>
                  <div className="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
                    <div className="w-full flex flex-row justify-between mx-2">
                      <div className="flex flex-row justify-center mr-2">
                        <img
                          alt="avatar"
                          width="48"
                          height="48"
                          className="rounded-full w-10 h-10 mr-4 shadow-lg mb-4"
                          src="https://cdn1.iconfinder.com/data/icons/technology-devices-2/100/Profile-512.png"
                        />
                        <h3 className="mt-2 text-purple-600 font-semibold text-lg text-center md:text-left ">
                          {data.comment_user}
                        </h3>
                      </div>
                      <GoodBad data={data} />
                    </div>
                    <p
                      style={{ width: "90%" }}
                      className="text-gray-600 text-lg text-center md:text-left "
                      onClick={() => handleReply(data)}
                    >
                      {/* <span className="text-purple-600 font-semibold">@Shanel</span>{" "} */}
                      {data.comment_text}{" "}
                    </p>
                  </div>
                </div>
              );
          })
        : ""}
      <div className="flex justify-center">
        <div className="flex rounded-md mt-8 mb-6">
          <a
            className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0 ml-0 rounded-l"
            onClick={handlePrev}
          >
            <span>Prev</span>
          </a>
          {info.comments
            ? [...Array(Math.ceil(info.comments.length / PageLimit))].map(
                (data, index) => {
                  if (index < 3) {
                    return (
                      <a
                        key={index}
                        className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 border-r-0"
                        onClick={() => changePage(index + 1)}
                      >
                        <span>{index + 1}</span>
                      </a>
                    );
                  }
                }
              )
            : ""}
          <a
            className="py-2 px-4 leading-tight bg-white border border-gray-200 text-blue-700 rounded-r"
            onClick={handleNext}
          >
            <span>Next</span>
          </a>
        </div>
      </div>
      {ShowModal ? (
        <Reply info={ReplyData} setShowModal={setShowModal} id={info.id} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Comment;
