import React from "react";
import Graph from "../../Components/Graph/Graph";
import Button from "@mui/material/Button";
import Filter from "../../Components/Filter/Filter";
import { Investors } from "../../Components/Investors/Investors";
import "./LiveMarket.css";

function LiveMarket() {
  const dummyTicker = "AAPL";
  return (
    <div className="container">
      <strong>{dummyTicker}</strong>
      <Filter />
      <Graph ticker={dummyTicker} />
      <div className="btn-container">
        <div className="btn">
          <Button variant="contained" color="error" style={{ color: "white" }}>
            <div className="sell">SELL</div>
          </Button>
        </div>
        <div className="btn">
          <Button
            variant="contained"
            color="primary"
            style={{ color: "white" }}
          >
            <div className="buy">BUY</div>
          </Button>
        </div>
      </div>
      <Investors />
    </div>
  );
}

export default LiveMarket;
