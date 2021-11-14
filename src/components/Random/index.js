import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Random(props){
    const animes = props.anime_list
    const [anime, set_anime] = useState({"title":"errou"});
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
      }
    
    
      function randomAnime(){
        var anime_ale = animes[getRandomInt(0, animes.length)]
        return anime_ale
      }

      function loadAnime(){
        set_anime(randomAnime);
      }

      function addAnime(title, img, mal_id){
        const headers={'Accept': 'application/json', 'Content-Type': 'application/json'}
        const url = 'http://127.0.0.1:8000/api/animes/'
        const data = {'title':title, 'img':img, 'mal_id': mal_id}
        axios.post(url,data, {headers:headers})
      }

    useEffect(() => {
        loadAnime();
      }, []);
    return (
        <div key={anime.mal_id}>
            <button className = 'btn' onClick={()=>{loadAnime()}}>Recomendção aleatório</button>
            <h1>{anime.title}</h1>
            <img src = {anime.image_url} alt={`poster do ${anime.title}`}/>
            <button className = 'btn' onClick={()=>{addAnime(anime.title,anime.image_url,anime.mal_id)}}>Adicionar</button>
        </div>
        );
};