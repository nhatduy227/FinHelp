import './App.css';
import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import { auth } from './firebase-config';
import Analytics from './Pages/Analytics/Analytics';
import Dashboard from './Pages/Dashboard/Dashboard';
import LiveMarket from './Pages/LiveMarket/LiveMarket';
import Login from './Pages/Login/Login';
import Onboarding from "./Pages/Onboarding/Onboarding";
import Portfolio from './Pages/Portfolio/Portfolio';

function App() {
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [firstTimeUser, setFirstTimeUser] = useState(true);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsUserSignedIn(true);
    } else {
      setIsUserSignedIn(false);
    }
  });
  useEffect(()=>{
    let user_status = localStorage.getItem('firstTimeUser');
    if(user_status === "1"){
      setFirstTimeUser(false);
    }
  },[])

  const renderRoute = (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
      <Routes>
        <Route path="/Analytics" element={<Analytics />} />
      </Routes>
      <Routes>
        <Route path="/LiveMarket" element={<LiveMarket />} />
      </Routes>
      <Routes>
        <Route path="/Portfolio" element={<Portfolio />} />
      </Routes>
    </div>
  )


  if (isUserSignedIn === true) {
    if (firstTimeUser === true) {
      return (<Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
        </Routes>
      </Router>)
    }
    return (
      <Router>
        <div>
          <Header />
          <NavBar>
            {renderRoute}
          </NavBar>
        </div>
      </Router>
    );
  } else {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
