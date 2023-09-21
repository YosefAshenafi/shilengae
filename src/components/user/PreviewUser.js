import React, { useState, useEffect } from 'react';

import {
  TextField,
  Dialog,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogTitle,
  DialogContent
} from '@material-ui/core';

import { getUserDetail } from '../../request/user';

const PreviewUserDrawer = ({ isOpenFilter, toggleDrawer, userId }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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

  const PreviewDrawer = (
    <Dialog
      open={isOpenFilter}
      onClose={() => toggleDrawer(userId)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">User Detail</DialogTitle>
      <DialogContent style={{ width: '600px', display: 'grid' }}>
        <TextField fullwidth label="Username" value={username} style={{ marginBottom: '20px' }} />
        <TextField fullwidth label="Email" style={{ marginBottom: '20px' }} value={email} />
        <TextField
          fullwidth
          label="First Name"
          style={{ marginBottom: '20px' }}
          value={firstName}
        />
        <TextField fullwidth label="Last Name" style={{ marginBottom: '20px' }} value={lastName} />
        <FormControl variant="outlined" sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select value={status} label="Status">
            <MenuItem value="ACTIVE">Active</MenuItem>
            <MenuItem value="INACTIVE">Inactive</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
    </Dialog>
  );

  return PreviewDrawer;
};

export default PreviewUserDrawer;
