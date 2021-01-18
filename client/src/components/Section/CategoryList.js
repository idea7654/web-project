import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
const CategoryList = ({ history, match }) => {
  const [ProList, setProList] = useState([]);
  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/category/${match.params.id}`)
      .then((res) => {
        setProList(res.data);
      });
  }, []);
  return (
    <div>
      <div className="container my-6 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {ProList.map((data, i) => {
            return (
              <div
                key={i}
                className="mt-6 my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
              >
                {/* <!-- Article --> */}
                <article className="overflow-hidden rounded-lg shadow-lg">
                  <a onClick={() => handleClick(data.id)}>
                    <img
                      alt="Placeholder"
                      className="block h-auto w-full"
                      src={data.imgurl}
                    />
                  </a>

                  <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                    <h1 className="text-lg">
                      <a
                        className="no-underline hover:underline text-black"
                        href="#"
                      >
                        평점
                      </a>
                    </h1>
                  </header>
                </article>
                {/* <!-- END Article --> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withRouter(CategoryList);
