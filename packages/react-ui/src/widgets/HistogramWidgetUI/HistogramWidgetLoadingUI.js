import { Box, Skeleton } from '@mui/material';
import { SkeletonGraphGrid, SkeletonThinBarItem } from '../SkeletonWidgets';

const HistogramWidgetLoading = ({ height, ...otherProps }) => {
  return (
    <>
      <Box mb={2}>
        <Skeleton width={48} height={8} />
      </Box>

      <SkeletonGraphGrid style={{ height: height }}>
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

export default HistogramWidgetLoading;
