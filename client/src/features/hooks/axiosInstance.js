import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASEURL



// Existing api instance
export default  axios.create({
  baseURL: BASE_URL,
});

// New axios instance with headers
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosCustom = axios.create({
  baseURL: BASE_URL,
 
});
 

// Interceptors
axiosPrivate.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

axiosPrivate.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if ((error.response && error.response.status === 403) || error.response.status === 401) {
        const { data } = error.response;
        if (data && data.error === 'token_expired') {
          localStorage.removeItem('token');
          
        }
      }
      return Promise.reject(error);
  }
);





