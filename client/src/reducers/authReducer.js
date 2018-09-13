const initialState = {
  isAuthenticated: false,
  user: {}
};
// ...state b/c we copy, not mutate
// user: action.payload comes from authActions.js and payload: userData
export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
