import React, { useEffect, useState } from "react";
//import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Section/Login";
import Register from "./components/Section/Register";
import { withRouter, Route } from "react-router-dom";
import Detail from "./components/Section/Detail";
import List from "./components/Section/List";
import Category from "./components/Section/Category";
//import axios from "axios";
const App = () => {
  const [User, setUser] = useState("");
  // const [Title, setTitle] = useState("");
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/").then((res) => {
  //     console.log(res);
  //   });
  // }, []);
  useEffect(() => {
    console.log(User);
  }, []);

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
      <Route path="/category" render={() => <Category />} />
      <Footer />
    </div>
  );
};

export default withRouter(App);
