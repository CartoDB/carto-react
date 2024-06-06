import React from 'react';
import PropTypes from 'prop-types';
import {
  MenuItem,
  Autocomplete as MuiAutocomplete,
  createFilterOptions
} from '@mui/material';

const filter = createFilterOptions();

const Autocomplete = ({
  creatable,
  newItemTitle,
  freeSolo,
  renderOption,
  ...otherProps
}) => {
  return (
    <MuiAutocomplete
      {...otherProps}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        const { inputValue } = params;

        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue.length > 1 && inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: newItemTitle || `Add "${inputValue}"`
          });
        }

        return filtered;
      }}
      getOptionLabel={(option) => {
        // Value selected with enter
        if (typeof option === 'string') {
          return option;
        }
        // Add option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={
        creatable
          ? (props, option) => <MenuItem {...props}>{option.title}</MenuItem>
          : renderOption
      }
      freeSolo={creatable || freeSolo}
      forcePopupIcon
      creatable={creatable}
    />
  );
};

Autocomplete.propTypes = {
  creatable: PropTypes.bool,
  newItemTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default Autocomplete;
