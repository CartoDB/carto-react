import React from 'react';
import { Box, Skeleton } from '@mui/material';
import {
  SKELETON_HEIGHT,
  SkeletonGraphGrid,
  SkeletonThinBarItem
} from '../SkeletonWidgets';

const HistogramSkeleton = ({ height }) => {
  return (
    <>
      <Box mb={2}>
        <Skeleton width={48} height={8} />
      </Box>

      <SkeletonGraphGrid style={{ height: height || SKELETON_HEIGHT }}>
        <SkeletonThinBarItem variant='rectangular' height='20%' />
        <SkeletonThinBarItem variant='rectangular' height='40%' />
        <SkeletonThinBarItem variant='rectangular' height='60%' />
        <SkeletonThinBarItem variant='rectangular' height='20%' />
        <SkeletonThinBarItem variant='rectangular' height='80%' />
        <SkeletonThinBarItem variant='rectangular' height='50%' />
        <SkeletonThinBarItem variant='rectangular' height='20%' />
        <SkeletonThinBarItem variant='rectangular' height='40%' />
        <SkeletonThinBarItem variant='rectangular' height='60%' />
        <SkeletonThinBarItem variant='rectangular' height='20%' />
        <SkeletonThinBarItem variant='rectangular' height='80%' />
        <SkeletonThinBarItem variant='rectangular' height='50%' />
      </SkeletonGraphGrid>
    </>
  );
};

export default HistogramSkeleton;
