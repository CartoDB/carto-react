import { Box, Skeleton, styled } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonMask } from '../SkeletonWidgets';

const PieShape = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}));

const SkeletonCircleMask = styled(SkeletonMask)(() => ({
  position: 'absolute',
  zIndex: 1
}));

const TextContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  position: 'absolute',
  zIndex: 2
}));

const Leyend = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

const LeyendItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  height: theme.spacing(6),
  marginTop: theme.spacing(2)
}));

const PieSkeleton = ({ height }) => {
  const SIZE = parseInt(height, 10) || SKELETON_HEIGHT;
  const GUTTER = 16;
  const LEYEND_SIZE = 64;
  const PIE_SIZE = SIZE - LEYEND_SIZE;
  const PIE_INNER_SIZE = PIE_SIZE - GUTTER * 2;

  return (
    <Box height={SIZE}>
      <PieShape>
        <Skeleton variant='circular' width={PIE_SIZE} height={PIE_SIZE} />
        <SkeletonCircleMask
          variant='circular'
          width={PIE_INNER_SIZE}
          height={PIE_INNER_SIZE}
        />

        <TextContainer>
          <Skeleton height={24} width={72} />
          <Skeleton height={8} width={48} />
        </TextContainer>
      </PieShape>

      <Leyend height={LEYEND_SIZE}>
        {[...Array(2)].map((_, i) => (
          <LeyendItem key={i}>
            <Skeleton variant='circular' width={8} height={8} />
            <Skeleton width={48} height={8} />
          </LeyendItem>
        ))}
      </Leyend>
    </Box>
  );
};

export default PieSkeleton;
