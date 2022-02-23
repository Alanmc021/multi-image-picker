import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firebase-auth';
import "firebase/firestore"
import 'firebase/storage'

var firebaseConfig = {
   //Firebase keys
};

if (!firebase.apps.length) { 
    firebase.initializeApp(firebaseConfig); 
}

export default firebase;