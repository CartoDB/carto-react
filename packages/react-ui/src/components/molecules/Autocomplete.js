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
import Typography from '../atoms/Typography';

const filter = createFilterOptions();

const Autocomplete = forwardRef(
  (
    {
      creatable,
      newItemTitle = 'c4r.form.add',
      newItemIcon,
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

    const creatableFilterOptions = (options, params) => {
      const filtered = filter(options, params);
      const { inputValue } = params;

      const isExisting = options.some((option) => inputValue === option.title);

      if (inputValue.length > 1 && inputValue !== '' && !isExisting) {
        filtered.push({
          inputValue,
          title: `${intlConfig.formatMessage({ id: newItemTitle })} "${inputValue}"`
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
        {option.divider ? (
          <Divider />
        ) : (
          <>
            {option.inputValue && <Divider />}
            <MenuItem
              {...props}
              fixed={option.fixed}
              extended={option.extended}
              dense={option.dense}
              destructive={option.destructive}
              disabled={option.disabled}
              subtitle={option.subtitle}
              iconColor={option.iconColor}
            >
              {option.inputValue && (
                <ListItemIcon>{newItemIcon || <AddCircleOutlineOutlined />}</ListItemIcon>
              )}
              {option.startAdornment && !option.inputValue && (
                <ListItemIcon>{option.startAdornment}</ListItemIcon>
              )}
              <ListItemText>
                {option.alternativeTitle || option.title}
                {option.secondaryText && (
                  <Typography component='p' variant='caption' color='text.secondary'>
                    {option.secondaryText}
                  </Typography>
                )}
              </ListItemText>
              {option.endAdornment}
            </MenuItem>
          </>
        )}
      </React.Fragment>
    );

    return (
      <MuiAutocomplete
        {...otherProps}
        filterOptions={creatable ? creatableFilterOptions : filterOptions}
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
  newItemTitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  newItemIcon: PropTypes.element
};

export default Autocomplete;
