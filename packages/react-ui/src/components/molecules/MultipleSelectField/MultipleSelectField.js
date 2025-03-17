import React, { forwardRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../../hooks/useImperativeIntl';
import {
  Checkbox,
  IconButton,
  InputAdornment,
  ListItemText,
  MenuItem,
  Tooltip,
  styled
} from '@mui/material';
import { Cancel } from '@mui/icons-material';

import SelectField from '../../atoms/SelectField';
import Typography from '../../atoms/Typography';

import useMultipleSelectField from './useMultipleSelectField';
import Filters from './Filters';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-disabled': {
    pointerEvents: 'auto',

    '&:hover': {
      backgroundColor: `${theme.palette.background.default} !important`
    }
  }
}));

const UnselectButton = styled(InputAdornment)(({ theme }) => ({
  display: 'none',
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(3.5),

  '.MuiInputBase-root:hover &, .MuiInputBase-root.Mui-focused &': {
    display: 'flex'
  },
  '.MuiSvgIcon-root': {
    color: theme.palette.text.hint
  }
}));

const MultipleSelectField = forwardRef(
  (
    {
      options,
      selectedOptions,
      size = 'small',
      placeholder,
      showCounter,
      showFilters = true,
      onChange,
      selectAllDisabled,
      tooltipPlacement,
      ...props
    },
    ref
  ) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs
    const {
      areAllSelected,
      areAnySelected,
      currentOptions,
      handleChange,
      selectAll,
      unselectAll
    } = useMultipleSelectField({
      options,
      selectedOptions,
      onChange
    });

    const isSmall = size === 'small';
    const paddingSize = isSmall || props.variant === 'standard' ? 0 : 2;

    const intl = useIntl();
    const intlConfig = useImperativeIntl(intl);

    const counterText = `${currentOptions.length} ${intlConfig.formatMessage({
      id: 'c4r.form.selected'
    })}`;

    const renderValue = useMemo(() => {
      if (areAllSelected) {
        return (
          <Typography
            component='span'
            variant={isSmall ? 'body2' : 'body1'}
            color='textPrimary'
            ml={paddingSize}
          >
            {intlConfig.formatMessage({ id: 'c4r.form.allSelected' })}
          </Typography>
        );
      }
      if (areAnySelected) {
        return (
          <Typography
            component='span'
            variant={isSmall ? 'body2' : 'body1'}
            color='textPrimary'
            ml={paddingSize}
          >
            {showCounter && currentOptions.length > 1
              ? counterText
              : currentOptions.join(', ')}
          </Typography>
        );
      }
      return (
        <Typography
          component='span'
          variant={isSmall ? 'body2' : 'body1'}
          color='text.hint'
          ml={paddingSize}
        >
          {placeholder || intlConfig.formatMessage({ id: 'c4r.form.noneSelected' })}
        </Typography>
      );
    }, [
      areAllSelected,
      areAnySelected,
      counterText,
      currentOptions,
      intlConfig,
      isSmall,
      paddingSize,
      placeholder,
      showCounter
    ]);

    return (
      <SelectField
        {...props}
        ref={ref}
        multiple
        displayEmpty
        placeholder={placeholder}
        value={currentOptions}
        renderValue={() => renderValue}
        onChange={handleChange}
        size={size}
        endAdornment={
          showFilters &&
          areAnySelected && (
            <UnselectButton position='end'>
              <IconButton onClick={unselectAll} size='small'>
                <Cancel />
              </IconButton>
            </UnselectButton>
          )
        }
        menuProps={{
          PaperProps: {
            sx: {
              '.MuiList-root': {
                paddingTop: 0
              }
            }
          }
        }}
      >
        {showFilters && (
          <Filters
            areAllSelected={areAllSelected}
            areAnySelected={areAnySelected}
            selectAll={selectAll}
            selectAllDisabled={selectAllDisabled}
          />
        )}
        {options?.map((option) => {
          const item = (
            <StyledMenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              tabIndex={0}
            >
              <Checkbox
                disabled={option.disabled}
                checked={currentOptions.indexOf(option.value) > -1}
              />
              <ListItemText primary={option.label} />
            </StyledMenuItem>
          );
          const content = option.tooltip ? (
            <Tooltip
              key={option.value}
              title={option.tooltip}
              placement={tooltipPlacement}
            >
              {item}
            </Tooltip>
          ) : (
            item
          );
          return content;
        })}
      </SelectField>
    );
  }
);

MultipleSelectField.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      disabled: PropTypes.bool,
      tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    })
  ).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string),
  selectAllDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  showCounter: PropTypes.bool,
  showFilters: PropTypes.bool,
  tooltipPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

export default MultipleSelectField;
