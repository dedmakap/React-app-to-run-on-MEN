import axios from 'axios';

const agent = axios.create({
  baseURL: 'http://localhost:3500',
})

export default agent;