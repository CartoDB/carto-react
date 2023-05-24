import { Box, Skeleton, styled } from '@mui/material';
import { SKELETON_HEIGHT, SkeletonMask } from '../SkeletonWidgets';

const GUTTER = 16;
const LEYEND_SIZE = 64;

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
  gap: theme.spacing(2),
  height: LEYEND_SIZE
}));

const LeyendItem = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  height: theme.spacing(6),
  marginTop: theme.spacing(2)
}));

const PieSkeleton = ({ height }) => {
  const size = parseInt(height, 10) || SKELETON_HEIGHT;
  const pieSize = size - LEYEND_SIZE;
  const pieInnerSize = pieSize - GUTTER * 2;

  return (
    <Box height={size}>
      <PieShape>
        <Skeleton variant='circular' width={pieSize} height={pieSize} />
        <SkeletonCircleMask
          variant='circular'
          width={pieInnerSize}
          height={pieInnerSize}
        />

        <TextContainer>
          <Skeleton height={24} width={72} />
          <Skeleton height={8} width={48} />
        </TextContainer>
      </PieShape>

      <Leyend>
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
