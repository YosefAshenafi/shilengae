/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

import { PreviewFieldChooser } from './FieldChooser';
import { getAllFieldsByCategory } from '../../request/formFields';

const CategoryPreview = ({ categoryId, isPreviewOpen, toggleDialog }) => {
  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    if (categoryId !== null) {
      getAllFieldsByCategory(categoryId).then((res) => {
        setFieldList(res);
      });
    }
  }, [categoryId]);

  return (
    <PreviewFormModal
      categoryId={categoryId}
      fieldList={fieldList}
      isPreviewOpen={isPreviewOpen}
      toggleDialog={toggleDialog}
    />
  );
};

const AdPreview = ({ ad, isPreviewOpen, toggleDialog }) => {
  const [fieldList, setFieldList] = useState([]);
  // console.log(ad);
  useEffect(() => {
    if (ad.category.id !== null) {
      getAllFieldsByCategory(ad.category.id).then((res) => {
        setFieldList(res);
        // match the ids in the ad with the fields in the category values
        const fields = res.map((field) => {
          const adField = ad.responses.find((adField) => adField.form_field.id === field.id);
          if (adField) {
            return {
              ...field,
              value: adField.data.value,
              city: adField.data.city,
              images: adField.images
            };
          }
          return field;
        });
        setFieldList(fields);
      });
    }
  }, [ad.category, ad.responses]);

  return (
    <>
      {fieldList !== [] && (
        <PreviewFormModal
          categoryId={ad.category.id}
          fieldList={fieldList}
          isPreviewOpen={isPreviewOpen}
          toggleDialog={toggleDialog}
          displayValue
        />
      )}
    </>
  );
};

const PreviewFormModal = ({
  categoryId,
  fieldList,
  isPreviewOpen,
  toggleDialog,
  displayValue = false
}) => (
  <Dialog
    open={isPreviewOpen}
    onClose={toggleDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Category Preview</DialogTitle>
    <DialogContent style={{ width: '600px' }}>
      {fieldList.map((element, index) => (
        <PreviewFieldChooser key={index} field={element} displayValue={displayValue} />
      ))}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => toggleDialog(categoryId)}
        sx={{ my: 0, px: 5, py: 1 }}
        color="primary"
        autoFocus
      >
        Done
      </Button>
    </DialogActions>
  </Dialog>
);

export { CategoryPreview, AdPreview };

export default PreviewFormModal;
