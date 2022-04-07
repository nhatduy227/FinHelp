import React from "react";
import Graph from "../../Components/Graph/Graph";
import './LiveMarket.css'

function LiveMarket() {
  const dummyTicker = "AAPL"
  return (
    <div className="container">
      <p>{dummyTicker}</p>
      <Graph ticker = {dummyTicker}/>
    </div>
  );
}

export default LiveMarket;