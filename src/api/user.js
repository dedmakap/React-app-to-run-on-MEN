import axios from './agent';

export const signIn = (guest) => {
  return axios.post('/signin/api', {guest})
    .then((response) => response.data)
}

export const register = (user) => {
  return axios.post('/register/api', {user})
    .then((response) => response.data)
}

export const search = (query) => {
  return axios.post('/users/search/api', {query})
    .then((response) => response.data)
}

