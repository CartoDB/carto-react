import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, MenuItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

import Typography from './Typography';

const BoxContent = styled(Box)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const SelectField = forwardRef(
  ({ placeholder, items, multiple, size, ...otherProps }, ref) => {
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

    const isSmall = size === 'small';
    const paddingSize = isSmall ? 1.5 : 2;

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
          size: size,
          renderValue: (selected) => {
            if (selected.length === 0) {
              return (
                <BoxContent ml={multiple && paddingSize}>
                  <Typography
                    variant={isSmall ? 'body2' : 'body1'}
                    color='text.hint'
                    component='span'
                  >
                    {placeholder}
                  </Typography>
                </BoxContent>
              );
            }
            return (
              <BoxContent ml={multiple && paddingSize}>
                {selected.map((value, index) => (
                  <Typography
                    key={index}
                    variant={isSmall ? 'body2' : 'body1'}
                    component='span'
                  >
                    {items.find((item) => item.value === value).label}
                    {multiple && ', '}
                  </Typography>
                ))}
              </BoxContent>
            );
          },
          MenuProps: {
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'left'
            },
            transformOrigin: {
              vertical: -4,
              horizontal: 'left'
            }
          }
        }}
      >
        <MenuItem key='empty' disabled value={''}></MenuItem>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {multiple && (
              <Checkbox checked={content.indexOf(item.value) > -1} size='small' />
            )}
            {item.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
);

SelectField.defaultProps = {
  multiple: false,
  size: 'small'
};
SelectField.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  ).isRequired,
  placeholder: PropTypes.string.isRequired,
  multiple: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium'])
};

export default SelectField;
