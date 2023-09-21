import React, { useEffect, useState } from 'react';
import { MenuItem, Select, Stack, Button, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

import { getAllCategories } from '../../request/category';
import { getAllFieldsByCategory } from '../../request/formFields';
import { FilterFieldChooser } from '../form-fields/FieldChooser';

const Filter = ({ filters, setFilters, filterAds, setFilterCategory }) => {
  const title = 'Filters';
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    getAllCategories().then((data) => {
      setCategories([{ id: null, name: 'No Category' }, ...data.results]);
    });
  }, []);

  useEffect(() => {
    if (category) {
      getAllFieldsByCategory(category, true).then((data) => {
        setFields(data);
      });
    }
  }, [category]);

  return (
    <Stack
      sx={{
        mx: 2
      }}
    >
      <h3>{title}</h3>
      <Select
        sx={{
          width: '30%'
        }}
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setFilterCategory(e.target.value);
        }}
        id="demo-multiple-chip"
      >
        {categories.map((category, index) => (
          <MenuItem key={index} value={category.id}>
            {category.name}
          </MenuItem>
        ))}
      </Select>
      <Grid container lg={12} spacing={2} mt={1}>
        {fields.map((field) => (
          <Grid item lg={4} spacing={1} sx={{ paddingTop: '2px !important' }} key={field.id}>
            <FilterFieldChooser field={field} filters={filters} setFilters={setFilters} />
          </Grid>
        ))}
      </Grid>

      <Button item xs={3} sm={3} md={3} lg={3} onClick={filterAds}>
        Apply Filter
      </Button>
    </Stack>
  );
};

Filter.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.object,
  filterAds: PropTypes.func,
  setFilterCategory: PropTypes.func
};

export { Filter };
