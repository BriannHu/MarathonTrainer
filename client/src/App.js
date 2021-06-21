import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import CreateUser from "./components/create-user.component";

import CreateRun from "./components/CreateRun/CreateRun";
// import DisplayAllRuns from "./components/DisplayRuns/DisplayAllRuns";
// import LeftNavbar from "./components/Drawer/LeftNavbar";

import MainLayout from "./layouts/MainLayout";

import "./App.css";

function App() {
  return (
    <Router>
      <Route path="/" exact component={MainLayout} />
      <Route path="/create" component={CreateRun} />

      {/* <Route path="/" exact component={DisplayAllRuns} /> */}

      {/* <Dashboard /> */}
      {/* <div className="container-left">
          <LeftNavbar />
        </div>
        <div className="container-right">
          <Route path="/" exact component={DisplayAllRuns} />
          <Route path="/create" component={CreateRun} />
          <Route path="/user" component={CreateUser} />
        </div> */}
    </Router>
  );
}

export default App;
