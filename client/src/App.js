import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import CreateUser from "./components/create-user.component";

// import DisplayAllRuns from "./components/DisplayRuns/DisplayAllRuns";
// import LeftNavbar from "./components/Drawer/LeftNavbar";

import MainLayout from "./layouts/MainLayout";

import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" component={MainLayout} />
    </Router>
  );
}

export default App;
