/* eslint-disable react/prop-types */
import React from 'react';
import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@material-ui/core';

const FilterPriceField = ({ field, filters, setFilters }) => (
  <>
    <TextField
      sx={{ my: 1, width: '40%', marginRight: 2 }}
      placeholder={`Min - ${field.label}`}
      onChange={(e) => {
        setFilters({ ...filters, [field.id]: { ...filters[field.id], gt: e.target.value } });
      }}
    />
    <TextField
      sx={{ my: 1, width: '40%' }}
      placeholder={`Max - ${field.label}`}
      onChange={(e) => {
        setFilters({ ...filters, [field.id]: { ...filters[field.id], lt: e.target.value } });
      }}
    />
  </>
);

const PreviewPriceField = ({ field, onChange, index }) => {
  const { label, is_required } = field;

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel htmlFor="outlined-adornment-amount">
          {is_required && '*'} {label}
        </InputLabel>
        <OutlinedInput
          //   id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          value={field.value}
          onChange={(e) => {
            if (onChange) {
              onChange(index, { data: { value: e.target.value } });
            }
          }}
          label={`--${label}`}
        />
      </FormControl>
    </>
  );
};

export { PreviewPriceField, FilterPriceField };
