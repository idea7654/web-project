import React, { useState } from "react";
const DropdownBrand = ({ Brand, setBrand }) => {
  const [DropVisible, setDropVisible] = useState(false);
  const [TextBrand, setTextBrand] = useState("Brand");
  const handleBrand = (id) => {
    setBrand(id);
    setDropVisible(!DropVisible);
    switch (id) {
      case 1:
        setTextBrand("기타");
        break;
      case 2:
        setTextBrand("한샘");
        break;
      case 3:
        setTextBrand("이케아");
        break;
      case 4:
        setTextBrand("일룸");
        break;
      case 5:
        setTextBrand("소프시스");
        break;
    }
  };
  return (
    <div>
      <div className="dropdown inline-block relative mb-3 z-0">
        <button
          onClick={() => setDropVisible(!DropVisible)}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>{Brand ? TextBrand : "Brand"}</span>
        </button>
        {DropVisible ? (
          <ul className="absolute text-gray-700 pt-1 z-1">
            <li>
              <a
                onClick={() => handleBrand(1)}
                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                기타
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleBrand(2)}
                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                한샘
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleBrand(3)}
                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                이케아
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleBrand(4)}
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                일룸
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleBrand(5)}
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                소프시스
              </a>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default DropdownBrand;
