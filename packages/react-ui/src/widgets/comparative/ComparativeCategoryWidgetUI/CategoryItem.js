import {
  Box,
  Checkbox,
  darken,
  Tooltip,
  Typography,
  useTheme,
  withStyles
} from '@material-ui/core';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber, {
  animationOptionsPropTypes
} from '../../../custom-components/AnimatedNumber';
import { transposedCategoryItemPropTypes } from './transposeCategoryData';
import { OTHERS_KEY } from './ComparativeCategoryWidgetUI';
import { useCategoryStyles } from './useCategoryStyles';

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

function ComparativeCategoryTooltip({ item, names, formatter = IDENTITY_FN }) {
  const theme = useTheme();
  const classes = useCategoryStyles();

  return (
    <div>
      <Typography color='inherit' variant='caption' noWrap>
        {item.label}
      </Typography>
      <Box pt={1}>
        {item.data.map((d, i) => (
          <Box
            key={names[i]}
            display='flex'
            alignItems='center'
            gridGap={theme.spacing(0.75)}
          >
            <div
              className={classes.bullet}
              style={{
                backgroundColor:
                  item.key === OTHERS_KEY ? theme.palette.background.default : d.color
              }}
            ></div>
            <Typography color='inherit' variant='caption'>
              {names[i]}
            </Typography>
            <Box flexGrow={1}></Box>
            <Typography color='inherit' variant='caption'>
              {formatter(d.value)}
            </Typography>
          </Box>
        ))}
      </Box>
    </div>
  );
}

ComparativeCategoryTooltip.displayName = 'ComparativeCategoryTooltip';
ComparativeCategoryTooltip.defaultProps = {
  names: EMPTY_ARRAY,
  formatter: IDENTITY_FN
};
ComparativeCategoryTooltip.propTypes = {
  item: transposedCategoryItemPropTypes,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  formatter: PropTypes.func
};

const StyledTooltip = withStyles((theme) => ({
  tooltip: {
    color: theme.palette.common.white,
    maxWidth: 260
  }
}))(Tooltip);

function CategoryItem({
  item,
  animation,
  animationOptions,
  maxValue,
  showCheckbox,
  checkboxChecked,
  className,
  formatter,
  onClick = IDENTITY_FN,
  names
}) {
  const classes = useCategoryStyles();
  const theme = useTheme();
  const compareValue = useMemo(() => {
    const reference = item.data[0].value;
    const max = Math.max(...item.data.map((d) => d.value));
    return reference - max;
  }, [item]);

  const valueColor =
    Math.sign(compareValue) === -1
      ? theme.palette.error.main
      : theme.palette.success.main;

  const numberColor = item.key === OTHERS_KEY ? theme.palette.text.disabled : valueColor;

  function getProgressbarLength(value) {
    return `${Math.min(100, ((value || 0) / maxValue) * 100)}%`;
  }

  const tooltipContent = (
    <ComparativeCategoryTooltip item={item} names={names} formatter={formatter} />
  );

  return (
    <StyledTooltip placement='top-start' title={tooltipContent}>
      <Box
        display='flex'
        alignItems='center'
        flexWrap='nowrap'
        overflow='hidden'
        gridGap={theme.spacing(1)}
        onClick={() => onClick(item.key)}
        className={className}
      >
        {showCheckbox ? <Checkbox checked={checkboxChecked} /> : null}
        <Box py={0.5} flexGrow='1' maxWidth='100%' minWidth={0}>
          <Box display='flex' justifyContent='space-between' flexWrap='nowrap' gridGap={theme.spacing(0.5)}>
            <Tooltip title={item.label}>
              <Typography variant='body2' noWrap>
                {item.label}
              </Typography>
            </Tooltip>
            <Typography style={{ color: numberColor }} variant='body2'>
              <AnimatedNumber
                value={compareValue || 0}
                enabled={animation}
                options={animationOptions}
                formatter={formatter}
              />
            </Typography>
          </Box>
          {item.data.map((d, i) => (
            <div key={`${item.key}_${i}`} className={classes.progressbar}>
              <div
                style={
                  /* @ts-ignore */ {
                    '--hover-color': darken(d.color, 0.2),
                    '--color': d.color,
                    width: getProgressbarLength(d.value)
                  }
                }
              ></div>
            </div>
          ))}
        </Box>
      </Box>
    </StyledTooltip>
  );
}

CategoryItem.displayName = 'CategoryItem';
CategoryItem.defaultProps = {
  animation: true,
  animationOptions: {},
  className: '',
  formatter: IDENTITY_FN,
  onClick: IDENTITY_FN
};
CategoryItem.propTypes = {
  item: transposedCategoryItemPropTypes,
  animation: PropTypes.bool,
  animationOptions: animationOptionsPropTypes,
  maxValue: PropTypes.number.isRequired,
  showCheckbox: PropTypes.bool.isRequired,
  checkboxChecked: PropTypes.bool.isRequired,
  className: PropTypes.string,
  formatter: PropTypes.func,
  onClick: PropTypes.func,
  names: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CategoryItem;
