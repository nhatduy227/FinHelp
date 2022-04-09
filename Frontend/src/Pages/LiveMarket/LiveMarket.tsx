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
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./LiveMarket.css";

function LiveMarket() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ticker = state as string;

  console.log(state)

  const dummyTicker = (ticker !== null) ? ticker : "AAPL";
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
  function moveToPortfolio() {
    navigate('/');
  }
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
      const existedStock = stock.filter((s) => s.ticker === ticker);
      let updateStock;
      if (existedStock.length === 1) {
        for (var i = 0; i < stock.length; ++i) {
          if (stock[i]["ticker"] === ticker) {
            stock[i]["amount"] += amount;
          }
        }
      } else {
        updateStock = stock.concat([
          {
            ticker: ticker,
            amount: amount,
          },
        ]);
      }
      const updateData = {
        ...userData,
        deposit: deposit - amount,
        stock: existedStock.length === 1 ? stock : updateStock,
      };
      await updateFirestoreUser(uid, updateData);
      alert(`$${amount} of ${ticker} stockes has been bought`);
      moveToPortfolio()
    }
  }
  async function handleSell(ticker: any, amount: any) {
    const deposit = userData?.deposit;
    const stock = userData?.stock;
    const uid = userData?.uid;
    const existedStock = stock.filter((s) => s.ticker === ticker);
    if (existedStock[0]?.ticker != ticker && existedStock[0]?.amount < amount) {
      alert(`No stock available to sell`);
    } else {
      for (var i = 0; i < stock.length; ++i) {
        if (stock[i]["ticker"] === ticker) {
          stock[i]["amount"] -= amount;
        }
      }
      const updateData = {
        ...userData,
        deposit: deposit + amount,
        stock: stock,
      };
      await updateFirestoreUser(uid, updateData);
      alert(`$${amount} of ${ticker} stockes has been sold`);
      moveToPortfolio();
    }
  }

  return (
    <>
      <div className="container" style={{ width: '100%' }}>
        <strong>{dummyTicker}</strong>
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
