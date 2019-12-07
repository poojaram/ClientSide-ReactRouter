import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css'; //using FA 4.7 atm

import App from './App'; 

//import and configure firebase here

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAAwSitHtrXQsCnN_SuyJ_01R_kf-ADvwc",
    authDomain: "info340problemsettest.firebaseapp.com",
    databaseURL: "https://info340problemsettest.firebaseio.com",
    projectId: "info340problemsettest",
    storageBucket: "info340problemsettest.appspot.com",
    messagingSenderId: "100117811505"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));