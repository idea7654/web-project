import React, { createContext, useState, useContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Section/Login";
import Register from "./components/Section/Register";
import { withRouter, Route } from "react-router-dom";
import Detail from "./components/Section/Detail";
import List from "./components/Section/List";
import Category from "./components/Section/Category";
import CategoryList from "./components/Section/CategoryList";

// const UserContext = createContext();

const App = () => {
  const [User, setUser] = useState("");
  // const User = useContext(UserContext);
  return (
    <div>
      <Navbar User={User} />
      <Route path="/" render={() => <Landing />} exact />
      <Route path="/login" render={() => <Login setUser={setUser} />} />
      <Route path="/register" render={() => <Register setUser={setUser} />} />
      <Route
        path="/detail/:id"
        render={({ match }) => <Detail user={User} match={match} />}
      />
      <Route path="/list" render={(location) => <List location={location} />} />
      <Route
        path="/category"
        render={({ match }) => <Category match={match} />}
      />
      {/* <Route
        path="/category/:id"
        render={({ match }) => <CategoryList match={match} />}
      /> */}
      <Footer />
    </div>
  );
};

export default withRouter(App);
