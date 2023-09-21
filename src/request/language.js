import rf from './requestFactory';

const getLatestTranslationPack = () => {
  const url = `${process.env.REACT_APP_BACKEND}/language/pack/latest/`;
  return rf.getRequest(url);
};

const uploadTranslationPack = (pack) => {
  const url = `${process.env.REACT_APP_BACKEND}/languages/translation_pack/upload-csv/`;
  return rf.postRequest(url, pack);
};

const deleteTranslationPack = (id) => {
  const url = `${process.env.REACT_APP_BACKEND}/languages/translation_pack/delete/${id}/`;
  return rf.postRequest(url, {});
};

const getAllTranslationPacks = (url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/languages/translation_pack/all/?limit=${limit}&offset=${offset}`;
  }
  return rf.getRequest(url).then((res) => res.data);
};

export {
  getLatestTranslationPack,
  uploadTranslationPack,
  getAllTranslationPacks,
  deleteTranslationPack
};
