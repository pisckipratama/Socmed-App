import React, { useEffect, createContext, useReducer, useContext } from 'react';
import NavBar from './components/Navbar';
import "./App.css";
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import HomeComponent from './components/screens/HomeComponent';
import SignupComponent from './components/screens/SignupComponent';
import ProfileComponent from './components/screens/ProfileComponent';
import LoginComponent from './components/screens/LoginComponent';
import CreatePostComponent from './components/screens/CreatePostComponent';
import { reducer, initialState } from './reducer/userReduce';

export const UserContext = createContext();
const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      history.push('/')
    } else {
      history.push('login');
    }
  }, [history]);

  return (
    <Switch>
      <Route exact path="/"> <HomeComponent /> </Route>
      <Route path="/login"> <LoginComponent /> </Route>
      <Route path="/signup"> <SignupComponent /> </Route>
      <Route path="/profile"> <ProfileComponent /> </Route>
      <Route path="/postpicture"> <CreatePostComponent /> </Route>
    </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
};

export default App;
