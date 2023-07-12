import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, MenuItem } from '@mui/material';
import SelectField from './SelectField';

const MultipleSelectField = forwardRef(({ items, ...otherProps }, ref) => {
  // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
  // https://mui.com/material-ui/guides/composition/#caveat-with-refs
  const [content, setContent] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setContent(
      // On autofill we get a stringified value
      typeof value === 'string' ? value.split(',') : value
    );
  };

  return (
    <SelectField
      {...otherProps}
      ref={ref}
      value={content}
      onChange={handleChange}
      customSelectProps={{
        multiple: true
      }}
    >
      {items.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          <Checkbox checked={content.indexOf(item.value) > -1} size='small' />
          {item.label}
        </MenuItem>
      ))}
    </SelectField>
  );
});

MultipleSelectField.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  ).isRequired
};

export default MultipleSelectField;
