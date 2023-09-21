import rf from './requestFactory';

const getAllRegions = async (url = null, limit = 50, offset = 0, status = '') => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/locations/region/all/?limit=${limit}&offset=${offset}`;
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

const getRegionDetail = async (region_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/detail/${region_id}`;
  return rf.getRequest(url);
};

const createRegion = async (name, symbol, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/create/`;
  return rf.postRequest(url, { name, symbol, status });
};

const editRegion = async (region_id, name, symbol, country_id, status) => {
  const url = `${process.env.REACT_APP_BACKEND}/locations/region/edit/`;
  return rf.postRequest(url, { region_id, name, symbol, country_id, status });
};

export { getAllRegions, createRegion, getRegionDetail, editRegion };
