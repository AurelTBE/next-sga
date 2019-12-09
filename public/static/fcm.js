importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js");
firebase.initializeApp({
	// Project Settings => Add Firebase to your web app
  apiKey: "AIzaSyDIFMxGHgJ64un5OQmiUQW-1umTaEpY8TA",
  authDomain: "notifications-sga.firebaseapp.com",
  databaseURL: "https://notifications-sga.firebaseio.com",
  projectId: "notifications-sga",
  storageBucket: "notifications-sga.appspot.com",
  messagingSenderId: "539284504552",
  appId: "1:539284504552:web:9eb3d24371c3ea28352e5d",
  measurementId: "G-ND9S7BEXVX"
});

firebase.messaging()