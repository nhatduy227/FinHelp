import React, { useState, useEffect } from "react";
import {
  auth,
  getFirestoreUser,
  updateFirestoreUser,
} from "../../firebase-config";
import Modal from "react-modal";
import TextField from "@mui/material/TextField";
import Graph from "../../Components/Graph/Graph";
import Button from "@mui/material/Button";
import { User } from "../../Models/User";
import { DocumentData } from "firebase/firestore";
import Filter from "../../Components/Filter/Filter";
import { Typography } from "@mui/material";
import Investors from "../../Components/Investors/Investors";
import "./LiveMarket.css";

function LiveMarket() {
  const dummyTicker = "AAPL";
  const uid = auth.currentUser?.uid;
  const [userData, setUserData] = useState<User | DocumentData>();

  useEffect(() => {
    getFirestoreUser(uid).then(function (data) {
      setUserData(data);
      return data;
    });
  }, [uid]);
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
  const [action, setAction] = useState();
  const [errorStatus, setError] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);

  const handleClose = () => setShow(false);
  const handleEnterAmount = (amount: string) => {
    if (amount !== "") {
      const depositTotal: number = parseInt(amount);

      if (depositTotal < 0) {
        setError(true);
      } else {
        setError(false);
        setDepositAmount(depositTotal);
      }
    }
  };
  function handleShow(action: any) {
    setAction(action);
    setShow(true);
  }
  async function handleBuy(ticker: any, amount: any) {
    const deposit = userData?.deposit;
    const stock = userData?.stock;
    const uid = userData?.uid;
    if (deposit < amount) {
      alert(`fund is insufficient`);
    } else {
      const existedStock = stock.filter((s) => s.ticker === ticker)
      const updateStock = {
        ticker: ticker,
        amount: amount,
      };
      const updateData = {
        ...userData,
        deposit: deposit - amount,
        stock: stock?.ticker
          ? stock.concat([{ ...updateStock, amount: stock?.amount + amount }])
          : stock.concat([updateStock]),
      };
      await updateFirestoreUser(uid, updateData);
      alert(`$${amount} of ${ticker} stockes has been bought`);
    }
  }
  async function handleSell(ticker: any, amount: any) {
    const deposit = userData?.deposit;
    const stock = userData?.stock;
    const uid = userData?.uid;
    if (stock?.ticker != ticker && stock?.amount < amount) {
      alert(`No stock available to sell`);
    } else {
      const updateStock = {
        ticker: stock?.ticker,
        amount: stock?.amount,
      };
      const updateData = {
        ...userData,
        deposit: deposit + amount,
        stock: stock.concat([{ ...updateStock, amount: stock?.amount - amount }]),
      };
      await updateFirestoreUser(uid, updateData);
      alert(`$${amount} of ${ticker} stockes has been sold`);
    }
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
            error={errorStatus}
            helperText={errorStatus ? "Please enter the valid amount" : ""}
            id="standard-basic"
            label="Amount"
            variant="standard"
            onChange={(v) => handleEnterAmount(v.target.value)}
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
              onClick={() => {
                action === "buy"
                  ? handleBuy(dummyTicker, depositAmount)
                  : handleSell(dummyTicker, depositAmount);
                handleClose();
              }}
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
