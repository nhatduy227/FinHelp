import React from "react";
import { auth, createUserDocument } from "../../firebase-config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function Login() {
  const signInWithGoogle = () => {
    const PortfolioInfo = {Deposit: 0};
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(async (re) => {
        const user = re.user;
        console.log(re);
        // TODO: Create User Document for saving Portfolio Info
        await createUserDocument(user, PortfolioInfo);
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
