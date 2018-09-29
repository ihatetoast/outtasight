import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    //if there is a token, apply it everywhere
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    //if there's no token, del auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};
export default setAuthToken;
