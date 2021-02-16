import React from "react";
import { withRouter } from "react-router-dom";
const Categories = ({ history }) => {
  const handleClick = (id) => {
    history.push(`/category/${id}`);
  };
  return (
    <div>
      <div className="overflow-hidden bg-white mb-4 rounded-b-lg w-full md:w-1/4">
        <div className="px-6 py-4 mb-2 mt-4 mb-8">
          <div className="uppercase tracking-wide text-c2 mb-4">가구</div>
          <div
            onClick={() => handleClick(1)}
            className="flex cursor-pointer border px-4 py-2 text-lg text-grey-darkest border-b-0"
            //style={{borderLeft: "4px", solid, #e2624b,}}
          >
            <div className="pl-2">의자</div>
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-lg text-grey-darkest border-b-0"
            onClick={() => handleClick(2)}
          >
            <div className="pl-2">책상</div>
          </div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-lg text-grey-darkest"
            onClick={() => handleClick(3)}
          >
            <div className="pl-2">서랍</div>
          </div>
          <div className="uppercase tracking-wide text-c2 mb-4 mt-8">소품</div>
          <div
            className="flex cursor-pointer border px-4 py-2 text-lg text-grey-darkest"
            onClick={() => handleClick(4)}
          >
            <div className="pl-2">소형수납</div>
          </div>
          <div>
            <div className="uppercase tracking-wide text-c2 mb-4 mt-8">
              주방가구
            </div>
            <div
              className="flex cursor-pointer border px-4 py-2 text-lg text-grey-darkest"
              onClick={() => handleClick(5)}
            >
              <div className="pl-2">주방 부속품</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Categories);
