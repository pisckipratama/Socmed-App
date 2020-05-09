import React from 'react';
import NavBar from './components/Navbar';
import "./App.css";
import { BrowserRouter, Route } from 'react-router-dom';
import HomeComponent from './components/screens/HomeComponent';
import SignupComponent from './components/screens/SignupComponent';
import ProfileComponent from './components/screens/ProfileComponent';
import LoginComponent from './components/screens/LoginComponent';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Route exact path="/"> <HomeComponent /> </Route>
      <Route path="/login"> <LoginComponent /> </Route>
      <Route path="/signup"> <SignupComponent /> </Route>
      <Route path="/profile"> <ProfileComponent /> </Route>
    </BrowserRouter>
  );
};

export default App;
