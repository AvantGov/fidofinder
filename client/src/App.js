// * DEPENDS
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


// * comps
import Login from './Components/Login';
import Nav from './Components/Nav';
import Browse from './Components/Browse';
import ProtectedRoute from './utils/comps/ProtectedRoute';
import LogoutButton from './Components/LogoutButton';
import Account from './Components/Account';
import FavoriteList from './Components/FavoriteList';
import Filter from './Components/Filter';

// * CSS 
import './CSS/App.css';





function App() {
  var status = useSelector(state => {return state.session.status})



  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route exact path='/' element={<Login />}></Route>
        <Route exact path='/browse' element={
          <ProtectedRoute status={status}>
            <LogoutButton />
            <Browse />
          </ProtectedRoute>
        }/>
        <Route exact path='/account' element={
          <ProtectedRoute status={status}>
            <LogoutButton />
            <Account />
          </ProtectedRoute>
        }/>
        <Route exact path='/account/favorites' element={
          <ProtectedRoute status={status}>
            <LogoutButton />
            <FavoriteList />
          </ProtectedRoute>
        }/>
        <Route exact path='/filter' element={
          <ProtectedRoute status={status}>
            <LogoutButton />
            <Filter />
          </ProtectedRoute>
        }/>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </div>  
  );
}

export default App;
