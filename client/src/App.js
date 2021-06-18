import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

//import ExercisesList from "./components/exercises-list.component";
//import EditExercise from "./components/edit-exercise.component";
//import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

import CreateRun from "./components/CreateRun/CreateRun";
import DisplayAllRuns from "./components/DisplayRuns/DisplayAllRuns";
import LeftNavbar from "./components/Drawer/LeftNavbar";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="container-left">
          <LeftNavbar />
        </div>
        <div className="container-right">
          <Route path="/" exact component={DisplayAllRuns} />
          <Route path="/create" component={CreateRun} />
          <Route path="/user" component={CreateUser} />
        </div>
      </div>
    </Router>
  );
}

export default App;
