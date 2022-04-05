import React from "react";
import "./Onboarding.css";

function Onboarding() {
  const completeOnboarding = () =>{ 
    localStorage.setItem('firstTimeUser', "1");
    window.location.reload();
  }
  return (
    <div>
      <div className="container">
        <p>Onboarding</p>
        <button onClick={completeOnboarding}>Complete Onboarding</button>
      </div>
    </div>
  );
}

export default Onboarding;
