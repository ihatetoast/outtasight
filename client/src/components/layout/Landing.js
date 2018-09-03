import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="overlay">
          <div className="flex-container landing-cont">
            <div className="landing-textbox">
              <h1 className="title">OuttaSight</h1>
              <p className="subtitle">
                A social dogpark for volunteers of sighthound adoption and
                rescue groups
              </p>
              <div className="auth-buttons">
                <div className="auth-button">
                  <Link to="/register" className="btn">
                    Sign Up
                  </Link>
                </div>
                <div className="auth-button">
                  <Link to="/login" className="btn">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
