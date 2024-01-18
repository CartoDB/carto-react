import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import useImperativeIntl from '../../hooks/useImperativeIntl';
import {
  Box,
  Checkbox,
  Link,
  ListItemText,
  MenuItem,
  Tooltip,
  styled
} from '@mui/material';
import SelectField from './SelectField';
import Typography from './Typography';

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  '&.Mui-disabled': {
    pointerEvents: 'auto',

    '&:hover': {
      backgroundColor: `${theme.palette.background.default} !important`
    }
  }
}));

const Filters = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  marginLeft: 'auto',
  marginBottom: theme.spacing(0.5),
  pointerEvents: 'auto'
}));

const LinkFilter = styled(Link)(({ disabled, theme }) => ({
  ...(disabled && { pointerEvents: 'none', color: theme.palette.text.secondary })
}));

const MultipleSelectField = forwardRef(
  (
    {
      options,
      selectedOptions,
      size,
      placeholder,
      showCounter,
      showFilters,
      onChange,
      selectAllDisabled,
      ...props
    },
    ref
  ) => {
    // forwardRef needed to be able to hold a reference, in this way it can be a child for some Mui components, like Tooltip
    // https://mui.com/material-ui/guides/composition/#caveat-with-refs
    const [currentOptions, setCurrentOptions] = useState(selectedOptions || []);

    const isSmall = size === 'small';
    const paddingSize = isSmall || props.variant === 'standard' ? 0 : 2;

    const areAllSelected = options.length === currentOptions.length;
    const areAnySelected = currentOptions.length > 0;

    const intl = useIntl();
    const intlConfig = useImperativeIntl(intl);

    const counterText = `${currentOptions.length} ${intlConfig.formatMessage({
      id: 'c4r.form.selected'
    })}`;

    useEffect(() => {
      if (currentOptions !== selectedOptions) {
        setCurrentOptions(currentOptions);
      }
      // intentionally ignore currentOptions as we only want to trigger on external updates
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedOptions]);

    const handleChange = (event) => {
      const {
        target: { value }
      } = event;
      const options =
        typeof value === 'string'
          ? value.split(',')
          : value.filter((v) => v !== undefined);
      setCurrentOptions(options);
      onChange(options);
    };

    const selectAll = () => {
      const optionsValues = options
        ?.filter(({ disabled }) => !disabled)
        .map(({ value }) => value);

      if (optionsValues) {
        setCurrentOptions(optionsValues);
        onChange(optionsValues);
      }
    };

    const unselectAll = () => {
      setCurrentOptions([]);
      onChange([]);
    };

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
          color='textSecondary'
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
        renderValue={() => renderValue}
        onChange={handleChange}
        size={size}
        labelSecondary={
          showFilters && (
            <Filters>
              <LinkFilter
                variant='caption'
                component='button'
                disabled={areAllSelected || selectAllDisabled}
                onClick={selectAll}
              >
                {intlConfig.formatMessage({ id: 'c4r.form.selectAll' })}
              </LinkFilter>
              <Typography variant='caption' color='textSecondary'>
                ·
              </Typography>
              <LinkFilter
                variant='caption'
                component='button'
                onClick={unselectAll}
                disabled={!areAnySelected}
              >
                {intlConfig.formatMessage({
                  id: 'c4r.form.selectNone'
                })}
              </LinkFilter>
            </Filters>
          )
        }
      >
        {options?.map((option) => {
          const item = (
            <StyledMenuItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              <Checkbox
                disabled={option.disabled}
                checked={currentOptions.indexOf(option.value) > -1}
              />
              <ListItemText primary={option.label} />
            </StyledMenuItem>
          );
          const content = option.tooltip ? (
            <Tooltip key={option.value} title={option.tooltip}>
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

MultipleSelectField.defaultProps = {
  size: 'small'
};

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
  showFilters: PropTypes.bool
};

export default MultipleSelectField;
