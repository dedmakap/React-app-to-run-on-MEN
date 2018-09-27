import axios from './agent';

const getHeaders = (contentType) => {
  const {token} = JSON.parse(localStorage.user);
  if (token && contentType) {
    console.log('both tokens', token);
    return {
      Authorization: `Bearer ${token}`, // "Bearer " + token
      'content-type': 'multipart/form-data',
      };
  }
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

export const putUserField = (id, colId, updateValue) => {
  const headers = getHeaders();
  return axios.put(`/users/api/${id}`,{colId, updateValue}, {headers},)
    .then((response) => response.data);
};

export const postUserAvatar = (id, formData) => {
  const headers = getHeaders(true);
  console.log('wow',headers, id);
  return axios.post(`/users/userpage/api/${id}`, formData, {headers})
    .then((response) => response.data);
};

