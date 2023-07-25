import React, { forwardRef } from 'react';
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
  ({ items, size, placeholder, counter, itemChecked, ...otherProps }, ref) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs

    const isSmall = size === 'small';
    const paddingSize = isSmall ? 1.5 : 2;

    const renderValue = React.useCallback(
      (selected) => {
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
                {selected.length > 1 && ', '}
              </Typography>
            ))}
          </BoxContent>
        );
      },
      [paddingSize, isSmall, placeholder, items]
    );

    return (
      <SelectField
        {...otherProps}
        ref={ref}
        multiple
        placeholder={placeholder}
        renderValue={renderValue}
      >
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            <Checkbox checked={itemChecked[index]} size='small' />
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
  ).isRequired,
  itemChecked: PropTypes.arrayOf(PropTypes.bool).isRequired
};

export default MultipleSelectField;
