import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
const Login = ({ history }) => {
  const [Id, setId] = useState("");
  const [Password, setPassword] = useState("");

  const changeId = (e) => {
    setId(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const registerRoute = () => {
    history.push("/register");
  };

  const handleSubmit = () => {
    let body = {
      username: Id,
      password: Password,
    };

    axios.post("http://localhost:8000/api/auth/login/", body).then((res) => {
<<<<<<< HEAD
      console.log("로그인요청 응답완료");
=======
      console.log(res);
>>>>>>> a95f4e961889cd79c3c7886ff2da23da1e15724b
    });
  };
  return (
    <div className="h-screen flex justify-center">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md">
          <form className="bg-white rounded px-12 pt-6 pb-8 mb-4">
            {/* <!-- @csrf --> */}
            <div className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
              Login
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="username"
              >
                아이디
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                required
                autoFocus
                placeholder="Id"
                value={Id}
                onChange={changeId}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-normal mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                v-model="form.password"
                type="password"
                placeholder="Password"
                name="password"
                required
                autoComplete="current-password"
                value={Password}
                onChange={changePassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <a
                className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                onClick={registerRoute}
              >
                SignUp
              </a>
              <button
                className="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700"
                type="submit"
                onClick={handleSubmit}
              >
                SignIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
