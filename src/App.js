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
        <nav className='appbar'>
          <ul>
            <li>
              <Link class="baritem" to="/">Home</Link>
            </li>
            <li>
              <Link class="baritem" to="/my_list">MyAnimeList</Link>
            </li>
          </ul>
          <h1 class="title">
            MAL da Temporada
          </h1>
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
