import React, { Component } from 'react';
import classnames from 'classnames';

//use axios until redux.
import axios from 'axios';

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
    axios
      .post('/api/users/login', userToAuth)
      .then(result => console.log(result.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="login">
        <div className="flex-container form-cont">
          <h1 className="form-title">Log in</h1>
          <p className="lead">Log in to your account and join the pack</p>
          <form noValidate onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                className={classnames('form-input-field', {
                  'invalid-form-field': errors.email
                })}
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {errors.email && (
                <div className="invalid-msg">{errors.email}</div>
              )}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className={classnames('form-input-field', {
                  'invalid-msg': errors.password
                })}
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {errors.password && (
                <div className="invalid-msg">{errors.password}</div>
              )}
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}
