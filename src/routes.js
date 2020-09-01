import { BrowserRouter as Router, Route } from "react-router-dom";
import React from "react";
import { Pokedex } from "./pages/Pokedex/index";
import App from "./App";

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={App}></Route>
      <Route path="/pokedex" component={Pokedex}></Route>
    </Router>
  );
};

export default Routes;
