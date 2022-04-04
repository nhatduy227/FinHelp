import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analytics from "./Pages/Analytics/Analytics";
import LiveMarket from "./Pages/LiveMarket/LiveMarket";
import Login from "./Pages/Login/Login";
import { auth } from "./firebase-config";
import Grid from '@mui/material/Grid';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import Container from '@mui/material/Container';

function App() {

  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserSignedIn(true)
    }
    else {
      setIsUserSignedIn(false)
    }

  })
  if (isUserSignedIn === true) {
    return (
      <Router>
        <div className="root">
          <Grid container direction="column">
            <Grid item className="header">
              <Header />
            </Grid>
            <Grid item className="content">
              <Grid container>
                <Grid item sm={4} md={3} lg={2}>
                  <NavBar />
                </Grid>
                <Grid item sm={8} md={9} lg={10}>
                  <div className="container">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                    </Routes>
                    <Routes>
                      <Route path="/Analytics" element={<Analytics />} />
                    </Routes>
                    <Routes>
                      <Route path="/LiveMarket" element={<LiveMarket />} />
                    </Routes>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Router>
    )
  }
  else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    )
  }
}

export default App;
