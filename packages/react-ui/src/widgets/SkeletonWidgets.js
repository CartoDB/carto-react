import { Skeleton, styled } from '@mui/material';

export const SKELETON_HEIGHT = 240;

export const SkeletonBarsGrid = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
  width: '100%',
  position: 'relative',
  padding: theme.spacing(0, 2),

  // Linear grid effect
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

  // Square grid effect
  backgroundImage: `linear-gradient(${theme.palette.grey[50]} 0.5px, transparent 0.5px, transparent calc(100% - 0.5px), ${theme.palette.grey[50]} calc(100% - 0.5px)), linear-gradient(90deg, ${theme.palette.grey[50]} 0.5px, transparent 0.5px, transparent calc(100% - 0.5px), ${theme.palette.grey[50]} calc(100% - 0.5px))`,
  backgroundSize: '8.33% 20%',
  border: `0.5px solid ${theme.palette.grey[50]}`
}));

export const SkeletonBarItem = styled(Skeleton)(({ theme }) => ({
  flex: 1,
  maxWidth: theme.spacing(12),

  '& + &': {
    marginLeft: theme.spacing(1)
  }
}));

export const SkeletonThinBarItem = styled(Skeleton)(({ theme }) => ({
  flex: 1,
  maxWidth: theme.spacing(8),

  '& + &': {
    marginLeft: '1px'
  }
}));

export const SkeletonSolid = styled(Skeleton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100]
}));
