import React, { useState, useContext, useReducer } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import UserContext from "../../context/UserContext";
import { withRouter } from "react-router-dom";
import useInputs from "../../hooks/useInputs";
import ContentReducer from "../../reducer/ContentReducer";
import FormContext from "../../context/FormContext";
const UpdateProduction = ({ setUpdateFlag, id, history }) => {
  const Category = ["의자", "책상", "서랍", "소형수납", "주방 부속품"];
  const Brand = ["기타", "한샘", "이케아", "일룸", "소프시스"];
  const [Content, dispatch] = useReducer(ContentReducer, []);
  const [Preview, setPreview] = useState([]);
  const [User, Dispatch] = useContext(UserContext);
  // const [DropValue, setDropValue] = useContext(FormContext);
  const [state] = useContext(FormContext);
  const [onChange, reset] = useInputs();
  const imageChange = (e) => {
    e.preventDefault();
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
    if (state.FormValue.Title === "") {
      alert("제목을 작성해주세요!");
    } else if (state.FormValue.Pname === "") {
      alert("제품 이름을 작성해주세요!");
    } else if (state.DropValue.Category === null) {
      alert("카테고리를 골라주세요!");
    } else if (state.FormValue.Context === "") {
      alert("내용을 작성해주세요!");
    } else if (Preview.length === 0 && !id) {
      alert("이미지를 넣어주세요!");
    } else if (state.DropValue.Brand === "") {
      alert("브랜드를 골라주세요!");
    } else {
      let formData = await new FormData();
      for (const i in Content) {
        if (i < Content.length) {
          if (!id) {
            await formData.append("image", Content[i]);
          } else {
            await formData.append("img", Content[i]);
          }
        }
      }
      await formData.append("title", state.FormValue.Title);
      await formData.append("pname", state.FormValue.Pname);
      await formData.append("category", state.DropValue.Category);
      await formData.append("content", state.FormValue.Context);
      await formData.append("brand", state.DropValue.Brand);
      if (!id) {
        await axios
          .post("http://localhost:8000/api/posts/", formData, {
            headers: {
              Authorization: `token ${User.token}`,
            },
          })
          .then((res) => {
            reset();
            history.push("/");
          });
      } else {
        await axios
          .put(`http://localhost:8000/api/posts/${id}/`, formData, {
            headers: {
              Authorization: `token ${User.token}`,
            },
          })
          .then((res) => {
            reset();
            setUpdateFlag(false);
          });
      }
    }
  };

  return (
    <div className="m-12 flex flex-col justify-between">
      <div>
        <div>
          <div className="mb-3">제목</div>
          <input
            name="Title"
            value={state.FormValue.Title}
            onChange={onChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">제품 이름</div>
          <input
            name="Pname"
            value={state.FormValue.Pname}
            onChange={onChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제품 이름을 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">카테고리</div>
          {/* <Dropdown
              Category={Category}
              setCategory={setCategory}
              color="white"
            /> */}
          <Dropdown init={Category} name="Category" />
        </div>
        <div>
          <div className="mb-3">브랜드</div>
          {/* <DropdownBrand Brand={Brand} setBrand={setBrand} color="white" /> */}
          <Dropdown init={Brand} name="Brand" />
        </div>
        <div>
          <div className="mb-3">제품 정보</div>
          <textarea
            name="Context"
            value={state.FormValue.Context}
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
                  <div>
                    <img key={index} className="mb-3" src={data} alt="" />
                  </div>
                );
              })
            : ""}
        </div>
      </div>
      <div className="flex justify-end">
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

export default withRouter(UpdateProduction);
