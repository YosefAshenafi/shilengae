/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from '@material-ui/core';

import { PreviewFieldChooser } from './FieldChooser';
import { getSelectableCategories } from '../../request/category';
import { getAllFieldsByCategory } from '../../request/formFields';
import { createAd } from '../../request/ad';

const CreateAdModal = ({ isPreviewOpen, toggleDialog, refetchAds }) => {
  const [fieldList, setFieldList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategory] = useState(null);
  const [error, setError] = useState('');
  const [adData, setAdData] = useState({
    type: 'REGULAR',
    adExpiry: '2021-08-29T18:17:27.698163Z',
    responses: [{ form_field: 1, data: { value: 'option-1' } }]
  });

  //   const categoryId = 2;

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const onFieldChange = (index, data) => {
    const { responses } = adData;
    // console.log('onFieldChange', data);
    // change adData if responses includes image file
    responses[index] = { ...responses[index], ...data };
    if (data.data) {
      fieldList[index] = { ...fieldList[index], value: data.data.value };
    }
    // console.log(fieldList);
    setAdData({
      ...adData,
      responses
    });

    setFieldList(fieldList);
  };
  // console.log('onFieldChange', adData);
  const createAd_ = () => {
    createAd({ ...adData, category: categoryId })
      .then(() => {
        refetchAds();
        toggleDialog(categoryId);
      })
      .catch((err) => {
        // console.log(err.response.data[0]);
        setError(`* ${err.response.data[0]}`);
      });
  };

  useEffect(() => {
    getSelectableCategories()
      .then((categories) => {
        setCategories(categories);
      })
      .catch((err) => {
        console.log(err);
      });

    if (categoryId !== null) {
      getAllFieldsByCategory(categoryId).then((res) => {
        setFieldList(res);
        // set responses in adData
        const responses = res.map((field) => ({
          form_field: field.id,
          data: { value: '' }
        }));
        setAdData({
          ...adData,
          category: categoryId,
          responses
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <Dialog
      open={isPreviewOpen}
      onClose={toggleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Create Ad</DialogTitle>

      <DialogContent style={{ width: '600px' }}>
        <FormControl variant="outlined" fullWidth sx={{ mt: 1 }}>
          <InputLabel>Category</InputLabel>
          <Select onChange={handleCategoryChange} label="Category">
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {fieldList.map((element, index) => (
          <PreviewFieldChooser key={index} index={index} field={element} onChange={onFieldChange} />
        ))}
        <Typography color="red">{error}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleDialog(categoryId)}>Cancel</Button>
        <Button
          onClick={createAd_}
          sx={{ my: 0, px: 5, py: 1 }}
          color="primary"
          variant="outlined"
          autoFocus
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { CreateAdModal };
