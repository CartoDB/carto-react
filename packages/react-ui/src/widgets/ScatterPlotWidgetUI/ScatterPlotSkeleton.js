import React from 'react';
import { Box, Grid, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonGraphGrid } from '../SkeletonWidgets';
import { BREAKPOINTS } from '../../theme/themeConstants';

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

const ScatterPlotSkeleton = ({ height }) => {
  return (
    <Root container height={height || SKELETON_HEIGHT}>
      <Controls item>
        <Grid item>
          <Skeleton width={48} height={8} />
        </Grid>
      </Controls>

      <Graph item xs>
        <SkeletonGraphGrid height={height || '80%'}>
          {[...Array(4)].map((_, i) => (
            <Box key={i} mt={2}>
              <Skeleton variant='circular' width={12} height={12} />
              <Skeleton variant='circular' width={12} height={12} />
              <Skeleton variant='circular' width={12} height={12} />
            </Box>
          ))}
        </SkeletonGraphGrid>
      </Graph>
    </Root>
  );
};

export default ScatterPlotSkeleton;
