/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Button, Typography, Checkbox } from '@material-ui/core';

import { PostSave, FieldSave } from './Utils';
import { uploadBulkImage } from '../../request/ad';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const ImageField = ({ field, onFieldSaved, onCancel, index, onEdit, onRemove }) => {
  // eslint-disable-next-line no-unused-vars
  const [saved, setSaved] = useState(false);
  const [json, setJson] = useState(field);

  useEffect(() => {
    if (json.saved) {
      onFieldSaved(json, index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  if (json.saved) {
    return (
      <PostSave
        json={json}
        onCancel={onCancel}
        index={index}
        field={field}
        onEdit={onEdit}
        onRemove={onRemove}
      />
    );
  }
  return <PreSave json={json} setJson={setJson} onCancel={onCancel} index={index} />;
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, index, onCancel }) => {
  const [imageData, setImageData] = useState({
    maxUploadCount: 1,
    maxUploadSizeInMb: 1,
    allowMultipleUpload: false,
    allowedImageExtensions: ''
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setImageJson = (
    maxUploadCount,
    maxUploadSizeInMb,
    allowMultipleUpload,
    allowedImageExtensions
  ) => {
    const newImageJson = {
      maxUploadCount,
      maxUploadSizeInMb,
      allowMultipleUpload,
      allowedImageExtensions
    };
    handleChange(JSON.stringify(newImageJson), 'data');
    setImageData(newImageJson);
  };

  return (
    <Stack
      justifyContent="space-between"
      sx={{ px: 2, py: 2, my: 2, mr: 2 }}
      style={{ border: '1px solid lightgrey', borderRadius: '10px' }}
    >
      <Stack
        fullwidth
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 2 }}
      >
        <TextField
          fullwidth
          sx={{ mr: 2 }}
          label={`${json.type} field name`}
          value={json.name}
          onChange={(e) => handleChange(e.target.value, 'name')}
        />
        <TextField
          label="Label"
          value={json.label}
          onChange={(e) => handleChange(e.target.value, 'label')}
        />
      </Stack>
      <TextField
        sx={{ mb: 2 }}
        value={imageData.maxUploadCount}
        label={`Max Number of ${json.type} Uploads`}
        onChange={(e) =>
          setImageJson(
            e.target.value,
            imageData.maxUploadSizeInMb,
            imageData.allowMultipleUpload,
            imageData.allowedImageExtensions
          )
        }
      />
      <TextField
        sx={{ mb: 2 }}
        value={imageData.maxUploadSizeInMb}
        label="Maximum size of upload (in MBs)"
        onChange={(e) =>
          setImageJson(
            imageData.maxUploadCount,
            e.target.value,
            imageData.allowMultipleUpload,
            imageData.allowedImageExtensions
          )
        }
      />
      <TextField
        sx={{ mb: 2 }}
        value={imageData.maxUploadSizeInMb}
        label="Allowed Image Extensions"
        onChange={(e) =>
          setImageJson(
            imageData.maxUploadCount,
            imageData.maxUploadSizeInMb,
            imageData.allowMultipleUpload,
            e.target.value
          )
        }
      />
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Checkbox
          checked={imageData.allowMultipleUpload}
          onChange={() => {
            setImageJson(
              imageData.maxUploadCount,
              imageData.maxUploadSizeInMb,
              !imageData.allowMultipleUpload,
              imageData.allowedImageExtensions
            );
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>Allow Multiple {json.type} Uploads</Typography>
      </Stack>
      <FieldSave
        json={json}
        onCancel={onCancel}
        setJson={setJson}
        index={index}
        handleChange={handleChange}
      />
    </Stack>
  );
};

const PreviewImageField = ({ field, onChange, index }) => {
  const { label } = field;
  const onFileChange = (e) => {
    const { files } = e.target;

    const formData = new FormData();
    // eslint-disable-next-line no-restricted-syntax
    for (const key of Object.keys(files)) {
      formData.append('images', files[key]);
    }
    // // upload files

    uploadBulkImage(formData).then((res) => {
      const ids = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const image of res.data) {
        ids.push(image.id);
      }
      onChange(index, { images: ids });
    });
  };
  return (
    <>
      {!field.images && (
        <Button sx={{ my: 1 }} variant="contained" component="label" containerElement="label">
          {label}
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            hidden
            multiple
            onChange={(e) => {
              onFileChange(e);
            }}
          />
        </Button>
      )}
      {field.images && (
        <Stack direction="row" alignItems="center" sx={{ my: 1 }}>
          {field.images.map((image, i) => (
            <img
              key={i}
              src={image.image}
              alt="ad"
              height="50"
              style={{
                objectFit: 'contain',
                width: '100%',
                height: '100%'
              }}
            />
          ))}
        </Stack>
      )}
    </>
  );
};

export { PreviewImageField };

export default ImageField;
