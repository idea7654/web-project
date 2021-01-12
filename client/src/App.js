import React, { useEffect, useState } from "react";
//import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing";
import Footer from "./components/Footer/Footer";
import Login from "./components/Section/Login";
import Register from "./components/Section/Register";
import { withRouter, Route } from "react-router-dom";
const App = () => {
  const [Title, setTitle] = useState("");
  // useEffect(() => {
  //   axios.get("http://localhost:8000/api").then((res) => {
  //     //console.log(res);
  //     setTitle(res.data[0].title);
  //   });
  // }, []);
  return (
    <div>
      <Navbar />
      <Route path="/" component={Landing} exact />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Footer />
    </div>
  );
};

export default withRouter(App);
