import { Box, Skeleton, styled } from '@mui/material';

const BarsContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%',
  padding: '0 2%'
}));

const SkeletonBar = styled(Skeleton)(({ theme }) => ({
  flex: 1,
  maxWidth: theme.spacing(12),

  '& + &': {
    marginLeft: theme.spacing(2),

    [theme.breakpoints.down('xs')]: {
      marginLeft: theme.spacing(1)
    }
  }
}));

const BarWidgetLoading = ({ height, ...otherProps }) => {
  return (
    <>
      <Box mb={2}>
        <Skeleton width={48} height={8} />
      </Box>

      <BarsContainer style={{ height: height }}>
        <SkeletonBar variant='rectangular' width='20%' height='30%' />
        <SkeletonBar variant='rectangular' width='20%' height='40%' />
        <SkeletonBar variant='rectangular' width='20%' height='50%' />
        <SkeletonBar variant='rectangular' width='20%' height='20%' />
        <SkeletonBar variant='rectangular' width='20%' height='100%' />
        <SkeletonBar variant='rectangular' width='20%' height='50%' />
      </BarsContainer>
    </>
  );
};

export default BarWidgetLoading;
