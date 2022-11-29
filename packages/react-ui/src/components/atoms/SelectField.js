import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Checkbox, MenuItem, TextField } from '@mui/material';
import Typography from './Typography';

const SelectField = forwardRef(
  ({ placeholder, items, multiple, size, ...otherProps }, ref) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs

    const [content, setContent] = useState([]);
    const handleChange = (event: SelectChangeEvent<typeof content>) => {
      const {
        target: { value }
      } = event;
      setContent(
        // On autofill we get a stringified value
        typeof value === 'string' ? value.split(',') : value
      );
    };
    const isSmall = size === 'small';

    return (
      <TextField
        {...otherProps}
        select
        ref={ref}
        value={content}
        onChange={handleChange}
        size={size}
        SelectProps={{
          multiple: multiple,
          displayEmpty: !!placeholder,
          renderValue: (selected) => {
            if (selected.length === 0) {
              return (
                <Typography
                  variant={isSmall ? 'body2' : 'body1'}
                  color='text.hint'
                  component='span'
                >
                  {placeholder}
                </Typography>
              );
            }
            return selected.map((value, index) => (
              <Typography
                key={index}
                variant={isSmall ? 'body2' : 'body1'}
                component='span'
              >
                {items.find((item) => item.id === value).label}
              </Typography>
            ));
          }
        }}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.id}>
            {multiple && <Checkbox checked={content.indexOf(item) > -1} />}
            <Typography variant='body2' component='span'>
              {item.label}
            </Typography>
          </MenuItem>
        ))}
      </TextField>
    );
  }
);

SelectField.defaultProps = {
  multiple: false,
  size: 'medium'
};

SelectField.propTypes = {
  items: PropTypes.array.isRequired,
  multiple: PropTypes.bool,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large'])
};

export default SelectField;
