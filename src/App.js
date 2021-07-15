
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/Navbar"
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise";
import CreateExercise from "./components/CreateExercise";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
       <Route exact path='/exerciselist'>
          <ExercisesList />
        </Route>

        <Route exact path='/edit/:id'>
          <EditExercise />
        </Route>

        <Route exact path='/create'>
          <CreateExercise />
        </Route>

        <Route exact path='/user'>
          <CreateUser />
        </Route>
      </div>
    </Router>
  );
}

export default App;
