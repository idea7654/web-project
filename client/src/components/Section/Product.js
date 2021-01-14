import React from "react";
import { withRouter } from "react-router-dom";
const Product = ({ history }) => {
  const handleClick = (e) => {
    e.preventDefault();
    history.push("/detail");
  };
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {/* <!-- Column --> */}
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
                <a className="no-underline hover:underline text-black" href="#">
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
                <a className="no-underline hover:underline text-black" href="#">
                  평점
                </a>
              </h1>
            </header>
          </article>
          {/* <!-- END Article --> */}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Product);
