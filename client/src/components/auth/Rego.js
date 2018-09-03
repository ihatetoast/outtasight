import React, { Component } from 'react';
import classnames from 'classnames';

//use axios until redux.
import axios from 'axios';

export default class Rego extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  //handle change evt in input fields:
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    axios
      .post('/api/users/register', newUser)
      .then(result => console.log(result.data))
      .catch(err => this.setState({ errors: err.response.data }));
  }
  render() {
    const { errors } = this.state;
    return (
      <div className="rego">
        <div className="flex-container form-cont">
          <h1 className="display-4 text-center">Sign Up</h1>
          <p className="lead text-center">
            Create an OuttaSight account to join the pack
          </p>
          <form noValidate onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Name"
                className={classnames('form-input-field', {
                  'invalid-form-field': errors.name
                })}
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {errors.name && <div className="invalid-msg">{errors.name}</div>}
            </div>
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
                  'invalid-form-field': errors.password
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
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                className={classnames('form-input-field', {
                  'invalid-form-field': errors.password2
                })}
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {errors.password2 && (
                <div className="invalid-msg">{errors.password2}</div>
              )}
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}
