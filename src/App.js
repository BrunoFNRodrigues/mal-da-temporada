import React from 'react'
import './App.css';
import Home from "./components/Home";
import Token from "./components/Token";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


function App() {
  
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/token">
            <Token/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
