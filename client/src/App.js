import React, { Component } from 'react';
import Nav from './components/layout/Nav/Nav';
import Landing from './components/layout/Landing/Landing';
import Footer from './components/layout/Footer/Footer';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Landing />
        <Footer />
      </div>
    );
  }
}

export default App;
