import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Checkbox, MenuItem, styled } from '@mui/material';
import SelectField from './SelectField';
import Typography from './Typography';

const BoxContent = styled(Box)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

const MultipleSelectField = forwardRef(
  ({ items, size, placeholder, counter, ...otherProps }, ref) => {
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
      <SelectField
        {...otherProps}
        ref={ref}
        value={content}
        onChange={handleChange}
        multiple
        customRenderValue={(selected) => {
          if (selected.length === 0) {
            return (
              <Typography
                variant={isSmall ? 'body2' : 'body1'}
                color='text.hint'
                component='span'
                noWrap
                ml={paddingSize}
              >
                {placeholder}
              </Typography>
            );
          }
          return (
            <BoxContent ml={paddingSize}>
              {selected.map((value, index) => (
                <Typography
                  key={index}
                  variant={isSmall ? 'body2' : 'body1'}
                  component='span'
                >
                  {items.find((item) => item.value === value).label}
                  {', '}
                </Typography>
              ))}
            </BoxContent>
          );
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
  }
);

MultipleSelectField.defaultProps = {
  size: 'small'
};

MultipleSelectField.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    })
  ).isRequired
};

export default MultipleSelectField;
