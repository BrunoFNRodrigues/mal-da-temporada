import cryptoBrowserify from 'crypto-browserify';
import https from 'https';
const SCOPE = 'phone+email+openid+profile+aws.cognito.signin.user.admin';

const accessToken = window.localStorage.getItem('accessToken');
const idToken = window.localStorage.getItem('idToken');
const refreshToken = window.localStorage.getItem('refreshToken');
let tokens = accessToken === null ? null : {
    accessToken,
    idToken,
    refreshToken,
  };

const base64URLEncode = str => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = buffer => {
  return cryptoBrowserify.createHash('sha256').update(buffer).digest();
}

let storedVerifier = window.localStorage.getItem('verifier');
if (storedVerifier === null) {
  const newVerifier = base64URLEncode(cryptoBrowserify.randomBytes(32));
  window.localStorage.setItem('verifier', newVerifier);
  storedVerifier = newVerifier;
}
const verifier = storedVerifier; 
const challenge = verifier;
const baseUrl = "https://myanimelist.net/v1";
const clientId = "046e703006cab4f534ee6af14f564962";
const redirectUri = "http://localhost:3000/token";
const tokenUrl = `${baseUrl}/oauth2/token`;

export const loginUrl = `${baseUrl}/oauth2/authorize?scope=${SCOPE}&response_type=code&client_id=${clientId}&code_challenge=${challenge}&code_challenge_method=plain&redirect_uri=${redirectUri}`;

export const logoutUrl = `${baseUrl}/logout?client_id=${clientId}&logout_uri=${redirectUri}`;

export const refreshTokens = async refreshToken => {
  const body = `grant_type=refresh_token&client_id=${clientId}&refresh_token=${refreshToken}`;
  const response = https.request(tokenUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
  },
  (response) => {
        console.log('Status code: ', response.statusCode);

        response.on('data', (buffer) => {
            console.log(buffer.toString());
        });
    }
  );

  const { access_token, id_token } = await response.json();
  window.localStorage.setItem('accessToken', access_token);
  window.localStorage.setItem('idToken', id_token);
  window.localStorage.setItem('refreshToken', refreshToken);
  tokens = {
    accessToken: access_token,
    idToken: id_token,
    refreshToken,
  };
};

export const login = async code => {
  console.log("code_verifier:",challenge);
  console.log("code:",code);
  const body = `grant_type=authorization_code&client_id=${clientId}&client_secret=5822e13e0e292e2da5ad4e900cd2290401212bab75da0bb36c40cb13356d3d0e&code_verifier=${verifier}&code=${code}&redirect_uri=${redirectUri}`;
  const response = await fetch(tokenUrl, {
    method: 'POST',
    mode:'cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
    },
    body,
  });
  if (!response.ok) {
    throw Error();
  }
  const { access_token, id_token, refresh_token } = await response.json();
  window.localStorage.setItem('accessToken', access_token);
  window.localStorage.setItem('idToken', id_token);
  window.localStorage.setItem('refreshToken', refresh_token);
  tokens = {
    accessToken: access_token,
    idToken: id_token,
    refreshToken: refresh_token,
  };
};

export const logout = async () => {
  window.localStorage.removeItem('accessToken');
  window.localStorage.removeItem('idToken');
  window.localStorage.removeItem('refreshToken');
  tokens = null;
};

export const getTokens = () => tokens;