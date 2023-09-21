import rf from './requestFactory';

const getStats = async (url = null) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/api/stats/`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const updateAppVersion = async (data) => {
  const url = `${process.env.REACT_APP_BACKEND}/api/app-version/update/`;
  return rf
    .postRequest(url, data)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getAppVersion = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/api/app-version/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getStats, updateAppVersion, getAppVersion };
