import firebase from 'firebase/app';
import firestore from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCrTqsZZyp2-Kq4u90IVALsLInj0MxFiNA",
    authDomain: "crudvue-70b72.firebaseapp.com",
    databaseURL: "https://crudvue-70b72.firebaseio.com",
    projectId: "crudvue-70b72",
    storageBucket: "",
    messagingSenderId: "881395870806",
    appId: "1:881395870806:web:c49b8f50fd7e0d80"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

firebaseApp.firestore();

export default firebase.firestore()