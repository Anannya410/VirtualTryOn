import axios from 'axios';

const API_URL = 'http://localhost:8000/api/userAuthentication/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'registration/', {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios.post(API_URL + 'token/', {
    username,
    password,
  });
};

export default {
  register,
  login,
};
