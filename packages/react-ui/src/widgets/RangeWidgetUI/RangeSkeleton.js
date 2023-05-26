import React from 'react';
import { Grid, styled } from '@mui/material';
import { Skeleton } from '@mui/material';
import { SkeletonSolid } from '../SkeletonWidgets';

const Root = styled(Grid)(({ theme }) => ({
  position: 'relative',
  alignItems: 'center',
  height: theme.spacing(4)
}));

const DotsContainer = styled(Grid)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  padding: theme.spacing(0, 3)
}));

const RangeSkeleton = () => {
  return (
    <Grid container>
      <Root container item>
        <DotsContainer container item justifyContent='space-between'>
          <SkeletonSolid variant='circular' width={12} height={12} />
          <SkeletonSolid variant='circular' width={12} height={12} />
        </DotsContainer>

        <Skeleton height={2} width='100%' />
      </Root>

      <Grid container item justifyContent='space-between'>
        <Skeleton width={56} height={32} />
        <Skeleton width={56} height={32} />
      </Grid>
    </Grid>
  );
};

export default RangeSkeleton;
