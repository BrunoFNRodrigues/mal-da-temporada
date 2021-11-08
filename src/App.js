import React, { useEffect } from 'react';
import {loginUrl, login} from './Loger';
import './App.css';
// import Home from "./components/Home";
// import Token from "./components/Token";
import axios from 'axios';  
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";


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
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;




function Token(){
  useEffect(()=>{
    const queryParams = new URLSearchParams(window.location.search);
    const code = queryParams.get('code');
    const token = login(code)
    console.warn(token)
  },[])
  // console.warn(global.code_verifier);
  // const queryParams = new URLSearchParams(window.location.search);
  // const code = queryParams.get('code');
  // const headers = {
  //   "Content-Type": "application/x-www-form-urlencoded"
  // };
  // const url = "https://myanimelist.net/v1/oauth2/token";
  // const data = querystring.stringify({
  //   client_id : "046e703006cab4f534ee6af14f564962",
  //   code : code,
  //   client_secret: "5822e13e0e292e2da5ad4e900cd2290401212bab75da0bb36c40cb13356d3d0e",
  //   code_verifier: global.code_verifier,
  //   grant_type:"authorization_code",
  //   redirect_uri:"http://localhost:3000/token",
  // })
  // axios.post(url, data, {headers:headers})
  // .then((res)=>{
  //   console.log(res);
  // })


return <div> Code:{}<br/>CodeVerifier:{} </div>;
}

function Home(){
  const url = "https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=046e703006cab4f534ee6af14f564962&code_challenge="+""+"&state=RequestID42&redirect_uri=http://localhost:3000/token";
  return <a href={loginUrl}> Teste </a>;
}