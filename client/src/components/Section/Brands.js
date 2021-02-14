import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
const Brands = ({ history }) => {
  const [BrandList, setBrandList] = useState(null);
  const handleClick = (id) => {
    history.push(`/brand/${id}`);
  };
  useEffect(() => {
    axios.get("http://localhost:8000/api/brand/").then((res) => {
      setBrandList(res.data);
    });
  }, []);
  return (
    <div>
      <div className="overflow-hidden bg-white mb-4 rounded-b-lg w-full md:w-1/4">
        <div className="px-6 py-4 mb-2 mt-4 mb-8">
          <div className="uppercase tracking-wide text-c2 mb-4">브랜드</div>
          {BrandList
            ? BrandList.map((data, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => handleClick(data.id)}
                    className="flex cursor-pointer border px-4 py-2 text-lg text-grey-darkest border-b-0"
                    // style={{borderLeft: "4px", solid, #e2624b}}
                  >
                    <div className="pl-2">{data.name}</div>
                  </div>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Brands);
