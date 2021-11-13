import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Home(){
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


  function addAnime(title, img, mal_id){
    const headers={'Accept': 'application/json', 'Content-Type': 'application/json'}
    const url = 'http://127.0.0.1:8000/api/animes/'
    const data = {'title':title, 'img':img, 'mal_id': mal_id}
    axios.post(url,data, {headers:headers})
    .then((res)=>loadData());

  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  function randomAnime(){
    const anime_ale = animes[getRandomInt(0, animes.length)]
    while (anime_ale.genre === 12){
      anime_ale = animes[getRandomInt(0, animes.length)];
    }
    return anime_ale
  }

  return (
    <div>
    <button onClick={()=>{console.log(randomAnime())}}>Defoe</button>
    {animes.map((anime) => (
      <div key={anime.mal_id}> 
        <h1>{anime.title}</h1>
        <button onClick={()=>{addAnime(anime.title,anime.image_url,anime.mal_id)}}>Adicionar</button>
        <img src = {anime.image_url} alt={`poster do ${anime.title}`}/>
      </div>
      ))}
    </div>
  )

}
