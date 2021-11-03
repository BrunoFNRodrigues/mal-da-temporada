import React,{useEffect} from 'react'
import './App.css';
import cryptoRandomString from 'crypto-random-string';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import axios from 'axios';
import querystring from "querystring";
const code_verifier = cryptoRandomString({length: 128, type: 'url-safe'})
const url = "https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=046e703006cab4f534ee6af14f564962&code_challenge="+code_verifier+"&state=RequestID42&redirect_uri=http://localhost:3000/token"
function App() {
  
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/token">Token</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/token">
            <Token/>
          </Route>
          <Route path="/">
            <Home/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

function Home(){
  return <a href={url}> Teste </a>;
}

function Token(){

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
      code_verifier: code_verifier,
      grant_type:"authorization_code",
    })
    axios.post(url, data, {headers:headers})
    .then((res)=>{
      console.warn(res);
    })
 
  
  return <div> Code:{code}<br/>CodeVerifier:{code_verifier} </div>;
}
