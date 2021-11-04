import React from "react";
import cryptoRandomString from 'crypto-random-string';
export default function Home(){
    const code_verifier = cryptoRandomString({length: 128, type: 'url-safe'});
    const url = "https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=046e703006cab4f534ee6af14f564962&code_challenge="+code_verifier+"&state=RequestID42&redirect_uri=http://localhost:3000/token";
    return <a href={url}> Teste </a>;
  }