import React from 'react';
import './App.css';
import Home from './components/Home/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

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
