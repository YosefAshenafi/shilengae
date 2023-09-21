/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  Stack,
  Container,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Snackbar,
  Alert
} from '@material-ui/core';
import { getOperableCountries, chooseOperatingCountry } from '../../request/country';

const ChooseCountry = ({ operating_country }) => {
  const [operableCountries, setOperableCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  const handleOperatingCountryChange = (event) => {
    setValue(event.target.value);
    chooseOperatingCountry(event.target.value).then(() => {
      setOpen(true);
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    getOperableCountries().then((res) => {
      // console.log('in useEffect', operating_country);
      setOperableCountries(res.results);
      setValue(operating_country);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operating_country]);
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <FormControl variant="outlined" style={{ width: '100%' }}>
          <InputLabel>Choose Operating Country</InputLabel>
          <Select
            label="Choose Operating Country"
            value={value}
            onChange={handleOperatingCountryChange}
          >
            {operableCountries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            You have updated your operating country
          </Alert>
        </Snackbar>
      </Stack>
    </Container>
  );
};

export default ChooseCountry;
