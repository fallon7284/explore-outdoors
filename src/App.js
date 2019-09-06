import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Drawer } from '@material-ui/core'
import WelcomeScreen from '../src/components/WelcomeScreen'
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={WelcomeScreen}/>
        <Route path="/home" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
