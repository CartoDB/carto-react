import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonBarsGrid } from '../../SkeletonWidgets';
import GraphLine from '../../../assets/images/GraphLine';

const Controls = styled(Grid)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginRight: theme.spacing(4)
}));

const Graph = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end'
}));

const SkeletonGraphLine = styled(GraphLine)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  paddingTop: theme.spacing(4),
  fontSize: 'initial',
  fill: 'none',

  path: {
    stroke: theme.palette.black[8]
  }
}));

const TimeSeriesSkeleton = ({ height }) => {
  return (
    <Grid container alignItems='stretch' height={height || SKELETON_HEIGHT}>
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
        <SkeletonBarsGrid height='80%'>
          <SkeletonGraphLine />
        </SkeletonBarsGrid>
      </Graph>
    </Grid>
  );
};

export default TimeSeriesSkeleton;
