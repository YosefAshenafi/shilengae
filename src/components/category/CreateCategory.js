import React, { useEffect, useState } from 'react';

import {
  Stack,
  Button,
  IconButton,
  TextField,
  Typography,
  Drawer,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';

import { createCategory } from '../../request/category';
import { getAllForms } from '../../request/form';

const CreateCategory = ({
  isOpenFilter,
  toggleDrawer,
  fetchCategories,
  parent = null,
  parentName = null
}) => {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [isCreating, setIsCreating] = useState(false);
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState('');
  const [error, setError] = useState('');

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  // const handleParentCategoryChange = (e) => {
  //   setCategory(e.target.value);
  // };

  const handleFormChange = (e) => {
    setForm(e.target.value);
  };

  useEffect(() => {
    // fetch categories and set them to categories variable
    getAllForms().then((forms) => {
      setForms(forms.results);
    });
  }, [isOpenFilter]);
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
          Add Category
        </Typography>
        <IconButton onClick={toggleDrawer}>
          <Icon icon={closeFill} width={20} height={20} />
        </IconButton>
      </Stack>
      <Typography sx={{ mb: 1 }}>Parent Category : {parentName}</Typography>
      <TextField
        fullwidth
        label="Category Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        style={{ marginBottom: '20px' }}
      />
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <InputLabel>Form</InputLabel>
        <Select onChange={handleFormChange} label="Form">
          {forms.map((form) => (
            <MenuItem key={form.id} value={form.id}>
              {form.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
          createCategory(name, status, parent, form)
            .then(() => {
              fetchCategories();
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
        {!isCreating ? 'Add' : 'Creating Category...'}
      </Button>
    </Drawer>
  );

  return createDrawer;
};

export default CreateCategory;
