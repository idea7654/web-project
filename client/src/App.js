import React, { useEffect, useState } from "react";
//import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Section/Login";
import Register from "./components/Section/Register";
import { withRouter, Route } from "react-router-dom";
import Detail from "./components/Section/Detail";
//import axios from "axios";
const App = () => {
  // const [Title, setTitle] = useState("");
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api/").then((res) => {
  //     console.log(res);
  //   });
  // }, []);
  return (
    <div>
      <Navbar />
      <Route path="/" component={Landing} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/detail/:id" component={Detail} />
      <Footer />
    </div>
  );
};

export default withRouter(App);
