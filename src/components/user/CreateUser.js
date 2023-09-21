import React, { useState, useEffect } from 'react';

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

import { getAllCountries } from '../../request/country';
import { createUser } from '../../request/user';

const CreateUser = ({ isOpenFilter, toggleDrawer, fetchUsers }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState('GUEST');
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileCountryCode, setMobileCountryCode] = useState('+');
  const [operableCountries, setOperableCountries] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleOperableCountryChange = (e) => {
    setOperableCountries(e.target.value);
  };

  useEffect(() => {
    getAllCountries().then((res) => {
      setCountries(res.results);
    });
  }, []);

  const createDrawer = (
    <Drawer
      anchor="right"
      open={isOpenFilter}
      onClose={() => {}}
      PaperProps={{
        sx: { width: 400, border: 'none', padding: '20px 20px' }
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ px: 1, py: 2 }}
      >
        <Typography variant="subtitle1" sx={{ ml: 1 }}>
          Add User
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField
        fullwidth
        label="Username"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullwidth
        label="Email"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <TextField
        fullwidth
        label="First Name"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
        value={firstName}
      />
      <TextField
        fullwidth
        label="Last Name"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setLastName(e.target.value);
        }}
        value={lastName}
      />
      <TextField
        fullwidth
        label="Password"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setPassword1(e.target.value);
        }}
        value={password1}
      />
      <TextField
        fullwidth
        label="Confirm Password"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setPassword2(e.target.value);
        }}
        value={password2}
      />
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Operable Country</InputLabel>
        <Select
          label="Operable Country"
          id="demo-multiple-chip"
          onChange={handleOperableCountryChange}
          value={operableCountries}
          multiple
        >
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullwidth
        label="Mobile Country Code"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setMobileCountryCode(e.target.value);
        }}
        value={mobileCountryCode}
      />
      <TextField
        fullwidth
        label="Mobile Number"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setMobileNumber(e.target.value);
        }}
        value={mobileNumber}
      />
      <FormControl variant="outlined" sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={handleStatusChange} label="Status">
          <MenuItem value="ACTIVE">Active</MenuItem>
          <MenuItem value="INACTIVE">Inactive</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel>User Type</InputLabel>
        <Select value={userType} onChange={(e) => setUserType(e.target.value)} label="User Type">
          <MenuItem value="SUPERADMIN">Super Admin</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
          <MenuItem value="MODERATOR">Moderator</MenuItem>
          <MenuItem value="GUEST">Guest</MenuItem>
          <MenuItem value="USER">User</MenuItem>
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
          createUser(
            username,
            email,
            password1,
            password2,
            firstName,
            lastName,
            status,
            mobileCountryCode,
            mobileNumber,
            userType,
            operableCountries
          )
            .then(() => {
              setIsCreating(false);
              fetchUsers();
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
        {!isCreating ? 'Add' : 'Creating User...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default CreateUser;
