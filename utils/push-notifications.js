import firebase from 'firebase/app';

export const initializeFirebase = () => {
  firebase.initializeApp({
    messagingSenderId: "31630139447"
  });
}

export const askForPermissioToReceiveNotifications = async () => {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging.getToken();
    console.log('token utilisateur :', token);
    
    return token;
  } catch (error) {
    console.error(error);
  }
}