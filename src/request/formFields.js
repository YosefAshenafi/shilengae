import rf from './requestFactory';

const getAllFieldsByForm = async (formId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/fields/${formId}/`;
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const getAllFieldsByCategory = async (categoryId, is_filterable = null) => {
  let url = `${process.env.REACT_APP_BACKEND}/forms/category/fields/${categoryId}/`;
  if (is_filterable) {
    url += '?is_filterable=True';
  }
  return rf
    .getRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

const deleteField = async (fieldId) => {
  const url = `${process.env.REACT_APP_BACKEND}/forms/fields/delete/${fieldId}/`;
  return rf
    .postRequest(url)
    .then((res) => res.data)
    .catch((err) => {
      console.log(err);
    });
};

export { getAllFieldsByForm, getAllFieldsByCategory, deleteField };
