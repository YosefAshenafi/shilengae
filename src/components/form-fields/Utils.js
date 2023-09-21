/* eslint-disable react/prop-types */
import React from 'react';
import { Stack, Typography, Button, TextField, Checkbox } from '@material-ui/core';

const PostSave = ({ index, onCancel, onEdit, onRemove, field }) => (
  <Stack direction="row" alignItems="center" sx={{ px: 0, mt: 2 }}>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.name}
    </Typography>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.hint}
    </Typography>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.label}
    </Typography>
    <Typography variant="p" gutterBottom sx={{ mr: 3 }}>
      {field.position}
    </Typography>
    <Button sx={{ mr: 3 }} onClick={() => onEdit(index)}>
      Edit
    </Button>
    {onRemove && field.id && (
      <Button sx={{ mr: 3 }} onClick={() => onRemove(index)}>
        Remove
      </Button>
    )}
    {!field.id && (
      <Button
        onClick={() => {
          onCancel(index);
        }}
      >
        Cancel
      </Button>
    )}
  </Stack>
);

const FieldSave = ({ index, onCancel, handleChange, json }) => (
  <>
    <Stack direction="row" alignItems="center">
      <TextField
        label="Position"
        value={json.position}
        sx={{ mr: 5 }}
        onChange={(e) => handleChange(e.target.value, 'position')}
      />
      <Checkbox
        checked={json.is_required}
        onChange={() => {
          handleChange(!json.is_required, 'is_required');
        }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Typography>Is Required?</Typography>
      <Checkbox
        checked={json.is_filterable}
        onChange={() => {
          handleChange(!json.is_filterable, 'is_filterable');
        }}
        inputProps={{ 'aria-label': 'primary checkbox' }}
      />
      <Typography>Is Filterable?</Typography>
    </Stack>
    <Stack direction="row" alignItems="center">
      <Button
        to=""
        sx={{ px: 0, py: 1, mt: 2, mr: 3, width: '20%' }}
        width="50%"
        onClick={() => {
          onCancel(index);
        }}
      >
        Cancel
      </Button>
      <Button
        variant="contained"
        to=""
        sx={{ px: 0, py: 1, mt: 2, width: '20%' }}
        width="50%"
        onClick={() => {
          handleChange(true, 'saved');
        }}
      >
        Save
      </Button>
    </Stack>
  </>
);

export { PostSave, FieldSave };
