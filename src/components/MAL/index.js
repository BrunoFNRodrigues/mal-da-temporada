import React, { useEffect, useState } from 'react';
import axios from "axios";


export default function MAL(){
    const [animes, set_animes] = useState([{}]);
    function loadData(){
        axios.get('http://127.0.0.1:8000/api/animes/')
        .then((response)=>
          set_animes(response.data))
    }
    
    useEffect(() => {
    loadData();
    }, []);

    function deleteAnime(id){
      axios.delete(`http://127.0.0.1:8000/api/animes/${id}/`)
      .then((res)=>loadData());
    }


    return (
        <div>
        {animes.map((anime) => (
          <div key={anime.mal_id}> 
            <h1>{anime.title}</h1>
            <img src = {anime.img} alt={`poster do ${anime.title}`}/>
            <button className = 'btn' onClick={()=>{deleteAnime(anime.id)}}>Remover</button>
          </div>
          ))}
        </div>
      )
    
};