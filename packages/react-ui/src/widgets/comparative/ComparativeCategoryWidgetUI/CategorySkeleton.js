import React from 'react';
import { Box } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '../../../components/atoms/Typography';
import { CategoriesList, LabelWrapper, Progressbar, Toolbar, Wrapper } from './comparative.styled';

export default function CategorySkeleton() {
  return (
    <Wrapper>
      <Toolbar center={true}>
        <Typography variant='caption'>
          <Skeleton variant='text' width={100} />
        </Typography>
      </Toolbar>
      <CategoriesList>
        {[...Array(4)].map((_, i) => (
          <Box key={i} py={0.5}>
            <LabelWrapper>
              <Typography variant='body2' noWrap>
                <Skeleton variant='text' width={100} />
              </Typography>
              <Typography variant='body2'>
                <Skeleton variant='text' width={70} />
              </Typography>
            </LabelWrapper>
            {[...Array(3)].map((_, i) => (
              <Progressbar key={i} />
            ))}
          </Box>
        ))}
      </CategoriesList>
    </Wrapper>
  );
}
