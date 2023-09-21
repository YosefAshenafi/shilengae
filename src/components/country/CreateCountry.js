import React, { useEffect, useState } from 'react';

import {
  Stack,
  Button,
  IconButton,
  TextField,
  Typography,
  Drawer,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

import { createCountry } from '../../request/country';

const CreateCountry = ({ isOpenFilter, toggleDrawer, fetchCountries }) => {
  const [name, setName] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [currency, setCurrency] = useState('');
  const [symbol, setSymbol] = useState('');
  const [timezone, setTimezone] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');
  const [countriesList, setCountriesList] = useState([]);
  const [chosenCountry, setChosenCountry] = useState(-1);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleCountryChange = (e) => {
    const country = countriesList[e.target.value];

    setChosenCountry(e.target.value);
    setName(country.name);
    setSymbol(country.code);
    setCurrencyCode(country.currencies[0].code);
    setCurrency(country.currencies[0].name);
    setTimezone(country.timezones[0]);
  };

  useEffect(() => {
    // eslint-disable-next-line global-require
    const countriesData = require('./countries.json');

    setCountriesList(countriesData);
  }, []);

  const createDrawer = (
    <Drawer
      anchor="right"
      open={isOpenFilter}
      onClose={() => {}}
      PaperProps={{
        sx: { width: 400, border: 'none', overflow: 'hidden', padding: '20px 20px' }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Add Country
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <FormControl variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Country</InputLabel>
        <Select value={chosenCountry} onChange={handleCountryChange} label="Country">
          {countriesList.map((res, index) => (
            <MenuItem value={index} key={index}>
              {res.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullwidth
        disabled
        label="Country Symbol"
        sx={{ mb: 2 }}
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
        value={symbol}
      />
      <TextField
        fullwidth
        disabled
        label="Currency Code"
        style={{ marginBottom: '15px' }}
        onChange={(e) => {
          setCurrencyCode(e.target.value);
        }}
        value={currencyCode}
      />
      <TextField
        fullwidth
        disabled
        label="Currency"
        style={{ marginBottom: '15px' }}
        onChange={(e) => {
          setCurrency(e.target.value);
        }}
        value={currency}
      />
      <TextField
        fullwidth
        label="Timezone, Eg: EAT, GMT"
        disabled
        style={{ marginBottom: '30px' }}
        onChange={(e) => {
          setTimezone(e.target.value);
        }}
        value={timezone}
      />
      <FormControl variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} label="Status">
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">Inactive</MenuItem>
        </Select>
      </FormControl>
      <p style={{ color: 'red' }}>{error}</p>
      <Button
        variant="contained"
        component={RouterLink}
        to=""
        disabled={isCreating}
        style={{ marginTop: '20px', padding: '10px 0' }}
        onClick={() => {
          setIsCreating(true);
          createCountry(name, currencyCode, symbol, timezone, status)
            .then(() => {
              fetchCountries();
              setIsCreating(false);
              toggleDrawer();
            })
            .catch((e) => {
              Object.entries(e.response.data).forEach((e) => {
                if (e[1][0].includes('This field may not be blank')) {
                  setError(`* ${e[1]} may not be blank`);
                } else {
                  setError(`* ${e[1]}`);
                }
              });
              setIsCreating(false);
            });
        }}
      >
        {!isCreating ? 'Add' : 'Creating Country...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default CreateCountry;
