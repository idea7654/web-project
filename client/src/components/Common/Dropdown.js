import React, { useState, useContext } from "react";
// import { FormContext } from "../../context/context";
import FormContext from "../../context/FormContext";
const Dropdown = ({ init, name }) => {
  const [DropVisible, setDropVisible] = useState(false);
  //const [Button, setButton] = useState(init);
  const [Name, setName] = useState(name);
  // const [DropValue, setDropValue] = useContext(FormContext);
  const [Value, Dispatches] = useContext(FormContext);
  const handleChange = (data, id) => {
    setName(data);
    setDropVisible(false);
    //setDropValue((DropValue) => ({ ...DropValue, [name]: id }));
    Dispatches.DropDispatch({
      type: `CHANGE_VALUE`,
      value: id,
      name: name,
    });
  };
  const zStyle = name === "Category" ? 10 : 0;
  return (
    <div>
      <div
        style={{ zIndex: zStyle }}
        className="dropdown inline-block relative mb-3"
      >
        <button
          onClick={() => setDropVisible(!DropVisible)}
          className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
        >
          <span>{Name}</span>
        </button>
        {DropVisible ? (
          <ul className="absolute text-gray-700 pt-1">
            {init.map((data, index) => {
              if (index === 0) {
                return (
                  <li>
                    <a
                      onClick={() => handleChange(data, index + 1)}
                      className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      {data}
                    </a>
                    <hr />
                  </li>
                );
              } else if (index < init.length - 1) {
                return (
                  <li>
                    <a
                      onClick={() => handleChange(data, index + 1)}
                      className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      {data}
                    </a>
                    <hr />
                  </li>
                );
              } else {
                return (
                  <li>
                    <a
                      onClick={() => handleChange(data, index + 1)}
                      className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >
                      {data}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dropdown;
