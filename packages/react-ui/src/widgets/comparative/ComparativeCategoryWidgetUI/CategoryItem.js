import { Box, Checkbox, darken, Tooltip, Typography, useTheme } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import React from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber, {
  animationOptionsPropTypes
} from '../../../custom-components/AnimatedNumber';
import { transposedCategoryItemPropTypes } from './transposeCategoryData';
import { OTHERS_KEY } from './ComparativeCategoryWidgetUI';
import {
  Bullet,
  BulletWrapper,
  CategoryItemWrapperInner,
  CategoryItemWrapperRoot,
  Progressbar,
  ProgressbarWrapper,
  SignWrapper,
  StyledTooltip
} from './comparative.styled';

const IDENTITY_FN = (v) => v;
const EMPTY_ARRAY = [];

function ComparativeCategoryTooltip({ item, index, names, formatter = IDENTITY_FN }) {
  const theme = useTheme();
  const reference = item.data[0];
  const data = item.data[index];
  const name = names[index];

  const compareValue = ((data.value - reference.value) / (reference.value || 1)) * 100;
  const signText = Math.sign(compareValue) === -1 ? '-' : '+';
  const valueColor =
    Math.sign(compareValue) === -1
      ? theme.palette.error.main
      : theme.palette.success.main;

  const numberColor = item.key === OTHERS_KEY ? theme.palette.text.disabled : valueColor;

  return (
    <div>
      <Typography color='inherit' variant='caption' noWrap>
        {item.label}
      </Typography>
      <Box pt={1} pb={0.5}>
        <BulletWrapper alignItems='baseline'>
          <Bullet
            color={
              item.key === OTHERS_KEY ? theme.palette.background.default : data.color
            }
          />
          <Typography color='inherit' variant='caption'>
            {name}
          </Typography>
          <Box
            style={{
              flexGrow: 1
            }}
          ></Box>
          <SignWrapper backgroundColor={numberColor}>
            <Typography color='inherit' variant='caption'>
              {signText}
              {formatter(Math.abs(compareValue))}
            </Typography>
          </SignWrapper>
        </BulletWrapper>
      </Box>
    </div>
  );
}

ComparativeCategoryTooltip.displayName = 'ComparativeCategoryTooltip';
ComparativeCategoryTooltip.defaultProps = {
  names: EMPTY_ARRAY,
  formatter: IDENTITY_FN,
  index: 0
};
ComparativeCategoryTooltip.propTypes = {
  item: transposedCategoryItemPropTypes,
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  formatter: PropTypes.func,
  index: PropTypes.number
};

function CategoryItem({
  item,
  animation,
  animationOptions,
  maxValue,
  showCheckbox,
  checkboxChecked,
  className,
  formatter,
  tooltipFormatter,
  onClick = IDENTITY_FN,
  names,
  tooltip
}) {
  const theme = useTheme();

  function getProgressbarLength(value) {
    return `${Math.min(100, ((value || 0) / maxValue) * 100)}%`;
  }

  const tooltipContent = (index) => (
    <ComparativeCategoryTooltip
      item={item}
      names={names}
      formatter={tooltipFormatter}
      index={index}
    />
  );

  return (
    <CategoryItemWrapperRoot onClick={() => onClick(item.key)} className={className}>
      {showCheckbox ? <Checkbox checked={checkboxChecked} /> : null}
      <CategoryItemWrapperInner>
        <Typography variant='body2' noWrap>
          {item.label}
        </Typography>
        {item.data.map((d, i) => (
          <StyledTooltip
            key={`${item.key}_${i}`}
            title={tooltipContent(i)}
            placement='top-start'
            arrow={false}
            disableHoverListener={!tooltip}
          >
            <ProgressbarWrapper>
              <Progressbar className='progressbar'>
                <div
                  style={
                    /* @ts-ignore */ {
                      '--hover-color': darken(d.color, 0.2),
                      '--color': d.color,
                      width: getProgressbarLength(d.value)
                    }
                  }
                ></div>
              </Progressbar>
              <Typography
                variant={i === 0 ? 'body2' : 'caption'}
                color={i === 0 ? 'textPrimary' : 'textSecondary'}
              >
                <AnimatedNumber
                  value={d.value}
                  enabled={animation}
                  options={animationOptions}
                  formatter={formatter}
                />
              </Typography>
            </ProgressbarWrapper>
          </StyledTooltip>
        ))}
      </CategoryItemWrapperInner>
    </CategoryItemWrapperRoot>
  );
}

CategoryItem.displayName = 'CategoryItem';
CategoryItem.defaultProps = {
  animation: true,
  animationOptions: {},
  className: '',
  formatter: IDENTITY_FN,
  tooltipFormatter: IDENTITY_FN,
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
  tooltipFormatter: PropTypes.func,
  onClick: PropTypes.func,
  names: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default CategoryItem;
