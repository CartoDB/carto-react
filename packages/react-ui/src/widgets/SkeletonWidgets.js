import { Skeleton, styled } from '@mui/material';

export const SkeletonBarsGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%',
  position: 'relative',
  padding: theme.spacing(0, 2),

  // Creates the linear grid effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundSize: theme.spacing(4, 4),
    backgroundImage: `linear-gradient(to bottom, ${theme.palette.grey[50]} 1px, transparent 1px)`,
    transform: 'scaleY(-1)'
  }
}));

export const SkeletonGraphGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%',
  position: 'relative',
  padding: theme.spacing(0, 2),

  // Creates the squares grid effect
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundSize: theme.spacing(4, 4),
    backgroundImage: `linear-gradient(to right, ${theme.palette.grey[50]} 1px, transparent 1px), linear-gradient(to bottom, ${theme.palette.grey[50]} 1px, transparent 1px)`,
    transform: 'scaleY(-1)'
  }
}));

export const SkeletonBarItem = styled(Skeleton)(({ theme }) => ({
  flex: 1,
  maxWidth: theme.spacing(12),

  '& + &': {
    marginLeft: theme.spacing(1)
  }
}));
