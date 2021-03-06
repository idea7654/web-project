import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
const Navbar = ({ history }) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  // const [User, setUser] = useContext(UserContext);
  const [User, Dispatch] = useContext(UserContext);
  const mainRoute = () => {
    history.push("/");
    setNavbarOpen(false);
  };

  const loginRoute = () => {
    if (User.token === "") {
      history.push("/login");
      setNavbarOpen(false);
    }
  };

  const categoryRoute = () => {
    history.push("/category");
    setNavbarOpen(false);
  };

  const helpRoute = () => {
    history.push("/help");
    setNavbarOpen(false);
  };

  const handleLogOut = () => {
    const token = `token ${User.token}`;
    axios
      .post("http://localhost:8000/api/auth/logout/", token, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        console.log(res.data);
        //setUser("");
      });
  };

  const brandRoute = () => {
    history.push("/brand");
    setNavbarOpen(false);
  };

  return (
    <div>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-gray-300 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              onClick={mainRoute}
              className="text-sm font-bold leading-relaxed inline-block mr-3 py-2 whitespace-no-wrap uppercase text-black"
            >
              가제
            </a>
            <div className="relative flex flex-row-reverse">
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={() => setNavbarOpen(!navbarOpen)}
              >
                <i className="fas fa-bars"></i>
                <img className="w-auto h-6" src="/list.png" alt="menuBar" />
              </button>
              <button
                className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                type="button"
                onClick={loginRoute}
              >
                <i className="fas fa-bars"></i>
                <img className="w-auto h-6" src="/user.png" alt="login" />
              </button>
            </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                  onClick={categoryRoute}
                >
                  <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">카테고리</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                  onClick={brandRoute}
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">브랜드</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                  onClick={helpRoute}
                >
                  <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Help</span>
                </a>
              </li>
              {User.token !== "" ? (
                <li className="nav-item">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-black hover:opacity-75"
                    onClick={handleLogOut}
                  >
                    <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">LogOut</span>
                  </a>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Navbar);
