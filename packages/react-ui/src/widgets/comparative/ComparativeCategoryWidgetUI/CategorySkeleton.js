import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useCategoryStyles } from './useCategoryStyles';

export default function CategorySkeleton() {
  const classes = useCategoryStyles();
  return (
    <div className={classes.wrapper}>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        className={classes.toolbar}
      >
        <Typography variant='caption'>
          <Skeleton variant='text' width={100} />
        </Typography>
      </Box>
      <Box className={classes.categoriesList}>
        {[...Array(4)].map((_, i) => (
          <Box key={i} py={0.5}>
            <Box display='flex' justifyContent='space-between' flexWrap='nowrap'>
              <Typography variant='body2' noWrap>
                <Skeleton variant='text' width={100} />
              </Typography>
              <Typography variant='body2'>
                <Skeleton variant='text' width={70} />
              </Typography>
            </Box>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={classes.progressbar}></div>
            ))}
          </Box>
        ))}
      </Box>
    </div>
  );
}
