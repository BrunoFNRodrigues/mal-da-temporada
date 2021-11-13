import React,{useState, useEffect} from 'react'
import './App.css';
import axios from "axios";
import MAL from "./components/MAL";
import Home from "./components/Home";
import Random from "./components/Random";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


function App() {
  const [animes, set_animes] = useState([{}]);

  function loadData(){
    const headers={'Accept': 'Applicaton/json'}
    axios.get('https://api.jikan.moe/v3/season/2021/fall', {headers:headers})
    .then((response)=>
      set_animes(response.data.anime))
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/my_list">My anime list</Link>
            </li>
            <li>
              <Link to="/random">Random</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/my_list">
            <MAL anime_list={animes}/>
          </Route>
          <Route path="/random">
            <Random  anime_list={animes}/>
          </Route>
          <Route path="/">
            <Home  anime_list={animes}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
