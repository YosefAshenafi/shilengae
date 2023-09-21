/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Typography, Slider } from '@material-ui/core';

import { parseInt } from 'lodash';
import { PostSave, FieldSave } from './Utils';

const RangeField = ({ field, onFieldSaved, onCancel, onEdit, onRemove, index }) => {
  const [json, setJson] = useState({ ...field, data: `{"min": "0", "max": "100"}` });

  useEffect(() => {
    if (json.saved) {
      onFieldSaved(json, index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  if (field.saved) {
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
  return <PreSave json={json} setJson={setJson} index={index} field={field} onCancel={onCancel} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ json, setJson, index, onCancel }) => {
  // console.log('json', json);
  // const parsed = JSON.parse(json.data)
  const [rangeData, setRangeData] = useState({ ...json.parsed_data });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setRange = (minVal, maxVal, unit) => {
    const newRange = { min: minVal, max: maxVal, unit };
    handleChange(JSON.stringify(newRange), 'data');
    setRangeData(newRange);
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
          label="Range Field name"
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
        sx={{ my: 2 }}
        label="Minimum Value"
        value={rangeData.min}
        onChange={(e) => setRange(e.target.value, rangeData.max, rangeData.unit)}
      />
      <TextField
        sx={{ my: 2 }}
        label="Maximum Value"
        value={rangeData.max}
        onChange={(e) => setRange(rangeData.min, e.target.value, rangeData.unit)}
      />
      <TextField
        sx={{ my: 2 }}
        label="Unit"
        value={rangeData.unit}
        onChange={(e) => setRange(rangeData.min, rangeData.max, e.target.value)}
      />
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

const PreviewRangeField = ({ field, onChange, index, displayValue }) => {
  const { label, is_required, data } = field;
  const jsonData = JSON.parse(data);
  const marks = [
    {
      value: jsonData.min,
      label: `${jsonData.min} ${jsonData.unit}`
    },
    {
      value: jsonData.max,
      label: `${jsonData.max} ${jsonData.unit}`
    }
  ];
  let inputProps = {};
  if (displayValue) {
    inputProps = { value: '' };
  }
  if (field.value) {
    inputProps = { value: field.value };
  } else {
    inputProps = { value: '' };
  }
  return (
    <>
      <Typography gutterBottom>
        {is_required && '*'} {label}
      </Typography>
      <Slider
        {...inputProps}
        aria-labelledby="discrete-slider-custom"
        valueLabelDisplay="auto"
        marks={marks}
        min={parseInt(jsonData.min)}
        max={parseInt(jsonData.max)}
        sx={{ ml: 3, mt: 2, width: '90%', alignSelf: 'center' }}
        // onChange={(e) => setValue(e.target.value)}
        // InputLabelProps={{ shrink: displayValue }}
        onChange={(e) => {
          if (onChange) {
            onChange(index, { data: { value: e.target.value } });
          }
        }}
      />
    </>
  );
};

export { PreviewRangeField };

export default RangeField;
