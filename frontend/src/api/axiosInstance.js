import axios from 'axios';

export const Axios = axios.create({
  baseURL: 'http://localhost:4000/',
});

// export const Axios = axios.create({
//    baseURL: 'https://aoneturfserver.onrender.com/',
// });