import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Section/Login";
import Register from "./components/Section/Register";
import { withRouter, Route } from "react-router-dom";
import Detail from "./components/Section/Detail";
import List from "./components/Section/List";
import Category from "./components/Section/Category";
import { UserContext } from "./context/context";
import axios from "axios";
import Help from "./components/Section/Help";
import CreateProduct from "./components/Section/CreateProduct";
import Brand from "./components/Section/Brand";
const App = () => {
  const [User, setUser] = useState("");

  useEffect(() => {
    const sessionToken = window.sessionStorage.getItem("token");
    if (sessionToken) {
      const token = `token ${sessionToken}`;
      axios
        .get("http://localhost:8000/api/auth/user/", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser({ token: sessionToken, user: res.data });
        });
    }
  }, []);
  return (
    <div>
      <UserContext.Provider value={[User, setUser]}>
        <Navbar />
        <Route path="/" render={() => <Landing />} exact />
        <Route path="/login" render={() => <Login />} />
        <Route path="/register" render={() => <Register />} />
        <Route
          path="/detail/:id"
          render={({ match }) => <Detail match={match} />}
        />
        <Route
          path="/list"
          render={(location) => <List location={location} />}
        />
        <Route
          path="/category"
          render={({ match }) => <Category match={match} />}
        />
        <Route path="/help" render={() => <Help />} />
        <Route path="/create" render={() => <CreateProduct />} />
        <Route path="/brand" render={(match) => <Brand match={match} />} />
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);
