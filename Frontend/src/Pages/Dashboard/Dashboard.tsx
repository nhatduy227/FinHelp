import React from "react";
import './Dashboard.css'
import { auth } from "../../firebase-config";
import Navbar from "../../Components/NavBar/NavBar";

function Dashboard() {
  const signOut = () => {
    auth.signOut();
  };
  return (
    <div>
      <Navbar />
      <div className="container">
        <p>Dashboard</p>
        <button onClick={signOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default Dashboard;
