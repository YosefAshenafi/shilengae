import axios from 'axios';

const getRequest = (url, config = {}) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    config = { ...config, headers: { ...config.headers, Authorization: `JWT ${accessToken}` } };
  }
  return axios.get(url, config);
};

const postRequest = (url, body, config = {}) => {
  const accessToken = localStorage.getItem('access-token');
  if (accessToken) {
    config = { ...config, headers: { ...config.headers, Authorization: `JWT ${accessToken}` } };
  }
  return axios.post(url, body, config);
};

export default { getRequest, postRequest };
