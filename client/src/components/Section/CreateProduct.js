import React, { useState, useContext } from "react";
import Dropdown from "./Dropdown";
import DropdownBrand from "./DropdownBrand";
import axios from "axios";
import { UserContext } from "../../context/context";
import { withRouter } from "react-router-dom";
import useInputs from "../../hooks/useInputs";
const CreateProduct = ({ history }) => {
  const [Category, setCategory] = useState(null);
  const [Content, setContent] = useState([]);
  const [Preview, setPreview] = useState([]);
  const [Brand, setBrand] = useState(null);
  const [User, setUser] = useContext(UserContext);
  const [{ Title, Pname, Context }, onChange, reset] = useInputs({
    Title: "",
    Pname: "",
    Context: "",
  });

  const imageChange = (e) => {
    e.preventDefault();
    setContent(e.target.files);
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
    if (Title === "") {
      alert("제목을 작성해주세요!");
    } else if (Pname === "") {
      alert("제품 이름을 작성해주세요!");
    } else if (Category === null) {
      alert("카테고리를 골라주세요!");
    } else if (Context === "") {
      alert("내용을 작성해주세요!");
    } else if (Preview.length === 0) {
      alert("이미지를 넣어주세요!");
    } else {
      let formData = await new FormData();
      for (const i in Content) {
        if (i < Content.length) {
          await formData.append("image", Content[i]);
        }
      }
      await formData.append("title", Title);
      await formData.append("pname", Pname);
      await formData.append("category", Category);
      await formData.append("content", Context);
      await axios
        .post("http://localhost:8000/api/posts/", formData, {
          headers: {
            Authorization: `token ${User.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          history.push("/");
        });
    }
  };

  return (
    <div className="m-12 flex flex-col justify-between">
      <div>
        <div>
          <div className="mb-3">제목</div>
          <input
            name="Title"
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
            name="Pname"
            value={Pname}
            onChange={onChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제품 이름을 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">카테고리</div>
          <Dropdown
            Category={Category}
            setCategory={setCategory}
            color="white"
          />
        </div>
        <div>
          <div className="mb-3">브랜드</div>
          <DropdownBrand Brand={Brand} setBrand={setBrand} color="white" />
        </div>
        <div>
          <div className="mb-3">제품 정보</div>
          <textarea
            name="Context"
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

export default withRouter(CreateProduct);
