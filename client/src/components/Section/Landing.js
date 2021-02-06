import React, { useContext } from "react";
import Search from "./Search";
import CarouselComponent from "./CarouselComponent";
import Product from "./Product";
import { withRouter } from "react-router-dom";
import { UserContext } from "../../context/context";
const Landing = ({ history }) => {
  const [User, setUser] = useContext(UserContext);
  const handleClick = () => {
    history.push("/create");
  };
  return (
    <div className="flex flex-col">
      <div>
        <Search />
      </div>
      <div className="flex justify-center">
        <h2 className="mt-6 mx-10">Recent Product</h2>
      </div>

      <div className="mt-6 mx-10">
        <CarouselComponent />
      </div>

      <div className="mt-6 mx-10">
        <div className="flex justify-center">
          <h2>Best Product</h2>
        </div>
        <Product />
      </div>
      {User ? (
        <div>
          <a onClick={handleClick}>작성</a>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default withRouter(Landing);
