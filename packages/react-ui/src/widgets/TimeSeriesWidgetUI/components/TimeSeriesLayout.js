import { Box, styled } from '@mui/material';
import { BREAKPOINTS } from '../../../theme/themeConstants';
import React from 'react';

const Root = styled(Box)(({ theme }) => ({
  containerType: 'inline-size'
}));

const BoxVert = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column'
}));

const BoxHorz = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row'
}));

const ControlsBox = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: 0,
  paddingLeft: theme.spacing(1),
  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    paddingLeft: 0
  },
  paddingBottom: theme.spacing(3),
  alignSelf: 'flex-end'
}));

const ChartBox = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: 0,
  paddingLeft: theme.spacing(5),
  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    paddingLeft: theme.spacing(1)
  }
}));

export default function TimeSeriesLayout({ header, controls, chart, legend }) {
  return (
    <Root>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        {header}
      </Box>
      {controls ? (
        <BoxVert>
          <BoxHorz>
            <ControlsBox>{controls}</ControlsBox>
            <ChartBox>{chart}</ChartBox>
          </BoxHorz>
          {legend}
        </BoxVert>
      ) : (
        <BoxVert>
          {chart}
          {legend}
        </BoxVert>
      )}
    </Root>
  );
}
