/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack } from '@material-ui/core';

import { FieldSave, PostSave } from './Utils';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const FormTextField = ({ field, onFieldSaved, onCancel, onEdit, onRemove, index }) => {
  // eslint-disable-next-line no-unused-vars
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
  return <PreSave json={json} onCancel={onCancel} setJson={setJson} index={index} />;
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, index, onCancel }) => {
  const [data, setData] = useState({
    default: '',
    minimumLength: 0,
    maximumLength: 100
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setTextData = (defaultValue, minimumLength, maximumLength) => {
    const newData = {
      default: defaultValue,
      minimumLength,
      maximumLength
    };
    handleChange(JSON.stringify(newData), 'data');
    setData(data);
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
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e.target.value, 'hint')}
      />
      <TextField
        sx={{ mb: 2 }}
        value={json.data.default}
        label="Default Value"
        onChange={(e) =>
          setTextData(e.target.value, json.data.minimumLength, json.data.maximumLength)
        }
      />
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <TextField
          label="Minimum Length"
          value={json.data.minimumLength}
          sx={{ mr: 5 }}
          onChange={(e) => setTextData(json.data.default, e.target.value, json.data.maximumLength)}
        />
        <TextField
          label="Maximum Length"
          value={json.data.maximumLength}
          sx={{ mr: 5 }}
          onChange={(e) => setTextData(json.data.default, json.data.minimumLength, e.target.value)}
        />
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

const FilterTextField = ({ field, filters, setFilters }) => (
  <TextField
    fullWidth
    sx={{ my: 1 }}
    placeholder={field.label}
    onChange={(e) => {
      setFilters({ ...filters, [field.id]: { search_term: e.target.value } });
    }}
  />
);

const PreviewTextField = ({ field, onChange, index, displayValue }) => {
  const { hint, label, is_required } = field;
  let finalLabel = label;
  if (is_required) {
    finalLabel = `* ${label}`;
  }
  return (
    <>
      <TextField
        fullWidth
        sx={{ my: 1 }}
        value={field.value}
        label={finalLabel}
        placeholder={hint}
        InputLabelProps={{ shrink: displayValue }}
        onChange={(e) => {
          if (onChange) {
            onChange(index, { data: { value: e.target.value } });
          }
        }}
      />
    </>
  );
};

const PreviewMultiLineTextField = ({ field, onChange, index, displayValue }) => {
  const { hint, label, is_required } = field;
  let finalLabel = label;
  if (is_required) {
    finalLabel = `* ${label}`;
  }
  return (
    <>
      {/* <Typography>
        {is_required && '*'} {label}
      </Typography> */}
      <TextField
        multiline
        fullWidth
        sx={{ my: 1 }}
        rows={3}
        label={finalLabel}
        placeholder={hint}
        value={field.value}
        InputLabelProps={{ shrink: displayValue }}
        onChange={(e) => {
          onChange(index, { data: { value: e.target.value } });
        }}
      />
    </>
  );
};

export { PreviewTextField, PreviewMultiLineTextField, FilterTextField };

export default FormTextField;
