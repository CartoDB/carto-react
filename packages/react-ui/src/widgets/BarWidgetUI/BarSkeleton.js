import React from 'react';
import { Box, Skeleton } from '@mui/material';
import { SkeletonBarsGrid, SkeletonBarItem, SKELETON_HEIGHT } from '../SkeletonWidgets';

const BarSkeleton = ({ height }) => {
  return (
    <>
      <Box mb={2}>
        <Skeleton width={48} height={8} />
      </Box>

      <SkeletonBarsGrid style={{ height: height || SKELETON_HEIGHT }}>
        <SkeletonBarItem variant='rectangular' height='20%' />
        <SkeletonBarItem variant='rectangular' height='40%' />
        <SkeletonBarItem variant='rectangular' height='60%' />
        <SkeletonBarItem variant='rectangular' height='20%' />
        <SkeletonBarItem variant='rectangular' height='80%' />
      </SkeletonBarsGrid>
    </>
  );
};

export default BarSkeleton;
