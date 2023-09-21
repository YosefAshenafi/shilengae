import rf from './requestFactory';

const getAllAds = async (url = null, limit = 50, offset = 0, search) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/ads/all/?limit=${limit}&offset=${offset}`;
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

const getReportedAds = async (url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/ads/list/reported-ads/?limit=${limit}&offset=${offset}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const filterAds = async (filters, url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/ads/filter/?limit=${limit}&offset=${offset}`;
  }
  return rf
    .postRequest(url, filters)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getAdDetail = async (adId) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/detail/${adId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const updateAd = async (adId, ad) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/update/${adId}/`;
  return rf
    .postRequest(url, ad)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createAd = async (ad) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/create/`;
  return rf.postRequest(url, ad, {}).then((res) => res.data);
};

const deleteAd = async (adId) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/delete/${adId}/`;
  return rf.postRequest(url, { 'Content-Type': 'multipart/form-data' }).then((res) => res.data);
};

const batchDeleteAd = async (adIds) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/delete-batch/`;
  return rf.postRequest(url, adIds).then((res) => res.data);
};

const uploadBulkImage = async (images) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/image/multiple-upload/`;
  return rf
    .postRequest(url, images, { 'Content-Type': 'multipart/form-data' })
    .then((res) => res.data);
};

const updateAdPreferences = async (preference) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/update-settings/`;
  return rf.postRequest(url, preference).then((res) => res.data);
};

const getAdPreferences = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/get-settings/`;
  return rf.getRequest(url).then((res) => res.data);
};

const getQuestionList = async (adId) => {
  const url = `${process.env.REACT_APP_BACKEND}/ads/questions/list/${adId}/`;
  return rf.getRequest(url).then((res) => res.data);
};

export {
  getAllAds,
  getReportedAds,
  filterAds,
  getAdDetail,
  createAd,
  updateAd,
  uploadBulkImage,
  deleteAd,
  batchDeleteAd,
  updateAdPreferences,
  getAdPreferences,
  getQuestionList
};
