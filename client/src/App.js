import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Section/Landing";
import Footer from "./components/Footer/Footer";
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
      <Landing />
      <Footer />
    </div>
  );
};

export default App;
