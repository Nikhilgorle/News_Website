import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false // Track whether the user is logged in
    };
  }

  // Method to update login status
  handleLogin = () => {
    this.setState({ isLoggedIn: true });
  }

  handleLogout = () => {
    this.setState({ isLoggedIn: false });
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
        <Routes>
        <Route path="/" element={<Login handleLogin={this.handleLogin} />} />
        {this.state.isLoggedIn && (
              <>
                <Route path="/general" element={<News key="general" pageSize={5} category="general" />} />
                <Route path="/sports" element={<News key="sports" pageSize={5} category="sports" />} />
                <Route path="/business" element={<News key="business" pageSize={5} category="business" />} />
                <Route path="/entertainment" element={<News key="entertainment" pageSize={5} category="entertainment" />} />
                <Route path="/health" element={<News key="health" pageSize={5} category="health" />} />
                <Route path="/science" element={<News key="science" pageSize={5} category="science" />} />
                <Route path="/technology" element={<News key="technology" pageSize={5} category="technology" />} />
              </>
            )}
        </Routes>
        </Router>
      </div>
    )
  }
}
