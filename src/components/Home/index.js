import React, {useEffect, useState} from "react";
import cryptoRandomString from 'crypto-random-string';
import axios from "axios";

export default function Home(){
  const [animes, set_animes] = useState([{}]);
  useEffect(() => {
    const headers={'Accept': 'Applicaton/json'}
    axios.get('https://api.jikan.moe/v3/season/2021/fall', {headers:headers})
    .then((response)=>
      set_animes(response.data.anime))
  }, []);


  function addAnime(title, img, mal_id){
    const headers={'Accept': 'application/json', 'Content-Type': 'application/json'}
    const url = 'http://127.0.0.1:8000/api/animes/'
    const data = {'title':title, 'img':img, 'mal_id': mal_id}
    axios.post(url,data, {headers:headers})

  }

  return (
    <div>
    {animes.map((anime) => (
      <div> 
      <h1>{anime.title}</h1>
      <button onClick={addAnime(anime.title, anime.image_url, anime.id_mal)}>Default</button>;
      <img src = {anime.image_url}/>
      </div>))}
    </div>
  )

}
