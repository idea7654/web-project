import React, { useState } from "react";
const Dropdown = ({ Category, setCategory }) => {
  const [DropVisible, setDropVisible] = useState(false);
  const [TextCategory, setTextCategory] = useState("Category");
  const handleCategory = (id) => {
    setCategory(id);
    setDropVisible(!DropVisible);
    switch (id) {
      case 1:
        setTextCategory("의자");
        break;
      case 2:
        setTextCategory("책상");
        break;
      case 3:
        setTextCategory("서랍");
        break;
      case 4:
        setTextCategory("소형수납");
        break;
      case 5:
        setTextCategory("주방 부속품");
        break;
    }
  };
  return (
    <div>
      <div className="dropdown inline-block relative mb-3 z-10">
        <button
          onClick={() => setDropVisible(!DropVisible)}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>{Category ? TextCategory : "Category"}</span>
        </button>
        {DropVisible ? (
          <ul className="absolute text-gray-700 pt-1">
            <li>
              <a
                onClick={() => handleCategory(1)}
                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                의자
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleCategory(2)}
                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                책상
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleCategory(3)}
                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                서랍
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleCategory(4)}
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                소형수납
              </a>
              <hr />
            </li>
            <li>
              <a
                onClick={() => handleCategory(5)}
                className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
              >
                주방 부속품
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

export default Dropdown;
