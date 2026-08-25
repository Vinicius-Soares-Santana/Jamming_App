import React from 'react';
import { useState, useEffect } from 'react';

const client_Id = '7ab8156d56d249809c35bce4a868eee8';

const redirect_uri =
  'http://127.0.0.1:5173/';

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

export const loginSpotify = async () => {
  const codeVerifier = generateRandomString(64);
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
