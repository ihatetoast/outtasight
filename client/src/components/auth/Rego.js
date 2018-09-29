import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// import classnames from 'classnames';//for conditional classes
//UI notes:
/* a div needs to show up when there are errors. div is ready but the style is not. class names from bootstrap. keep. but do your own.*/

//REDUX
//call registeruser action
import { connect } from 'react-redux';
//import action
import { registerUser } from '../../actions/authActions';

class Register extends Component {
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
  //when comp gets new props from redux state (from mapstate to props)
  componentWillReceiveProps(nextProps) {
    //test for ... errors!
    if (nextProps.errors) {
      this.setState({ errors: nextProps.error });
    }
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

    this.props.registerUser(newUser, this.props.history);
  }
  render() {
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
                // className={classnames('form-input-field', {
                //   'invalid-form-field': errors.name
                // })}
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {/* {errors.name && <div className="invalid-msg">{errors.name}</div>} */}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                // className={classnames('form-input-field', {
                //   'invalid-form-field': errors.email
                // })}
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {/* {errors.email && (
                <div className="invalid-msg">{errors.email}</div>
              )} */}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                // className={classnames('form-input-field', {
                //   'invalid-form-field': errors.password
                // })}
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {/* {errors.password && (
                <div className="invalid-msg">{errors.password}</div>
              )} */}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                // className={classnames('form-input-field', {
                //   'invalid-form-field': errors.password2
                // })}
                name="password2"
                value={this.state.password2}
                onChange={this.handleChange}
              />
              {/*conditionally render div with error message from backend*/}
              {/* {errors.password2 && (
                <div className="invalid-msg">{errors.password2}</div>
              )} */}
            </div>
            <input type="submit" className="btn" />
          </form>
        </div>
      </div>
    );
  }
}
//actions are properties, so registerUser ...
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};
//get state into component:
// * auth term comes from rootReducer
// * will be able to deal with state by this.props.auth.isAuthorised or whatever
// puts auth state inside a property called auth. and we access it with this.props.auth
const mapStateToProps = state => ({ auth: state.auth, errors: state.errors });

// export default connect(,{objectwherewemapouractions})(thisComponent)
export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
