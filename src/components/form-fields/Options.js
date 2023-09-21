/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Stack,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Radio,
  RadioGroup,
  FormLabel,
  FormControlLabel
} from '@material-ui/core';

import { PostSave, FieldSave } from './Utils';

const OptionsField = ({ field, onFieldSaved, onCancel, index, onEdit, onRemove }) => {
  // eslint-disable-next-line no-unused-vars
  const [json, setJson] = useState(field);

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
  return <PreSave json={json} setJson={setJson} index={index} onCancel={onCancel} />;
};

// eslint-disable-next-line react/prop-types
export const PreSave = ({ index, json, setJson, onCancel }) => {
  const [options, setOptions] = useState([]);
  // Object.entries(JSON.parse(json.data));

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const addOption = (option) => {
    setOptions(options.concat(option));
  };

  const updateOption = async (index, option) => {
    options[index] = option;
    setOptions(options);

    const optionsObject = options.reduce((acc, option, index) => {
      const key = `option-${index + 1}`;
      const object = { ...acc };
      object[key] = option;
      return object;
    }, {});
    const newJson = { ...json, data: optionsObject };
    setJson(newJson);
  };

  useEffect(() => {
    setOptions(Object.entries(json.data).map((option) => option[1]));
  }, [json.data]);

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
          label="Dropdown name"
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
        sx={{ mb: 1 }}
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e.target.value, 'hint')}
      />
      {options.map((option, index) => (
        <TextField
          key={index}
          sx={{ my: 1 }}
          label={`Option ${index + 1}`}
          value={option}
          onChange={(e) => updateOption(index, e.target.value)}
        />
      ))}

      <Button
        color="primary"
        sx={{ px: 0, py: 1, my: 2 }}
        onClick={() => addOption(`option-${options.length + 1}`)}
      >
        Add Option
      </Button>
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

const PreviewDropDownField = ({ field, onChange, index, displayValue = false }) => {
  const { label, is_required, data } = field;

  const options = Object.entries(data).map((option, index) => (
    <MenuItem key={index} value={option[0]}>
      {option[1]}
    </MenuItem>
  ));

  // console.log('DD', field.value);
  let inputProps = {};
  if (displayValue) {
    inputProps = { value: '' };
  }
  if (field.value) {
    inputProps = { value: field.value };
  }

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel>
          {is_required && '*'} {`${label}`}
        </InputLabel>
        <Select
          label={` -${label}`}
          // value={field.value ? field.value : false}
          {...inputProps}
          onChange={(e) => {
            if (onChange) {
              onChange(index, { data: { value: e.target.value } });
            }
          }}
        >
          {options}
        </Select>
      </FormControl>
    </>
  );
};

const PreviewMultiSelectField = ({ field, onChange, index }) => {
  const { label, is_required, data } = field;
  // const [selected, setSelected] = React.useState([]);
  // const classes = useStyles();
  // const theme = useTheme();

  const options = Object.entries(data).map((option, index) => (
    <MenuItem key={index} value={option[0]}>
      {option[1]}
    </MenuItem>
  ));

  // const handleChange = (event) => {
  //   setSelected(event.target.value);
  // };
  // console.log(field.value);
  let inputProps = { value: [] };

  if (field.value) {
    inputProps = { ...inputProps, value: field.value };
  }
  return (
    <FormControl sx={{ my: 1 }} fullWidth>
      <InputLabel>
        {is_required && '*'} {`${label}`}
      </InputLabel>
      <Select
        label={` -${label}`}
        id="demo-multiple-chip"
        multiple
        {...inputProps}
        onChange={(e) => {
          // console.log(e.target.value);
          if (onChange) {
            onChange(index, { data: { value: e.target.value } });
          }
        }}
        // input={<Input id="select-multiple-chip" />}
        // renderValue={(selected) => (
        //   <div className={classes.chips}>
        //     {selected.map((value) => {
        //       console.log(value);
        //       return <Chip key={value[1]} label={value[1]} className={classes.chip} />;
        //     })}
        //   </div>
        // )}
        // MenuProps={MenuProps}
      >
        {options}
      </Select>
    </FormControl>
  );
};

const PreviewRadioField = ({ field, onChange, index, displayValue = false }) => {
  const { label, is_required, data } = field;
  // const [value, setValue] = useState('');
  const options = Object.entries(data).map((option, index) => (
    <FormControlLabel key={index} control={<Radio />} label={option[1]} value={option[0]} />
  ));

  const handleRadioChange = (event) => {
    if (onChange) {
      onChange(index, { data: { value: event.target.value } });
    }
    // setValue(event.target.value);
  };

  let inputProps = {};
  if (displayValue) {
    inputProps = { value: '' };
  }
  if (field.value) {
    inputProps = { value: field.value };
  }

  return (
    <FormControl component="fieldset" sx={{ mt: 2, display: 'block' }}>
      <FormLabel component="legend">
        {is_required && '*'} {`${label}`}
      </FormLabel>
      <RadioGroup {...inputProps} onChange={handleRadioChange}>
        {options}
      </RadioGroup>
    </FormControl>
  );
};
export { PreviewDropDownField, PreviewMultiSelectField, PreviewRadioField };

export default OptionsField;
