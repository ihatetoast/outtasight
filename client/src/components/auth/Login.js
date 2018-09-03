import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //handle change evt in input fields:
  handleChange(e) {
    // console.log(e.target.name, e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const userToAuth = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(userToAuth);
  }
  render() {
    return (
      <div className="login">
        <div className="flex-container form-cont">
          <h1 className="form-title">Log in</h1>
          <p className="lead">Log in to your account and join the pack</p>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}
