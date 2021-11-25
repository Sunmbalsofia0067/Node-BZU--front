import axios from 'axios';

export default axios.create({
  baseURL: "http://g-axon.work/jwtauth/api",
  // baseURL: "http://g-axon.work/jwtauth/api",
  headers: {
    'Content-Type': 'application/json',
  }
});
axios.defaults.baseURL = process.env.REACT_APP_BASE_PATH;
