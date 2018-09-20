import axios from './agent';

const getHeaders = () => {
  const {token} = JSON.parse(localStorage.user);
  if (token) {
    return {
      Authorization: `Bearer ${token}` // "Bearer " + token
    };
  }
  return {};
};

export const signIn = (guest) => {
  return axios.post('/signin/api', {guest})
    .then((response) => response.data);
};

export const register = (user) => {
  return axios.post('/register/api', {user})
    .then((response) => response.data);
};

export const getUsersList = (query) => {
  const headers = getHeaders();
  return axios.get('/users/api/',{ params: query, headers })
    .then((response) => response.data);
};

export const getUserById = (id) => {
  const headers = getHeaders();
  return axios.get(`/users/api/${id}`,{ headers })
    .then((response) => response.data);
};


