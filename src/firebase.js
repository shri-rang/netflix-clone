// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvNA7GvWeiRO3Nrc7-Pj3k87MpVZkWgf8",
  authDomain: "netflix-clone-5b90e.firebaseapp.com",
  projectId: "netflix-clone-5b90e",
  storageBucket: "netflix-clone-5b90e.firebasestorage.app",
  messagingSenderId: "508130440346",
  appId: "1:508130440346:web:6f51f9534dc5fd0b065b23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth =  getAuth(app)
const db = getFirestore(app)

const signUp = async( name,email, password) => {
 
       try {
         
          const res =   await  createUserWithEmailAndPassword(auth, email, password);
          const user = res.user;
          await addDoc( collection(db, "user"), {
         uid: user.uid,
         name,
         authProvider: "local",
         email
          }) 

       } catch (error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' ') );
       }

}


const login = async (email, password)=>{
     try {
       
        await signInWithEmailAndPassword(auth, email,password) 
       
      
     } catch (error) {
      console.log(error);
      // alert(error);
     toast.error(error.code.split('/')[1].split('-').join(' '));
     }
} 


const logout = ()=>{
      signOut(auth);
}


export { auth , db ,login , signUp , logout}