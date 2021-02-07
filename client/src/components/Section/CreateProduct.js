import React, { useState, useContext } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import { UserContext } from "../../context/context";
import { withRouter } from "react-router-dom";
const CreateProduct = ({ history }) => {
  const [Title, setTitle] = useState("");
  const [Pname, setPname] = useState("");
  const [Category, setCategory] = useState(null);
  const [Context, setContext] = useState("");
  const [Content, setContent] = useState([]);
  const [Preview, setPreview] = useState([]);
  const [User, setUser] = useContext(UserContext);
  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const pnameChange = (e) => {
    setPname(e.target.value);
  };

  const contextChange = (e) => {
    setContext(e.target.value);
  };

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
            value={Title}
            onChange={titleChange}
            className="border-solid border-4 border-light-blue-500 mb-6 w-full py-1"
            type="text"
            placeholder="제목을 입력해주세요"
          />
        </div>
        <div>
          <div className="mb-3">제품 이름</div>
          <input
            value={Pname}
            onChange={pnameChange}
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
          <div className="mb-3">제품 정보</div>
          <textarea
            value={Context}
            onChange={contextChange}
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
