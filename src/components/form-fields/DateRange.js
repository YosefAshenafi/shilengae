/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack } from '@material-ui/core';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import DateRangePicker from '@material-ui/lab/DateRangePicker';

import { PostSave, FieldSave } from './Utils';

const RangeField = ({ field, onFieldSaved, onCancel, index, onEdit }) => {
  const [json, setJson] = useState(field);

  useEffect(() => {
    if (json.saved) {
      onFieldSaved(json, index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [json]);

  if (json.saved) {
    return <PostSave json={json} onCancel={onCancel} index={index} field={field} onEdit={onEdit} />;
  }
  return <PreSave json={json} setJson={setJson} onCancel={onCancel} index={index} field={field} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ json, setJson, index, onCancel }) => {
  const [rangeData, setRangeData] = useState({ startDate: null, endDate: null });
  // const [value, setValue] = useState([null, null]);

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setRange = (minVal, maxVal) => {
    const newRange = { startDate: minVal, endDate: maxVal };
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateRangePicker
          startText="Start Date"
          endText="End Date"
          value={[rangeData.startDate, rangeData.endDate]}
          onChange={(newValue) => {
            setRange(newValue[0], newValue[1]);
          }}
          renderInput={(startProps, endProps) => (
            <fragment>
              <TextField sx={{ my: 2, mr: 5 }} {...startProps} />
              <TextField sx={{ my: 2 }} {...endProps} />
            </fragment>
          )}
        />
      </LocalizationProvider>
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

export default RangeField;
