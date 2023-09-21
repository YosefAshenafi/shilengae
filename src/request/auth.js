import axios from 'axios';
import rf from './requestFactory';

// when authenticated requests come use the access token stored in the local storage the make the authenticated request
const login = async (username, password) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/dashboard-login/`;
  console.log(url);
  return axios.post(url, { username, password }).then((res) => {
    localStorage.setItem('access-token', res.data.token);
    return res;
  });
};

const loggedInProfile = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/users/profile/`;
  return rf.getRequest(url).catch((err) => {
    // if the user is not authenticated, redirect to login page
    // and remove access-token from local storage
    if (err.response.status === 401) {
      window.location.href = '/login';
      localStorage.removeItem('access-token');
    }
  });
};

const logout = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/logout/`;
  return rf.postRequest(url);
};

const regularRegister = async (userData) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/regular-registration/`;
  return rf.postRequest(url, userData);
};

const loginWithPhone = async (loginData) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/login-with-phone/`;
  return rf.postRequest(url, loginData);
};

const loginWithFacebook = async (loginData) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/fb-login/`;
  return rf.postRequest(url, loginData);
};

export { login, loggedInProfile, logout, regularRegister, loginWithPhone, loginWithFacebook };
