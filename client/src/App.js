import React, { useContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Section/Login/Login";
import Register from "./components/Section/Login/Register";
import { withRouter, Route } from "react-router-dom";
import Detail from "./components/Section/Detail/Detail";
import List from "./components/Section/Landing/List";
import Category from "./components/Section/Category/Category";
import axios from "axios";
import Help from "./components/Section/Landing/Help";
import Brand from "./components/Section/Brand/Brand";
import { FormProvider } from "./context/FormContext";
import UserContext from "./context/UserContext";
import UpdateProduction from "./components/Common/UpdateProduction";
import { RecommendProvider } from "./context/RecommendContext";
const App = () => {
  const [User, Dispatch] = useContext(UserContext);
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
          //setUser({ token: sessionToken, user: res.data });
          // console.log(res.data);
          Dispatch({
            type: "SET_USER",
            token: sessionToken,
            user: res.data,
          });
        });
    }
  }, []);
  return (
    <div>
      <FormProvider>
        <RecommendProvider>
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
          <Route
            path="/create"
            render={() => <UpdateProduction setUpdateFlag={null} id={null} />}
          />
          <Route path="/brand" render={(match) => <Brand match={match} />} />
          <Footer />
        </RecommendProvider>
      </FormProvider>
    </div>
  );
};

export default withRouter(App);
