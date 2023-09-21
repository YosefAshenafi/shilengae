import rf from './requestFactory';

const getAllCities = async (url = null, limit = 50, offset = 0, status = '') => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/locations/city/all/?limit=${limit}&offset=${offset}`;
  }
  if (status === 'active') {
    url = `${url}?status=active`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getCitiesByRegion = async (regionId) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/by_region/${regionId}`;
  return rf.getRequest(url).then((res) => res.data.results);
};

const createCity = async (name, symbol, region_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/create/`;
  return rf.postRequest(url, { name, symbol, region_id, status });
};

const getCityDetail = async (city_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/detail/${city_id}`;
  return rf.getRequest(url);
};

const editCity = async (city_id, name, symbol, region_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/edit/`;
  return rf.postRequest(url, { city_id, name, symbol, region_id, status });
};

const deleteCity = async (city_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/city/delete/${city_id}`;
  return rf.postRequest(url);
};

export { getAllCities, getCitiesByRegion, createCity, getCityDetail, editCity, deleteCity };
