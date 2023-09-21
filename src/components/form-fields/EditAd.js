/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
  Typography
} from '@material-ui/core';

import { PreviewFieldChooser } from './FieldChooser';
// import { getSelectableCategories } from '../../request/category';
import { getAllFieldsByCategory } from '../../request/formFields';
import { updateAd } from '../../request/ad';

const EditAdModal = ({ ad, isEditOpen, toggleDialog, refetchAds }) => {
  const [fieldList, setFieldList] = useState([]);
  const [error, setError] = useState('');
  const [adData, setAdData] = useState({
    responses: ad.responses
  });

  //   const ad.category.id = 2;

  const onFieldChange = (index, data) => {
    const { responses } = adData;
    const newResponses = { ...responses };
    // console.log('onFieldChange', data);
    // change adData if responses includes image file
    // responses[index] = { ...responses[index], ...data };
    newResponses[index] = { ...responses[index], ...data };
    // console.log(newResponses[index]);
    if (data.data) {
      fieldList[index] = { ...fieldList[index], value: data.data.value };
    }
    // console.log('responses, ', newResponses);
    // console.log({
    //   ...adData,
    //   responses: Object.keys(newResponses).map((key) => newResponses[key])
    // });
    setAdData({
      ...adData,
      responses: Object.keys(newResponses).map((key) => newResponses[key])
    });

    setFieldList(fieldList);
  };
  const adDataImageFixed = adData.responses.map((response) => {
    if (response.form_field.type === 'image') {
      return { ...response, images: response.images.map((image) => image.id) };
    }
    return response;
  });
  const updateAd_ = () => {
    updateAd(ad.id, { ...adData, responses: adDataImageFixed })
      .then(() => {
        refetchAds();
        toggleDialog(ad);
      })
      .catch((err) => {
        // console.log(err.response.data[0]);
        setError(`* ${err.response.data[0]}`);
      });
  };

  useEffect(() => {
    if (ad.category.id !== null) {
      getAllFieldsByCategory(ad.category.id).then((res) => {
        setFieldList(res);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ad.category.id]);

  return (
    <Dialog
      open={isEditOpen}
      onClose={toggleDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Edit Ad</DialogTitle>

      <DialogContent style={{ width: '600px' }}>
        {adData.responses.map((element, index) => (
          <PreviewFieldChooser
            key={index}
            index={index}
            field={{
              ...element.form_field,
              value: element.data.value,
              city: element.data.city,
              images: element.images
            }}
            onChange={onFieldChange}
          />
        ))}
        <Typography color="red">{error}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleDialog(ad.category.id)}>Cancel</Button>
        <Button
          onClick={updateAd_}
          sx={{ my: 0, px: 5, py: 1 }}
          color="primary"
          variant="outlined"
          autoFocus
        >
          Edit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { EditAdModal };
