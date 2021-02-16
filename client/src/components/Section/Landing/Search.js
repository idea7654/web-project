import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
const Search = ({ history }) => {
  const [InputSearch, setInputSearch] = useState("");
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const handleClick = () => {
    history.push(`/list?search=${InputSearch}`);
  };
  return (
    <div className="w-screen flex justify-center">
      <div className="mt-3 w-4/5 h-10 pl-3 pr-2 bg-white border rounded-full flex justify-between items-center relative">
        <input
          value={InputSearch}
          onChange={handleChange}
          type="search"
          name="search"
          id="search"
          placeholder="Search"
          className="appearance-none w-full outline-none focus:outline-none active:outline-none"
        />
        <button
          onClick={handleClick}
          type="button"
          className="ml-1 outline-none focus:outline-none active:outline-none"
        >
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default withRouter(Search);
