/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';

import { PreviewFieldChooser } from './FieldChooser';
import { getAllFieldsByForm } from '../../request/formFields';

const FormPreview = ({ formId, isPreviewOpen, toggleDialog }) => {
  const [fieldList, setFieldList] = useState([]);

  useEffect(() => {
    if (formId !== null) {
      getAllFieldsByForm(formId).then((res) => {
        setFieldList(res);
      });
    }
  }, [formId]);

  return (
    <PreviewFormModal
      formId={formId}
      fieldList={fieldList}
      isPreviewOpen={isPreviewOpen}
      toggleDialog={toggleDialog}
    />
  );
};

const PreviewFormModal = ({ formId, fieldList, isPreviewOpen, toggleDialog }) => (
  <Dialog
    open={isPreviewOpen}
    onClose={toggleDialog}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">Form Preview</DialogTitle>
    <DialogContent style={{ width: '600px' }}>
      {fieldList.map((element, index) => (
        <PreviewFieldChooser key={index} field={element} />
      ))}
    </DialogContent>
    <DialogActions>
      <Button
        onClick={() => toggleDialog(formId)}
        sx={{ my: 0, px: 5, py: 1 }}
        color="primary"
        autoFocus
      >
        Done
      </Button>
    </DialogActions>
  </Dialog>
);

export { FormPreview };

export default PreviewFormModal;
