import React from "react";
import { auth, db } from "../../firebase-config";
import { doc, setDoc } from "firebase/firestore";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

function Login() {
  const signInWithGoogle = () => {
    const addUser = async (userId: any, userData: any) => {
      const userRef = doc(db, "users", userId);
      return await setDoc(userRef, userData);
    };
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;

        const isNewUser = getAdditionalUserInfo(result);
        if (isNewUser) {
          const userData = { investingStrategy: "", deposit: 0 };
          await addUser(user.uid, userData);
        } else {
          console.log("User already exists");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <p>Landing Page</p>
      <button onClick={signInWithGoogle}>Get Started</button>
    </div>
  );
}

export default Login;
