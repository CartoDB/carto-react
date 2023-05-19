import { Box, Skeleton } from '@mui/material';
import { SkeletonBarsGrid, SkeletonBarItem } from '../SkeletonWidgets';

const BarWidgetLoading = ({ height, ...otherProps }) => {
  return (
    <>
      <Box mb={2}>
        <Skeleton width={48} height={8} />
      </Box>

      <SkeletonBarsGrid style={{ height: height }}>
        <SkeletonBarItem variant='rectangular' width='20%' height='20%' />
        <SkeletonBarItem variant='rectangular' width='20%' height='40%' />
        <SkeletonBarItem variant='rectangular' width='20%' height='60%' />
        <SkeletonBarItem variant='rectangular' width='20%' height='20%' />
        <SkeletonBarItem variant='rectangular' width='20%' height='80%' />
      </SkeletonBarsGrid>
    </>
  );
};

export default BarWidgetLoading;
