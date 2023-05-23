import { Box, Grid, Skeleton, styled } from '@mui/material';
import { SkeletonMask } from '../SkeletonWidgets';

const PieShape = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative'
}));

const SkeletonCircleMask = styled(SkeletonMask)(({ theme }) => ({
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

const GridLeyend = styled(Grid)(({ theme }) => ({
  flexDirection: 'row',
  height: theme.spacing(5.5),
  marginTop: theme.spacing(2)
}));

const PieSkeleton = ({ height }) => {
  const PIE_SIZE = parseInt(height, 10);
  const GUTTER = 16;
  const PIE_INNER_SIZE = PIE_SIZE - GUTTER * 2;

  return (
    <Box height={PIE_SIZE}>
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

      <GridLeyend container spacing={2}>
        {[...Array(2)].map((_, i) => (
          <Grid key={i} item container spacing={1.5}>
            <Grid item>
              <Skeleton variant='circular' width={8} height={8} />
            </Grid>
            <Grid item>
              <Skeleton width={48} height={8} />
            </Grid>
          </Grid>
        ))}
      </GridLeyend>
    </Box>
  );
};

export default PieSkeleton;
