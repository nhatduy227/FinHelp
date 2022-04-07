import React from "react";
import "./Onboarding.css";

function Onboarding() {
  const completeOnboarding = () => {
    localStorage.setItem("firstTimeUser", "1");
    window.location.reload();
  };
  return (
    <div>
      <p>Tell us a little more about you </p>
      <button onClick={completeOnboarding}>Complete Onboarding</button>
    </div>
  );
}

export default Onboarding;
