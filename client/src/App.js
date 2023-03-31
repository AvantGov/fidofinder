// * DEPENDS
import React from 'react';
import {Routes, Route } from 'react-router-dom';

// * comps
import Login from './Components/Login';
import Nav from './Components/Nav';

// * CSS 
import './CSS/App.css';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
