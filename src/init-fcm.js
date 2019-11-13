import * as firebase from "firebase";

const config = {
    messagingSenderId: "539284504552"
};

export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();