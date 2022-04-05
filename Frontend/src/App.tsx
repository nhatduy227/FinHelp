import './App.css';
import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Header/Header';
import NavBar from './Components/NavBar/NavBar';
import { auth } from './firebase-config';
import Analytics from './Pages/Analytics/Analytics';
import Dashboard from './Pages/Dashboard/Dashboard';
import LiveMarket from './Pages/LiveMarket/LiveMarket';
import Login from './Pages/Login/Login';

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
    </div>
  )

  if (isUserSignedIn === true) {
    return (
      <Router>
        <div>
          <Header />
          <NavBar>
            {renderRoute}
          </NavBar>
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
