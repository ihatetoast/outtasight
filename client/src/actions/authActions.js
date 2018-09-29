import { GET_ERRORS } from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
// reg user
// = userData => dispatch => in lieu of nested fcn
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(result => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//LOGIN: get user's token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(result => {
      //save result in local storage
      const { token } = result.data;
      //set the token to locak storage. setItem needs string
      localStorage.setItem('jwtToken', token);
      //set to auth header
      //set auth token fcn in utils
      setAuthToken(token);
      //get the goods from the token
      //user data, usued at and exp of token
      const decoded = jwt_decode(token);
      //set curr user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      //call dispatch
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
