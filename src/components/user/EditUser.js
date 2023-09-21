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

import { editUser, getUserDetail } from '../../request/user';

const UpdateUser = ({ isOpenFilter, toggleDrawer, refetchUsers, userId }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    // getUserDetail
    getUserDetail(userId).then((res) => {
      setUsername(res.username);
      setEmail(res.email);
      setStatus(res.status);
      setFirstName(res.first_name);
      setLastName(res.last_name);
    });
  }, [userId]);

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
          Edit User
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
          editUser(userId, username, email, firstName, lastName, status)
            .then(() => {
              setIsCreating(false);
              refetchUsers();
              toggleDrawer(userId);
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

export default UpdateUser;
