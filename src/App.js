import React, { useEffect, useState } from 'react';
import './App.css';
// import Home from "./components/Home";
// import Token from "./components/Token";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';

function App() {

  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home(){
    const [anime_list, set_anime_list] = useState([{}]);
    useEffect(() => {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': "application/json"
    };
    axios.get("https://api.jikan.moe/v3/top/anime/1/airing", {headers:headers})
    .then((res)=>{
      set_anime_list(res.data.top);
    })
    }, []);
    console.log(anime_list)
  return (
    <div>
      {anime_list.map(anime => 
      <div>
        <h1>{anime.title}</h1>
        <img src={anime.image_url} alt={"anime poster"}/>
      </div>
      )}
    </div>
    );
}