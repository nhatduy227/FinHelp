import React from "react";
import './Dashboard.css'
import { auth } from "../../firebase-config";
import { Investors } from "../../Components/Investors/Investors";
import News from "../../Components/News/News";

function Dashboard() {
  const signOut = () => {
    auth.signOut();
  };
  const clearLocalStorage = () => {
    localStorage.clear()
  }
  return (
    <div className="container">
      {/* <p>Dashboard</p>

      <button onClick={signOut}>Sign Out</button> */}
      <News/>
      <Investors/>
    </div>
  );
}

export default Dashboard;
