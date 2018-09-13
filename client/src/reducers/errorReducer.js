import { GET_ERRORS } from '../actions/types';
const initialState = {};

// ...state b/c we copy, not mutate
// action.payload here comes from  userDatacatch(err =>
// dispatch({
//   type: GET_ERRORS,
//   payload: err.response.data
// })

//
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
