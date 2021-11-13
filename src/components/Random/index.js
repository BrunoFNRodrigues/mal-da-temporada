import React, { useEffect, useState } from 'react';


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

    useEffect(() => {
        set_anime(randomAnime);
      }, []);
    return (
        <div key={anime.mal_id}> 
            <h1>{anime.title}</h1>
            <img src = {anime.image_url} alt={`poster do ${anime.title}`}/>
        </div>
        );
};