import React from 'react';
import { Box, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonGraphGrid } from '../SkeletonWidgets';
import { BREAKPOINTS } from '../../theme/themeConstants';

const GraphGrid = styled(SkeletonGraphGrid)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(4),
  containerType: 'inline-size',

  [`@container (max-width: ${BREAKPOINTS.XS}px)`]: {
    ' > div': {
      maxWidth: '75%'
    }
  }
}));

const DotsBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  width: '80%',
  maxWidth: '50%'
}));

const ScatterPlotSkeleton = ({ height }) => {
  function getRandomValue() {
    // get a random integer value between 0 and 5
    return Math.floor(Math.random() * 5);
  }

  return (
    <Box height={height || SKELETON_HEIGHT}>
      <Box mb={4}>
        <Skeleton width={48} height={8} />
      </Box>

      <GraphGrid height={'80%'}>
        {[...Array(3)].map((_, i) => (
          // Every row is placed with an incremental margin left to reinforce the effect of a scatter plot
          <DotsBox key={i} ml={i * 3}>
            {[...Array(4)].map((_, i) => (
              // Random margins are used to create the effect of a scatter plot
              <Box key={i} mt={getRandomValue()} ml={getRandomValue()}>
                <Skeleton variant='circular' width={12} height={12} />
              </Box>
            ))}
          </DotsBox>
        ))}
      </GraphGrid>
    </Box>
  );
};

export default ScatterPlotSkeleton;
