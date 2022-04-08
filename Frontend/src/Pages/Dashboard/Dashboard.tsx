import React from "react";
import './Dashboard.css'
import { auth } from "../../firebase-config";

function Dashboard() {
  const signOut = () => {
    auth.signOut();
  };
  const clearLocalStorage = () => {
    localStorage.clear()
  }
  return (
    <div className="container">
      <p>Dashboard</p>
      <button onClick={signOut}>Sign Out</button>
      <button onClick={clearLocalStorage}>Clear Local Storage - testing only</button>
    </div>
  );
}

export default Dashboard;
