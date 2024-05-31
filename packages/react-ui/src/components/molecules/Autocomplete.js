import React from 'react';
import PropTypes from 'prop-types';
import {
  Autocomplete as MuiAutocomplete,
  createFilterOptions,
  TextField
} from '@mui/material';

const filter = createFilterOptions();

const Autocomplete = ({ options, creatable, ...otherProps }) => {
  const [value, setValue] = React.useState(null);

  return (
    <MuiAutocomplete
      {...otherProps}
      creatable={creatable}
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue
          });
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue
          });
        } else {
          setValue(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      options={options}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.title;
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label='Free solo with text demo' />}
    />
  );
};

Autocomplete.defaultProps = {
  size: 'medium'
};
Autocomplete.propTypes = {
  creatable: PropTypes.bool
};

export default Autocomplete;
