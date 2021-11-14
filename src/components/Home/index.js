import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './index.css';

export default function Home(props){
  const animes = props.anime_list

  function addAnime(title, img, mal_id){
    const headers={'Accept': 'application/json', 'Content-Type': 'application/json'}
    const url = 'http://127.0.0.1:8000/api/animes/'
    const data = {'title':title, 'img':img, 'mal_id': mal_id}
    axios.post(url,data, {headers:headers})
  }

  return (
    <main class="container">
      <Link class='btn' to={"/random"}>Recomendação Aleatória</Link>
      <div class="animes-container">
      {animes.map((anime) => (
        <div class="anime-container" key={anime.mal_id}> 
          <h1>{anime.title}</h1>
          <img class="poster" src = {anime.image_url} alt={`poster do ${anime.title}`}/>
          <button className = 'btn' onClick={()=>{addAnime(anime.title,anime.image_url,anime.mal_id)}}>Adicionar</button>
        </div>
        ))}
      </div>
    </main>
  )

}
