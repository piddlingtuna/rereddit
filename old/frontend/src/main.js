/**
 * Written by A. Hinds with Z. Afzal 2018 for UNSW CSE.
 * 
 * Updated 2019.
 */

// import your own scripts here.

// your app must take an apiUrl as an argument --
// this will allow us to verify your apps behaviour with 
// different datasets.

import { renderUser } from './components/user.js';
import { renderStranger } from './components/stranger.js';

const initApp = (apiUrl) => {
  const token = localStorage.getItem('item');
  if (token) {
    renderUser(apiUrl);
  } else {
    renderStranger(apiUrl);
  }
}

export default initApp;