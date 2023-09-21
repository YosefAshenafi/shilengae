// import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import {
  Stack,
  TextField,
  Button,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@material-ui/core';
// import { DragHandleOutlined } from '@material-ui/icons';
// import arrayMove from 'array-move';
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import FieldChooser from '../components/form-fields/FieldChooser';
//
// import USERLIST from '../_mocks_/user';
import { createForm } from '../request/form';
import PreviewFormModal from '../components/form-fields/previewFormModal';

const FIELD_TYPES_LIST = [
  { id: 'textbox', name: 'Text Field' },
  { id: 'multiline_textbox', name: 'Multi Line TextBox' },
  { id: 'dropdown', name: 'Dropdown' },
  { id: 'radio', name: 'Radio Button' },
  { id: 'multi-select', name: 'Multi Select' },
  { id: 'image', name: 'Image' },
  { id: 'file', name: 'File' },
  { id: 'date', name: 'Date' },
  { id: 'range', name: 'Range' },
  { id: 'date-range', name: 'Date Range' },
  { id: 'region', name: 'Region' },
  { id: 'price', name: 'Price' }
];

export const applyDrag = (arr, dragResult) => {
  const { removedIndex, addedIndex, payload } = dragResult;
  if (removedIndex === null && addedIndex === null) return arr;

  const result = [...arr];
  let itemToAdd = payload;

  if (removedIndex !== null) {
    // eslint-disable-next-line prefer-destructuring
    itemToAdd = result.splice(removedIndex, 1)[0];
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd);
  }

  return result;
};

export default function CreateForm() {
  const [formName, setFormName] = useState('');
  const [fieldType, setFieldType] = useState('');
  const [fieldList, setFieldList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFieldChange = (e) => {
    setFieldType(e.target.value);
  };

  const onFieldSaved = (fieldData) => {
    const newFieldList = [...fieldList];
    newFieldList.pop();
    newFieldList.push(fieldData);
    setFieldList(newFieldList);
  };

  const onCancelClicked = (index) => {
    const newFieldList = [...fieldList];
    newFieldList.splice(index, 1);
    setFieldList(newFieldList);
  };

  const onEditClicked = (index) => {
    const newFieldList = [...fieldList];
    newFieldList[index].saved = false;
    setFieldList(newFieldList);
  };

  const togglePreviewModal = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };

  return (
    <Page title="Create Form | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Create Form
          </Typography>
        </Stack>
        <Stack
          direction="column"
          alignItems="left"
          justifyContent="space-between"
          style={{ width: '50%' }}
          my={1}
        >
          <TextField
            label="Form Name"
            onChange={(e) => {
              setFormName(e.target.value);
            }}
            value={formName}
            width="50%"
          />

          {/* <DraggableContainer dragClass=".drag-handle" lockAxis="y" onDrop={onDrop}> */}
          {fieldList.map((field, index) => (
            <FieldChooser
              key={index}
              index={index}
              field={field}
              onFieldSaved={onFieldSaved}
              onCancel={onCancelClicked}
              onEdit={onEditClicked}
            />
          ))}
          {/* </DraggableContainer> */}

          <Stack direction="row" justifyContent="space-between" my={2}>
            <FormControl variant="outlined" style={{ width: '60%' }}>
              <InputLabel>Field Type</InputLabel>
              <Select onChange={handleFieldChange} label="Field Type">
                {FIELD_TYPES_LIST.map((field) => (
                  <MenuItem key={field.id} value={field.id}>
                    {field.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              component={RouterLink}
              to="#"
              fullwidth={false}
              // disabled={isCreating}
              style={{ padding: '10px 20px' }}
              onClick={() => {
                if (fieldType !== '') {
                  const newFieldList = fieldList;
                  newFieldList.push({
                    name: `item ${fieldList.length + 1}`,
                    type: fieldType,
                    hint: 'Field Hint',
                    label: 'Field Label',
                    position: fieldList.length + 1,
                    data: {},
                    saved: false,
                    is_required: false,
                    is_filterable: true
                  });
                  setFieldList(newFieldList);
                }
              }}
            >
              Add Field
            </Button>
          </Stack>
        </Stack>
        <Typography my={2} style={{ color: 'red' }}>
          {error}
        </Typography>
        <Button
          variant="contained"
          component={RouterLink}
          to="#"
          disabled={isLoading}
          style={{ padding: '10px 20px' }}
          onClick={() => {
            setIsLoading(true);
            createForm({ name: formName, form_fields: fieldList })
              .then(() => {
                navigate('/dashboard/forms');
                setIsLoading(false);
              })
              .catch((err) => {
                // setError(`* ${err.response.data}`);
                Object.entries(err.response.data).forEach((e) => setError(`* ${e[1]}`));
                setIsLoading(false);
              });
          }}
        >
          Create Form
        </Button>
        <Button
          sx={{ ml: 2, py: 1, px: 3 }}
          onClick={() => {
            togglePreviewModal();
          }}
        >
          Preview Form
        </Button>
        {isPreviewOpen && (
          <PreviewFormModal
            fieldList={fieldList}
            isPreviewOpen={isPreviewOpen}
            toggleDialog={togglePreviewModal}
          />
        )}
      </Container>
    </Page>
  );
}

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
