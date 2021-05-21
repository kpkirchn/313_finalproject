import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDM4qLvzZSs28FTOEwyRcpo7Hqo9o0Cz_o",
    authDomain: "cit313final.firebaseapp.com",
    projectId: "cit313final",
    storageBucket: "cit313final.appspot.com",
    messagingSenderId: "638923107302",
    appId: "1:638923107302:web:418cf240e07394e3df4427"
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
