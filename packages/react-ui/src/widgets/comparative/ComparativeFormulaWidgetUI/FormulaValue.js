import React from 'react';
import { Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

import AnimatedNumber from '../../../custom-components/AnimatedNumber';
import Typography from '../../../components/atoms/Typography';

const MainLine = styled('div')(({ theme }) => ({
  margin: 0,
  ...theme.typography.h5,
  fontWeight: Number(theme.typography.fontWeightMedium),
  color: theme.palette.text.primary,
  display: 'flex'
}));

const Preffix = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(0.5)
}));

const Unit = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(0.5)
}));

function FormulaValue({ row, animated, animationOptions, formatter }) {
  const theme = useTheme();

  const { prefix, value, suffix, shouldBeHighlighted } = row;

  return (
    <MainLine>
      {prefix ? (
        <Box color={theme.palette.text.secondary}>
          <Preffix color='inherit' component='span' variant='subtitle2'>
            {prefix}
          </Preffix>
        </Box>
      ) : null}

      <Box fontWeight={shouldBeHighlighted ? 'bold' : ''}>
        <AnimatedNumber
          value={value}
          enabled={animated}
          options={animationOptions}
          formatter={formatter}
        />
      </Box>

      {suffix ? (
        <Box color={theme.palette.text.secondary}>
          <Unit color='inherit' component='span' variant='subtitle2'>
            {suffix}
          </Unit>
        </Box>
      ) : null}
    </MainLine>
  );
}

export default FormulaValue;
