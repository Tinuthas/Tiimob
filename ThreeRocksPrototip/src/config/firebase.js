import * as firebase from 'firebase'

import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyAZu1XA16uHMvdPiuAY10QLXX7LWTUeA2w",
    authDomain: "tiimob-3402b.firebaseapp.com",
    projectId: "tiimob-3402b",
    storageBucket: "tiimob-3402b.appspot.com",
    messagingSenderId: "1076391599768",
    appId: "1:1076391599768:web:305f4bd1ff1d69d7d27aed",
    measurementId: "G-MQ7MSNSP1V"
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.firestore()