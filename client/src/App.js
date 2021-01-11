import React, { useEffect, useState } from "react";
import axios from "axios";
const App = () => {
  const [Title, setTitle] = useState("");
  useEffect(() => {
    axios.get("http://localhost:8000/api").then((res) => {
      //console.log(res);
      setTitle(res.data[0].title);
    });
  }, []);
  return <div>{Title}</div>;
};

export default App;
