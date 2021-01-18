import React, { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
const List = ({ history, location }) => {
  const [ProList, setProList] = useState([]);
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/detail");
  };

  const searchQuery = location.search.split("=")[1];

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/list?search=${searchQuery}`)
      .then((res) => {
        //console.log(res);
        //res.data.map((data) => {
        //  setProList([...ProList, data]);
        //});
      });
  }, []);

  const product = (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      {/* <!-- Article --> */}
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a onClick={handleClick}>
          <img
            alt="Placeholder"
            className="block h-auto w-full"
            src="https://picsum.photos/600/400/?random"
          />
        </a>

        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              평점
            </a>
          </h1>
        </header>
      </article>
      {/* <!-- END Article --> */}
    </div>
  );

  return (
    <div>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {/* <!-- Column --> */}
          {product}
          {/* <!-- END Column --> */}
          <div className="mt-6 my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            {/* <!-- Article --> */}
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a onClick={handleClick}>
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
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
          <div className="mt-6 my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
            {/* <!-- Article --> */}
            <article className="overflow-hidden rounded-lg shadow-lg">
              <a onClick={handleClick}>
                <img
                  alt="Placeholder"
                  className="block h-auto w-full"
                  src="https://picsum.photos/600/400/?random"
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
        </div>
      </div>
    </div>
  );
};

export default withRouter(List);
