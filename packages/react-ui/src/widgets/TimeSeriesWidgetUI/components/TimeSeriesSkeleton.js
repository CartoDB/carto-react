import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SkeletonBarsGrid } from '../../SkeletonWidgets';
import { BREAKPOINTS } from '../../../theme/themeConstants';
import GraphLine from '../../../assets/images/GraphLine';
import { getSpacing } from '../../../theme/themeUtils';

const Root = styled(Grid)(() => ({
  containerType: 'inline-size',
  gap: 0,
  margin: 0,
  padding: 0
}));

const Controls = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  margin: 0,
  paddingLeft: theme.spacing(1),
  paddingBottom: theme.spacing(3),
  gap: theme.spacing(2),
  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    paddingLeft: 0
  }
}));

const Graph = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  margin: 0,
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: theme.spacing(5),
  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    paddingLeft: theme.spacing(1)
  }
}));

const Legend = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  margin: 0,
  padding: theme.spacing(2.25, 0.5)
}));

const SkeletonGraphLine = styled(SkeletonBarsGrid)(({ theme }) => ({
  svg: {
    width: '100%',
    height: 'auto',
    paddingTop: theme.spacing(4),
    fontSize: 'initial',
    fill: 'none',

    path: {
      stroke: theme.palette.black[8]
    }
  }
}));

const TimeSeriesSkeleton = ({ height, showControls, showLegend }) => {
  return (
    <Root container>
      <Grid item xs={12} pt={1} pb={1}>
        <Skeleton width={48} height={8} />
      </Grid>
      {showControls && (
        <Controls item>
          <Grid item>
            <Box>
              <Skeleton width={24} height={24} />
            </Box>
            <Box mt={2}>
              <Skeleton width={24} height={24} />
            </Box>
            <Box mt={1}>
              <Skeleton width={24} height={24} />
            </Box>
          </Grid>
        </Controls>
      )}

      <Graph item xs height={height || getSpacing(22)}>
        <SkeletonGraphLine>
          <GraphLine preserveAspectRatio='none' />
        </SkeletonGraphLine>
        <Box display='flex' flexDirection='row' gap='20px' pt={1} pb={1}>
          <Skeleton width={48} height={8} />
          <Skeleton width={48} height={8} />
        </Box>
      </Graph>

      {showLegend && (
        <Legend item xs={12}>
          <Skeleton width={48} height={8} />
          <Skeleton width={48} height={8} />
        </Legend>
      )}
    </Root>
  );
};

export default TimeSeriesSkeleton;
