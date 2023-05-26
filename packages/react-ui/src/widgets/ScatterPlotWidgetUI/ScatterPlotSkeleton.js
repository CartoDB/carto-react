import React from 'react';
import { Box, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonGraphGrid } from '../SkeletonWidgets';

const GraphGrid = styled(SkeletonGraphGrid)(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: theme.spacing(4)
}));

const DotsBox = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  height: theme.spacing(8)
}));

const ScatterPlotSkeleton = ({ height }) => {
  function multiplierNumber(number) {
    return Math.floor(Math.random() * 4) + 2 + number;
  }

  return (
    <Box height={height || SKELETON_HEIGHT}>
      <Box mb={4}>
        <Skeleton width={48} height={8} />
      </Box>

      <GraphGrid height={height || '80%'}>
        {[...Array(4)].map((_, i) => (
          <DotsBox key={i} mt={multiplierNumber(i + 1)}>
            {[...Array(3)].map((_, i) => (
              <Box ml={multiplierNumber(i + 1)}>
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
