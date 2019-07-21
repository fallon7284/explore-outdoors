import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
