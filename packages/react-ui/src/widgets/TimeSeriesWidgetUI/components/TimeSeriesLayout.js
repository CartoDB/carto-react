import { Box, styled } from '@mui/material';
import { BREAKPOINTS } from '../../../theme/themeConstants';
import React from 'react';

const Root = styled(Box)(() => ({
  containerType: 'inline-size',
  display: 'flex',
  flexDirection: 'column'
}));

const BoxVert = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column'
}));

const BoxHorz = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row'
}));

const Header = styled(BoxHorz)(() => ({
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const ControlsBox = styled(Box)(({ theme }) => ({
  flexShrink: 0,
  marginLeft: 0,
  paddingLeft: theme.spacing(1),
  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    paddingLeft: 0
  },
  paddingBottom: theme.spacing(1.5),
  alignSelf: 'flex-end'
}));

const ChartBox = styled(Box)(({ theme }) => ({
  alignSelf: 'normal',
  minWidth: 0,
  paddingLeft: theme.spacing(5),
  paddingBottom: theme.spacing(1.5),
  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    paddingLeft: theme.spacing(1)
  }
}));

export default function TimeSeriesLayout({ fitHeight, header, controls, chart, legend }) {
  const legendFragment = legend && (
    <Box flex={0} mt={2}>
      {legend}
    </Box>
  );
  return (
    <Root
      style={{
        flex: fitHeight ? '1' : undefined
      }}
    >
      <Header flex={0}>{header}</Header>
      {controls ? (
        <BoxVert flex={1}>
          <BoxHorz flex={1}>
            <ControlsBox flex={0}>{controls}</ControlsBox>
            <ChartBox flex={1}>{chart}</ChartBox>
          </BoxHorz>
          {legendFragment}
        </BoxVert>
      ) : (
        <>
          <Box pb={1.5} flex={1}>
            {chart}
          </Box>
          {legendFragment}
        </>
      )}
    </Root>
  );
}
