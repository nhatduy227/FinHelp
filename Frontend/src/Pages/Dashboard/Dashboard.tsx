import React from "react";
import './Dashboard.css'
import { Investors } from "../../Components/Investors/Investors";
import News from "../../Components/News/News";

function Dashboard() {
  return (
    <div className="container">
      <News/>
      <Investors/>
    </div>
  );
}

export default Dashboard;
