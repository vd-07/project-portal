import "./App.css";
import DashBoard from "./components/DashBoard/DashBoard";
import Home from "./components/Login/Home";
import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router className="App">
      <div className="Container">
        <Routes>
          <Route exact path="/dashboard" element={<DashBoard />} />
          <Route exact path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
