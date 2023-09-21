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

import { editRegion, getRegionDetail } from '../../request/region';

const EditRegion = ({ isOpenFilter, toggleDrawer, fetchRegions, regionId }) => {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isCreating, setIsCreating] = useState(false);
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    getRegionDetail(regionId).then((res) => {
      setCountry(res.data.country);
      setSymbol(res.data.symbol);
      setName(res.data.name);
      setStatus(res.data.status);
    });
  }, [regionId]);

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
          Edit Region
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <TextField fullwidth label="Region Id" value={regionId} disabled sx={{ mb: 2 }} />
      <TextField
        fullwidth
        label="Region Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
        style={{ marginBottom: '20px' }}
      />
      <TextField
        fullwidth
        label="Symbol"
        style={{ marginBottom: '20px' }}
        onChange={(e) => {
          setSymbol(e.target.value);
        }}
        value={symbol}
      />

      <FormControl variant="outlined">
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
          editRegion(regionId, name, symbol, country, status)
            .then(() => {
              setIsCreating(false);
              fetchRegions();
              toggleDrawer(regionId);
            })
            .catch((e) => {
              console.log(e);
              Object.entries(e.response.data).forEach((e) => setError(`* ${e[1]}`));
              setIsCreating(false);
            });
        }}
      >
        {!isCreating ? 'Edit' : 'Editing Region...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default EditRegion;
