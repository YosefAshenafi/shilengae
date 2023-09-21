import rf from './requestFactory';

const getAllCountries = async (url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/locations/country/all/?limit=${limit}&offset=${offset}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getOperableCountries = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/operable/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const chooseOperatingCountry = async (country_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/operating/choose/`;
  return rf
    .postRequest(url, { country_id })
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const chosenCountry = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/operating/chosen/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createCountry = async (name, currency, symbol, timezone, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/create/`;
  return rf.postRequest(url, { name, currency, symbol, timezone, status });
};

const editCountry = async (country_id, name, currency, symbol, timezone, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/edit/`;
  return rf.postRequest(url, { country_id, name, currency, symbol, timezone, status });
};

const getCountryDetail = async (country_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/country/detail/${country_id}`;
  return rf.getRequest(url);
};

export {
  getAllCountries,
  createCountry,
  editCountry,
  getCountryDetail,
  getOperableCountries,
  chooseOperatingCountry,
  chosenCountry
};
