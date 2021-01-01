import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";

const token = sessionStorage.getItem("token");

window.axios = axios;
axios.defaults.baseURL = "http://localhost:9090/api/v1/";
axios.defaults.headers.common = {
  Authorization: "Bearer " + token,
  "Content-Type": "application/json; charset=UTF-8",
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
