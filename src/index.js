import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import Routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
// import Header from "./shared/Header";

ReactDOM.render(
  <>
    {/* <Header /> */}
    <Routes />
  </>,
  document.getElementById("root")
);
