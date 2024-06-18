import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Autocomplete as MuiAutocomplete,
  createFilterOptions
} from '@mui/material';
import { AddCircleOutlineOutlined } from '@mui/icons-material';
import MenuItem from './MenuItem';
import useImperativeIntl from '../../hooks/useImperativeIntl';

const filter = createFilterOptions();

const Autocomplete = forwardRef(
  (
    {
      creatable,
      newItemTitle,
      freeSolo,
      renderOption,
      forcePopupIcon,
      filterOptions,
      getOptionLabel,
      ...otherProps
    },
    ref
  ) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs
    const intl = useIntl();
    const intlConfig = useImperativeIntl(intl);

    const creatableOptions = (options, params) => {
      const filtered = filter(options, params);
      const { inputValue } = params;

      const isExisting = options.some((option) => inputValue === option.title);

      if (inputValue.length > 1 && inputValue !== '' && !isExisting) {
        filtered.push({
          inputValue,
          title:
            newItemTitle ||
            `${intlConfig.formatMessage({ id: 'c4r.form.add' })} "${inputValue}"`
        });
      }

      return filtered;
    };

    const creatableOptionLabel = (option) => {
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
    };

    const creatableRenderOption = (props, option) => (
      <React.Fragment key={option.inputValue || option.title}>
        {option.inputValue && <Divider />}
        <MenuItem {...props} fixed={option.fixed} subtitle={option.subtitle}>
          {option.inputValue && (
            <ListItemIcon>
              <AddCircleOutlineOutlined />
            </ListItemIcon>
          )}
          {option.icon && !option.inputValue && (
            <ListItemIcon>{option.icon}</ListItemIcon>
          )}
          <ListItemText>{option.title}</ListItemText>
        </MenuItem>
      </React.Fragment>
    );

    return (
      <MuiAutocomplete
        {...otherProps}
        filterOptions={creatable ? creatableOptions : filterOptions}
        getOptionLabel={creatable ? creatableOptionLabel : getOptionLabel}
        renderOption={creatable ? creatableRenderOption : renderOption}
        freeSolo={creatable || freeSolo}
        forcePopupIcon={creatable || forcePopupIcon}
      />
    );
  }
);

Autocomplete.propTypes = {
  creatable: PropTypes.bool,
  newItemTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
};

export default Autocomplete;
