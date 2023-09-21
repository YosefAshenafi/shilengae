import rf from './requestFactory';

const getAllUsers = async (url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/users/all/?limit=${limit}&offset=${offset}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getRegularUsers = async (url = null, limit = 50, offset = 0, search) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/users/list/regular/?limit=${limit}&offset=${offset}`;
  }
  if (search) {
    url = `${url}&search=${search}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

/* eslint-disable camelcase */
const createUser = async (
  username,
  email,
  password1,
  password2,
  first_name,
  last_name,
  status,
  mobile_country_code,
  mobile_number,
  type,
  operable_countries
) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/rest-auth/registration/`;
  return rf.postRequest(url, {
    username,
    email,
    password1,
    password2,
    first_name,
    last_name,
    status,
    mobile_country_code,
    mobile_number,
    type,
    operable_countries
  });
};

const editUser = async (user_id, username, email, first_name, last_name, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/users/update/${user_id}/`;
  return rf.postRequest(url, {
    username,
    email,
    first_name,
    last_name,
    status
  });
};

const getUserDetail = async (userId) => {
  const url = `${process.env.REACT_APP_BACKEND}/users/profile/${userId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const deleteUser = async (userId) => {
  const url = `${process.env.REACT_APP_BACKEND}/users/delete/${userId}/`;
  return rf
    .postRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllUsers, getRegularUsers, createUser, editUser, getUserDetail, deleteUser };
