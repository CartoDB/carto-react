import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonBarsGrid } from '../../SkeletonWidgets';
import { BREAKPOINTS } from '../../../theme/themeConstants';
import GraphLine from '../../../assets/images/GraphLine';

const Root = styled(Grid)(({ theme }) => ({
  alignItems: 'stretch',
  containerType: 'inline-size',

  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    ' > div': {
      marginRight: 0
    }
  }
}));

const Controls = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginRight: theme.spacing(4)
}));

const Graph = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(2)
}));

const SkeletonGraphLine = styled(SkeletonBarsGrid)(({ theme }) => ({
  svg: {
    width: '100%',
    height: 'auto',
    minHeight: theme.spacing(20),
    paddingTop: theme.spacing(4),
    fontSize: 'initial',
    fill: 'none',

    path: {
      stroke: theme.palette.black[8]
    }
  }
}));

const TimeSeriesSkeleton = ({ height }) => {
  return (
    <Root container height={height || SKELETON_HEIGHT}>
      <Controls item>
        <Grid item>
          <Skeleton width={48} height={8} />
        </Grid>

        <Grid item>
          {[...Array(3)].map((_, i) => (
            <Box mt={2}>
              <Skeleton key={i} width={24} height={24} />
            </Box>
          ))}
        </Grid>
      </Controls>

      <Graph item xs>
        <SkeletonGraphLine height='80%'>
          <GraphLine preserveAspectRatio='none' />
        </SkeletonGraphLine>
      </Graph>
    </Root>
  );
};

export default TimeSeriesSkeleton;
