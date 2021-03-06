import React, { useState, useContext, useReducer } from "react";
import axios from "axios";
import { UserContext } from "../../context/context";
import { withRouter } from "react-router-dom";
import useInputs from "../../hooks/useInputs";
import ContentReducer from "../../reducer/ContentReducer";
import FormContext from "../../context/FormContext";
import Dropdown from "../Common/Dropdown";
const Update = ({ info, setUpdateFlag, history }) => {
  const Category = ["의자", "책상", "서랍", "소형수납", "주방 부속품"];
  const Brand = ["기타", "한샘", "이케아", "일룸", "소프시스"];
  const [Content, dispatch] = useReducer(ContentReducer, []);
  const [Preview, setPreview] = useState([]);
  const [DropValue] = useContext(FormContext);
  const [User, setUser] = useContext(UserContext);
  const [{ Title, Pname, Context }, onChange, reset] = useInputs({
    Title: info.title,
    Pname: info.pname,
    Context: info.content,
  });

  const imageChange = (e) => {
    e.preventDefault();
    //setContent(e.target.files);
    dispatch({
      type: "ADD_IMAGE",
      value: e.target.files,
    });
    let fileArr = e.target.files;
    let fileURLs = [];
    let file;
    let filesLength = fileArr.length > 10 ? 10 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];

      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result;
        setPreview([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = `token ${User.token}`;
    let formData = await new FormData();
    for (const i in Content) {
      if (i < Content.length) {
        await formData.append("img", Content[i]);
      }
    }
    await formData.append("title", Title);
    await formData.append("pname", Pname);
    await formData.append("category", DropValue.Category);
    await formData.append("content", Context);
    await formData.append("brand", DropValue.Brand);
    await axios
      .put(`http://localhost:8000/api/posts/${info.id}/`, formData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res);
        history.push("/");
      });
  };

  return (
    <div className="m-12 flex flex-col justify-between">
      <div>
        <div>
          <div className="mb-3">제목</div>
          <input
            value={Title}
            onChange={onChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">제품 이름</div>
          <input
            value={Pname}
            onChange={onChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제품 이름을 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">카테고리</div>
          <Dropdown init={Category} name="Category" />
        </div>
        <div>
          <div className="mb-3">브랜드</div>
          <Dropdown init={Brand} name="Brand" />
        </div>
        <div>
          <div className="mb-3">제품 정보</div>
          <textarea
            value={Context}
            onChange={onChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제품 정보를 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">이미지</div>
          <input
            onChange={imageChange}
            className="border-solid border-4 border-light-blue-500 w-full mb-6 py-1"
            type="file"
            accept="images/*"
            multiple
          />
          {Content
            ? Preview.map((data, index) => {
                return (
                  <div key={index}>
                    <img src={data} alt="" />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <div className="flex justify-between">
        <button
          onClick={() => setUpdateFlag(false)}
          className="bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
        >
          취소
        </button>
        <button
          onClick={handleSubmit}
          className="bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg"
        >
          등록
        </button>
      </div>
    </div>
  );
};

export default withRouter(Update);
