import React from "react";
import './Dashboard.css'
import { auth } from "../../firebase-config";

function Dashboard() {
  const signOut = () => {
    auth.signOut();
  };
  return (
    <div className="container">
      <p>Dashboard</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
}

export default Dashboard;
