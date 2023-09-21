/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { TextField, Stack, Typography, Checkbox } from '@material-ui/core';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker
// } from '@material-ui/pickers';

import { PostSave, FieldSave } from './Utils';

// import trash2Fill from '@iconify/icons-eva/trash-2-fill';

const DateField = ({ field, onFieldSaved, onCancel, index, onEdit }) => {
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
    return <PostSave json={json} onCancel={onCancel} index={index} field={field} onEdit={onEdit} />;
  }
  return <PreSave json={json} setJson={setJson} index={index} onCancel={onCancel} />;
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, index, onCancel }) => {
  const [dateData, setDateData] = useState({
    hideDay: false,
    hideMonth: false
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setDateJson = (hideDay, hideMonth) => {
    const newDateJson = { hideDay, hideMonth };
    handleChange(JSON.stringify(newDateJson), 'data');
    setDateData(newDateJson);
  };

  useEffect(() => {
    handleChange(JSON.stringify(dateData), 'data');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
        <Stack direction="row" alignItems="center">
          <Checkbox
            checked={dateData.hideDay}
            onChange={() => {
              setDateJson(!dateData.hideDay, dateData.hideMonth);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography>Hide Day</Typography>
        </Stack>
        <Stack direction="row" alignItems="center" sx={{ ml: 10 }}>
          <Checkbox
            checked={dateData.hideMonth}
            onChange={() => {
              setDateJson(dateData.hideDay, !dateData.hideMonth);
            }}
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <Typography>Hide Month</Typography>
        </Stack>
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

const PreviewDateField = ({ field, onChange, index }) => {
  const { label, is_required } = field;
  // const jsonData = JSON.parse(data);
  let finalLabel = label;
  if (is_required) {
    finalLabel = `* ${label}`;
  }
  // console.log(field);

  return (
    <>
      <TextField
        id="date"
        fullWidth
        label={finalLabel}
        type="date"
        sx={{ mt: 1 }}
        value={field.value}
        // defaultValue="2017-05-24"
        onChange={(e) => {
          onChange(index, { data: { value: e.target.value } });
        }}
        // className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
      />
    </>
  );
};

export { PreviewDateField };

export default DateField;
