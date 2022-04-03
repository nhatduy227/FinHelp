import React, { useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Analytics from "./Pages/Analytics/Analytics";
import LiveMarket from "./Pages/LiveMarket/LiveMarket";
import Login from "./Pages/Login/Login";
import { auth } from "./firebase-config";
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
        <Routes>
        <Route path="/" element={<Dashboard />}/>
        </Routes>
        <Routes>
        <Route path="/Analytics" element={<Analytics />}/>
        </Routes>
        <Routes>
        <Route path="/LiveMarket" element={<LiveMarket />}/>
        </Routes>
      </Router>
    )
  }
  else {
    return (
      <Router>
        <Routes>
        <Route path="/" element={<Login />}/>
        </Routes>
      </Router>
    )
  }
}

export default App;
