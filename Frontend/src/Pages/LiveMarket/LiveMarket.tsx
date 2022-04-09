import React, { useState } from "react";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import Graph from "../../Components/Graph/Graph";
import Button from "@mui/material/Button";
import Filter from "../../Components/Filter/Filter";
import { Typography } from "@mui/material";
import Investors from "../../Components/Investors/Investors";
import "./LiveMarket.css";

function LiveMarket() {
  const dummyTicker = "AAPL";
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };
  const [show, setShow] = useState(false);
  const [action, setAction] = useState(false);

  const handleClose = () => setShow(false);
  function handleShow(action:any)
  {
    setAction(action)
    setShow(true);
  }
  
  return (
    <>
      <div className="container">
        <strong>{dummyTicker}</strong>
        <Filter />
        <Graph ticker={dummyTicker} />
        <div className="btn-container">
          <div className="btn">
            <Button
              variant="contained"
              color="error"
              style={{ color: "white" }}
              onClick={() => handleShow("sell")}
            >
              <div className="sell">SELL</div>
            </Button>
          </div>
          <div className="btn">
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
              onClick={() => handleShow("buy")}
            >
              <div className="buy">BUY</div>
            </Button>
          </div>
        </div>
        <Investors />
      </div>
      <Modal
        isOpen={show}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="btn-container">
          <Typography variant="h6">
            How much stocks do you want to {action}?
          </Typography>
        </div>
        <div className="btn-container">
          <TextField
            // error={errorStatus}
            // helperText={errorStatus ? "Please enter the valid amount" : ""}
            id="standard-basic"
            label="Amount"
            variant="standard"
            // onChange={(v) => handleDepositAmount(v.target.value)}
            defaultValue={0}
          />
        </div>

        <div className="btn-container">
          <div className="btn">
            <Button
              variant="contained"
              color="error"
              style={{ color: "white" }}
              onClick={handleClose}
            >
              <div className="close">CLOSE</div>
            </Button>
          </div>
          <div className="btn">
            <Button
              variant="contained"
              color="primary"
              style={{ color: "white" }}
            >
              <div className="confirm">CONFIRM</div>
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default LiveMarket;
