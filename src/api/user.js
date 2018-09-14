import axios from './agent';

export const signIn = (guest) => {
  return axios.post('/signin/api', {guest})
    .then((response) => response.data)
}

export const register = (user) => {
  return axios.post('/register/api', {user})
    .then((response) => response.data)
}

