import React from 'react';

import TextBox, { PreviewTextField, PreviewMultiLineTextField, FilterTextField } from './TextBox';
import Options, {
  PreviewDropDownField,
  PreviewMultiSelectField,
  PreviewRadioField
} from './Options';
import Range, { PreviewRangeField } from './Range';
import DateRange from './DateRange';
import ImageField, { PreviewImageField } from './Image';
import DateField, { PreviewDateField } from './Date';
import RegionField, { PreviewCityField, PreviewRegionField } from './Location';
import { PreviewPriceField, FilterPriceField } from './Price';

const FieldChooser = ({ index, field, onFieldSaved, onCancel, onEdit, onRemove }) => {
  let chosenInput = null;
  const inputProps = {
    index,
    field,
    onFieldSaved,
    onCancel,
    onEdit,
    onRemove
  };

  if (
    field.type === 'textbox' ||
    field.type === 'multiline_textbox' ||
    field.type === 'city' ||
    field.type === 'price'
  ) {
    chosenInput = <TextBox {...inputProps} />;
  } else if (field.type === 'region') {
    chosenInput = <RegionField {...inputProps} />;
  } else if (field.type === 'date') {
    chosenInput = <DateField {...inputProps} />;
  } else if (field.type === 'dropdown' || field.type === 'radio' || field.type === 'multi-select') {
    chosenInput = <Options {...inputProps} />;
  } else if (field.type === 'range') {
    chosenInput = <Range {...inputProps} />;
  } else if (field.type === 'image' || field.type === 'file') {
    chosenInput = <ImageField {...inputProps} />;
  } else if (field.type === 'date-range') {
    chosenInput = <DateRange {...inputProps} />;
  }
  return chosenInput;
};

const FilterFieldChooser = ({ field, filters, setFilters }) => {
  let chosenInput = null;
  if (field.type === 'textbox' || field.type === 'multiline_textbox' || field.type === 'dropdown') {
    chosenInput = <FilterTextField field={field} filters={filters} setFilters={setFilters} />;
  } else if (field.type === 'price' || field.type === 'range') {
    chosenInput = <FilterPriceField field={field} filters={filters} setFilters={setFilters} />;
  }

  return chosenInput;
};

const PreviewFieldChooser = ({ field, onChange, index, displayValue }) => {
  let chosenInput = null;
  const inputProps = {
    field,
    onChange,
    index,
    displayValue
  };

  if (field.type === 'textbox') {
    chosenInput = <PreviewTextField {...inputProps} />;
  } else if (field.type === 'multiline_textbox') {
    chosenInput = <PreviewMultiLineTextField {...inputProps} />;
  } else if (field.type === 'dropdown') {
    chosenInput = <PreviewDropDownField {...inputProps} />;
  } else if (field.type === 'multi-select') {
    chosenInput = <PreviewMultiSelectField {...inputProps} />;
  } else if (field.type === 'radio') {
    chosenInput = <PreviewRadioField {...inputProps} />;
  } else if (field.type === 'image') {
    chosenInput = <PreviewImageField {...inputProps} />;
  } else if (field.type === 'range') {
    chosenInput = <PreviewRangeField {...inputProps} />;
  } else if (field.type === 'date') {
    chosenInput = <PreviewDateField {...inputProps} />;
  } else if (field.type === 'city') {
    chosenInput = <PreviewCityField {...inputProps} />;
  } else if (field.type === 'region') {
    chosenInput = <PreviewRegionField {...inputProps} />;
  } else if (field.type === 'price') {
    chosenInput = <PreviewPriceField {...inputProps} />;
  }
  return chosenInput;
};

export { PreviewFieldChooser, FilterFieldChooser };

export default FieldChooser;
