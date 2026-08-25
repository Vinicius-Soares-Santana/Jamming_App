import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import LoginButton from './Presentational/LoginButton';
import Jamming_main_screen from './Containers/Jamming_main_screen';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [loginDone, setLoginDone] = useState(false);
  const [token, setToken] = useState(null);

  let code;
  let codeVerifier;
  let tokenResponse;


  //My Code ------------------------------------------------------------------------------------------

  //loginInformation
  const client_Id = '7ab8156d56d249809c35bce4a868eee8';

  const redirect_uri =
    'https://vitejsvitezfrvuyds-myxq--5173--017acfb7.local-corp.webcontainer.io';

  const generateRandomString = (length) => {
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const values = crypto.getRandomValues(new Uint8Array(length));

    return values.reduce((acc, x) => acc + possible[x % possible.length], '');
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);

    return window.crypto.subtle.digest('SHA-256', data);
  };

  const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  const loginSpotify = async () => {
    codeVerifier = generateRandomString(64);
    localStorage.setItem('code_verifier', codeVerifier);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    const params = {
      response_type: 'code',
      client_id: client_Id,
      scope: 'user-read-private',
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
      redirect_uri: redirect_uri,
    };

    const authUrl =
      'https://accounts.spotify.com/authorize?' +
      new URLSearchParams(params).toString();

    window.location.href = authUrl;
  };

  //login verification

  useEffect(() => {
    const loginVerification = async () => {
      const params_login = new URLSearchParams(window.location.search);
      code = params_login.get('code');

      codeVerifier = localStorage.getItem('code_verifier');

      if (code) {
        setLoginDone(true);
        tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            client_id: client_Id,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
            code_verifier: codeVerifier,
          }),
        });

        const tokenData = await tokenResponse.json();
        setToken(tokenData.access_token);
      } else {
        setLoginDone(false);
      }
    };

    loginVerification();
  }, []);

  

  if (loginDone) {
    return <Jamming_main_screen token={token} />
  } else {
    return <>
        <section id="center">
            <LoginButton className="spotifyLoginButton" loginSpotify={loginSpotify} />
        </section>
        </>
  }

  //----------------------------------------------------------------------------------------------

}

export default App;
