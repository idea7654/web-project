import React, { useState, useContext, useEffect } from "react";
import GoodBad from "./GoodBad";
import axios from "axios";
import { UserContext } from "../../context/context";
const Reply = ({ info, setShowModal, id }) => {
  const [Value, setValue] = useState("");
  const [User, setUser] = useContext(UserContext);
  const [ReplyData, setReplyData] = useState("");
  const handlePost = () => {
    //axios.post();
    if (User) {
      let body = {
        comment_user: User.user.id,
        comment_text: Value,
        parent: info.id,
      };

      axios
        .post(`http://localhost:8000/api/reply/${id}/`, body)
        .then(async (res) => {
          console.log(res.data);
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
          await setReplyData([...ReplyData, res.data]);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      alert("로그인이 필요합니다!");
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  useEffect(() => {
    setReplyData(info.reply);
  }, []);
  return (
    <div>
      <div className="w-full px-3 pt-10 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-sm">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start w-full mt-3 justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <div className="bg-white w-full rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-lg mb-4">
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
                      {info.comment_user}
                    </h3>
                  </div>
                  <GoodBad />
                </div>

                <p
                  style={{ width: "90%" }}
                  className="text-gray-600 text-lg text-center md:text-left "
                >
                  {/* <span className="text-purple-600 font-semibold">@Shanel</span>{" "} */}
                  {info.comment_text}{" "}
                </p>
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto border-b border-solid border-gray-300">
              <p className="my-4 text-gray-600 text-lg leading-relaxed">
                Reply
              </p>
              {ReplyData
                ? ReplyData.map((data, index) => {
                    return (
                      <div className="bg-white rounded-lg p-3 flex flex-col justify-center items-center md:items-start shadow-inner mb-4">
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
                        </div>

                        <p
                          style={{ width: "90%" }}
                          className="text-gray-600 text-lg text-center md:text-left "
                        >
                          {/* <span className="text-purple-600 font-semibold">@Shanel</span>{" "} */}
                          {data.comment_text}{" "}
                        </p>
                      </div>
                    );
                  })
                : ""}
            </div>
            {/* form */}
            <div>
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">
                Add Reply
              </h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea
                  value={Value}
                  onChange={handleChange}
                  className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white"
                  name="body"
                  placeholder="Type Your Comment"
                  required
                ></textarea>
              </div>
              <div className="mr-2 mb-2 flex justify-end">
                <input
                  onClick={handlePost}
                  type="button"
                  className="bg-white text-gray-700 font-medium py-1 px-4 border border-gray-400 rounded-lg tracking-wide mr-1 hover:bg-gray-100"
                  value="등록하기"
                />
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                type="button"
                style={{ transition: "all .15s ease" }}
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
};

export default Reply;
