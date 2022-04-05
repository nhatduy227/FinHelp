import React from "react";
import './Onboarding.css'
import { auth } from "../../firebase-config";
import Navbar from "../../Components/NavBar/NavBar";

function Onboarding() {
  const signOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <div className="container">
        <p>Onboarding</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Onboarding;
