import React from "react";
import { auth, updateFirestoreUser } from "../../firebase-config";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";

function Login() {
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const isNewUser = getAdditionalUserInfo(result);
        if (isNewUser) {
          const userData = {
            uid : user.uid,
            userName: user.displayName,
            profilePic: user.photoURL,
            investingStrategy: "",
            deposit: 0,          };
          await updateFirestoreUser(user.uid, userData);
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
