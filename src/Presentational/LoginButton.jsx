import React from 'react';
import { useState, useEffect } from 'react';
import { loginSpotify } from '../Containers/Spotify';

function loginButton() {
  return (
    <button
      onClick={loginSpotify}
      style={{
        color: 'black',
        backgroundColor: 'white',
        padding: '10px 20px',
        fontSize: '16px',
      }}
    >
      Login With Spotify
    </button>
  );
}

export default loginButton;
