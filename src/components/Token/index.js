import React from "react";
import axios from 'axios';
import querystring from "querystring";

export default function Token(){

    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const headers = {
      "Content-Type": "application/x-www-form-urlencoded"
    };
    const url = "https://myanimelist.net/v1/oauth2/token";
    const data = querystring.stringify({
      client_id : "046e703006cab4f534ee6af14f564962",
      code : code,
      client_secret: "5822e13e0e292e2da5ad4e900cd2290401212bab75da0bb36c40cb13356d3d0e",
      code_verifier: "pois",
      grant_type:"authorization_code",
      redirect_uri:"http://localhost:3000/token",
    })
    axios.post(url, data, {headers:headers})
    .then((res)=>{
      console.log(res);
    })
 
  
  return <div> Code:{code}<br/>CodeVerifier:{"pois"} </div>;
}