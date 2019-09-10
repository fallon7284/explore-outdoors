import React from 'react';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import WelcomeScreen from '../src/components/WelcomeScreen'

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
