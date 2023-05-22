import React from 'react';
import { Grid, styled } from '@mui/material';
import { Skeleton } from '@mui/material';

import { CategoriesWrapper, CategoryItemGroup } from './CategoryWidgetUI.styled';

const SkeletonProgressbar = styled(Skeleton)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  marginBottom: theme.spacing(1.75)
}));

const CategorySkeleton = () => {
  const isOdd = (num) => num % 2 === 1;

  return (
    <>
      <Skeleton width={48} height={8} />

      <CategoriesWrapper container mt={3}>
        {[...Array(4)].map((_, i) => (
          <CategoryItemGroup key={i} container spacing={1}>
            <Grid container item direction='row' justifyContent='space-between'>
              <Skeleton width={isOdd(i) ? 72 : 48} height={8} />
              <Skeleton width={48} height={8} />
            </Grid>

            <SkeletonProgressbar height={4} width='100%' />
          </CategoryItemGroup>
        ))}
      </CategoriesWrapper>
    </>
  );
};

export default CategorySkeleton;
