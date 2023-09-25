import rf from './requestFactory';

const getAllCategories = async (url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/forms/category/all/?limit=${limit}&offset=${offset}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getCategoryByLevel = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/level-with-subcategories-v2/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getAllCategoriesWithSubCategories = async (url = null, limit = 50, offset = 0) => {
  if (!url) {
    url = `${process.env.REACT_APP_BACKEND}/forms/category/with-subcategories/?limit=${limit}&offset=${offset}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getCategoryFilterStats = async (type = 'main', user = null) => {
  let url = `${process.env.REACT_APP_BACKEND}/forms/category/filter-stats/?type=${type}`;
  if (user) {
    url += `&user=${user}`;
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getSelectableCategories = async () => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/selectable/`;
  return rf
    .getRequest(url)
    .then((res) => res.data.results)
    .catch((err) => {
      console.log(err);
    });
};

const getCategoryDetail = async (categoryId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/detail/${categoryId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const createCategory = async (name, status, parent, form_id, country_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/create/`;
  return rf.postRequest(url, { name, status, parent, form_id, country_id }).then((res) => res.data);
};

const updateCategory = async (category_id, name, status, parent, form) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/update/${category_id}/`;
  return rf.postRequest(url, { name, status, parent, form }).then((res) => res.data);
};

const deleteCategory = async (category_id) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/category/delete/${category_id}/`;
  return rf.postRequest(url, {}).then((res) => res.data);
};

export {
  createCategory, deleteCategory, getAllCategories, getAllCategoriesWithSubCategories, getCategoryByLevel, getCategoryDetail, getCategoryFilterStats, getSelectableCategories, updateCategory
};

