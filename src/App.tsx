import React from 'react';
import Register from './components/Register'
import Routes from './routes/Routes'
import './App.css';
import axios from "axios"
import {UserContextProvider} from './context/UserContext'


function App() {
  axios.defaults.baseURL = "http://localhost:5050"
  axios.defaults.withCredentials = true

  return (

  <UserContextProvider >
   <Routes />
 </UserContextProvider>
  );
}

export default App;
