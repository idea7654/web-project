import React, { useState } from "react";
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
const App = () => {
  const [User, setUser] = useState("");
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
        <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default withRouter(App);
