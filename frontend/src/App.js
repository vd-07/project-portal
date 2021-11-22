import "./App.css";
import DashBoard from "./components/DashBoard/DashBoard";
import React from "react";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <div className="Container">
        <DashBoard />
      </div>
    </div>
  );
}

export default App;
