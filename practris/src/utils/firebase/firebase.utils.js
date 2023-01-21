import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, createUserWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVZNbkc5aFcaXAEkDUqvphSVDXLXG5LmE",
  authDomain: "practris-f835f.firebaseapp.com",
  projectId: "practris-f835f",
  storageBucket: "practris-f835f.appspot.com",
  messagingSenderId: "469631587360",
  appId: "1:469631587360:web:ca087937b8651fe6101845",
  measurementId: "G-G2YCDM3BZ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth() //Instantiate Firebase's authentication instance
export const db = getFirestore() //Instantiate Firebase's database instance


// Instantiate the additional information needed for a typical practris account
const templateAccountInformation = {
  sprintGamesPlayed : 0,
  accountType : "normal_user",
  sprintPB : false,
}


// Create user document (basically creating a new account)
export const createUserDocumentFromAuth = async (userAuth, additionalInformation={}) => {
  //If i dont get userAuth. return nothing. this is to protect frontend from firebase changes
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid) //userDocRef is an object that is the reference to a certain point in Firestore
  const userSnapshot = await getDoc(userDocRef) //getDoc returns the user data that userDocRef is pointing to

  if(!userSnapshot.exists()) { //returns true if there is data at that reference.
    // Get data to create new user document (account) with
    const { displayName, email} = userAuth; //destructure displayName and email from userAuth
    const createdAt = new Date()

    try{
      await setDoc(userDocRef, {displayName, email, createdAt, ...templateAccountInformation, ...additionalInformation})
    }catch (error){
      console.log('error creating the user', error.message)
    }
  }
  //if user exists
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  //If i dont get email or password. return nothing. this is to protect frontend from firebase changes
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}