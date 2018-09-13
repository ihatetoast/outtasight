import { GET_ERRORS } from './types';
import axios from 'axios';
// reg user
// = userData => dispatch => in lieu of nested fcn
export const registerUser = newUser => dispatch => {
  axios
    .post('/api/users/register', newUser)
    .then(result => console.log(result.data))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
