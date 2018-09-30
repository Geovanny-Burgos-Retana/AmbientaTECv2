import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyCaBfGMITyCL7bsAcQQ5htdbvrPD6dvQ4A",
    authDomain: "proyecto1-61faf.firebaseapp.com",
    databaseURL: "https://proyecto1-61faf.firebaseio.com",
    projectId: "proyecto1-61faf",
    storageBucket: "proyecto1-61faf.appspot.com",
    messagingSenderId: "1037679625661"
};
firebase.initializeApp(config);
export const providerTwitter = new firebase.auth.TwitterAuthProvider();
export const providerFacebook = new firebase.auth.FacebookAuthProvider();
export const auth = firebase.auth();
export default firebase;