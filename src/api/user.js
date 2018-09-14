import axios from './agent';

export const signIn = (data) => {
  return axios.post('/user/signin', {data})
}

export const register = (user) => {
  return axios.post('/register/api', {user})
    .then((response) => response.data)
}

