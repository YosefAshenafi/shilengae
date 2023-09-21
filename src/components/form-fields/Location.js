/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Checkbox,
  Typography
} from '@material-ui/core';
import { getAllCities, getCitiesByRegion } from '../../request/cities';
import { getAllRegions } from '../../request/region';
import { PostSave, FieldSave } from './Utils';

const Region = ({ field, onFieldSaved, onCancel, index, onEdit }) => {
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
  return <PreSave json={json} onCancel={onCancel} setJson={setJson} index={index} />;
};

// eslint-disable-next-line react/prop-types
// eslint-disable-next-line no-unused-vars
export const PreSave = ({ json, setJson, index, onCancel }) => {
  const [data, setData] = useState({
    includeCity: false
  });

  const handleChange = (value, field) => {
    const newJson = { ...json };
    newJson[field] = value;
    setJson(newJson);
  };

  const setDataJson = (includeCity) => {
    const data = { includeCity };
    handleChange(JSON.stringify(data), 'data');
    setData(data);
  };

  useEffect(() => {
    handleChange(JSON.stringify(data), 'data');
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
      <TextField
        sx={{ mb: 2 }}
        value={json.hint}
        label="Hint / Placeholder"
        onChange={(e) => handleChange(e.target.value, 'hint')}
      />
      <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
        <Checkbox
          checked={data.includeCity}
          onChange={() => {
            setDataJson(!data.includeCity);
          }}
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <Typography>Include City?</Typography>
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
const PreviewCityField = ({ field }) => {
  const { label, is_required } = field;

  const [cities, setCities] = useState([]);

  const citiesComp = cities.map((city, index) => (
    <MenuItem key={index} value={city.id}>
      {city.name}
    </MenuItem>
  ));

  useEffect(() => {
    getAllCities('active').then((cities) => {
      setCities(cities);
    });
  }, []);

  return (
    <>
      <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
        <InputLabel>
          {is_required && '*'} {`${label}`}
        </InputLabel>
        <Select label={` -${label}`}>{citiesComp}</Select>
      </FormControl>
    </>
  );
};

const PreviewRegionField = ({ field, onChange, index, displayValue }) => {
  let initProps = {};
  if (displayValue) {
    initProps = { value: '' };
  }

  const { label, is_required } = field;
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [regionInputProps, setRegionInputProps] = useState(initProps);
  const [cityInputProps, setCityInputProps] = useState(initProps);
  const [region, setRegion] = useState('');

  const { parsed_data } = field;
  // data = JSON.parse(data);

  const handleRegionChange = (value) => {
    if (onChange) {
      onChange(index, { data: { value } });
    }
    setRegion(value);
    getCitiesByRegion(value).then((cities) => {
      setCities(cities);
      if (field.city) {
        setCityInputProps({ value: field.city });
      }
    });
  };

  const handleCityChange = (e) => {
    // console.log(field);
    if (onChange) {
      console.log({ data: { value: region, city: e.target.value } });
      onChange(index, { data: { value: region, city: e.target.value } });
    }
  };

  const regionsComp = regions.map((region, index) => (
    <MenuItem key={index} value={region.id}>
      {region.name}
    </MenuItem>
  ));

  const citiesComp = cities.map((city, index) => (
    <MenuItem key={index} value={city.id}>
      {city.name}
    </MenuItem>
  ));

  useEffect(() => {
    getAllRegions(null, 50, 0, 'active').then((region) => {
      // console.log(region);
      setRegions(region.results);
      // console.log(field.value);
      if (field.value) {
        setRegionInputProps({ value: field.value });
        handleRegionChange(field.value);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, displayValue, field.city]);

  return (
    <>
      <Stack>
        <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
          <InputLabel>
            {is_required && '*'} {`${label}`}
          </InputLabel>
          <Select
            onChange={(e) => handleRegionChange(e.target.value)}
            label={` -${label}`}
            {...regionInputProps}
          >
            {regionsComp}
          </Select>
        </FormControl>
      </Stack>
      {parsed_data.includeCity && (
        <Stack>
          <FormControl fullWidth variant="outlined" sx={{ my: 1 }}>
            <InputLabel>{is_required && '*'} City</InputLabel>
            <Select label="--Field" onChange={handleCityChange} {...cityInputProps}>
              {citiesComp}
            </Select>
          </FormControl>
        </Stack>
      )}
    </>
  );
};

export { PreviewCityField, PreviewRegionField };
export default Region;
