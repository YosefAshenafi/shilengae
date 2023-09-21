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

import { editCountry, getCountryDetail } from '../../request/country';

const EditCountry = ({ isOpenFilter, toggleDrawer, fetchCountries, countryId }) => {
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
    setCountryInfo(country);
  };

  const setCountryInfo = (country) => {
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

    getCountryDetail(countryId).then((res) => {
      // setName(res.data.name);
      let countryIdx = -1;
      for (let index = 0; index < countriesList.length; index += 1) {
        const element = countriesList[index];
        if (element.name === res.data.name) {
          countryIdx = index;
        }
      }
      // console.log(res.data.status);
      setStatus(res.data.status);
      if (countryIdx > -1) {
        setChosenCountry(countryIdx);
        setCountryInfo(countriesList[countryIdx]);
      }
    });
  }, [countriesList, countryId]);

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
          Edit Country
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullwidth
        disabled
        label="Country Id"
        sx={{ mb: 2 }}
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
        value={countryId}
      />
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
          editCountry(countryId, name, currencyCode, symbol, timezone, status)
            .then(() => {
              fetchCountries();
              setIsCreating(false);
              toggleDrawer();
            })
            .catch((e) => {
              Object.entries(e.response.data).forEach((e) => setError(`* ${e[1]}`));
              setIsCreating(false);
            });
        }}
      >
        {!isCreating ? 'Edit' : 'Editing Country...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default EditCountry;
