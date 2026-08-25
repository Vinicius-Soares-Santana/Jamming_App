import React from 'react';
import { useState, useEffect } from 'react';

function loginButton(props) {
  return (
    <button
      className={props.className}
      onClick={props.loginSpotify}
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
