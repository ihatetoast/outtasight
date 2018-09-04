import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//provides store that holds state
import { Provider } from 'react-redux';
import store from './store';
//components
import Nav from './components/layout/Nav';
import Landing from './components/layout/Landing';
import Footer from './components/layout/Footer';
import Rego from './components/auth/Rego';
import Login from './components/auth/Login';

import './App.css';
//landing has diff dimensions than the box for login and sign up. keep in diff div for styling.
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Nav />
            <Route exact path="/" component={Landing} />
            <div className="auth-container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Rego} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
