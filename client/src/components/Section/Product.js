import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
const Product = ({ history }) => {
  const handleClick = (id) => {
    history.push(`/detail/${id}`);
  };
  const [Sales, setSales] = useState([]);
  const [BeforeRender, setBeforeRender] = useState(false);
  useEffect(() => {
    axios.get("http://localhost:8000/api/posts").then((res) => {
      res.data.sort((a, b) => {
        if (a.star > b.star) {
          return 1;
        }
        if (a.star < b.star) {
          return -1;
        }
        return 0;
      });
      setSales(res.data);
      setBeforeRender(true);
    });
  }, []);
  return (
    <div className="container my-10 mx-auto px-4 md:px-12">
      {BeforeRender ? (
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {Sales.map((data, index) => {
            if (index > Sales.length - 4) {
              return (
                <div className="mt-3 my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
                  <article className="overflow-hidden rounded-lg shadow-lg">
                    <a onClick={() => handleClick(data.id)}>
                      <img
                        alt="Placeholder"
                        className="block h-auto w-full"
                        src={"http://localhost:8000" + data.img[0].image}
                      />
                    </a>

                    <header className="flex items-center justify-between leading-tight p-2 md:p-4">
                      <h1 className="text-lg">
                        <a className="no-underline hover:underline text-black">
                          {data.pname}
                        </a>
                      </h1>
                    </header>
                  </article>
                </div>
              );
            }
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(Product);
