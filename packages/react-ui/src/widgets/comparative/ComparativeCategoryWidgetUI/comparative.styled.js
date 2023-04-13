import { Box, TextField, Tooltip, styled } from '@mui/material';
import CategoryItem from './CategoryItem';

export const Wrapper = styled('div')(({theme}) => ({
  padding: theme.spacing(2, 0),
  ...theme.typography.body2
}));

export const CategoriesList = styled(Box)(({theme}) => ({
  overflow: 'auto',
  maxHeight: theme.spacing(40),
  paddingRight: theme.spacing(1),
  margin: theme.spacing(0.5, 0)
}));

export const BulletListWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: theme.spacing(1.5),
  padding: theme.spacing(2, 0)
}));

export const BulletWrapper = styled(Box)(({theme, alignItems='center'}) => ({
  display: 'flex',
  alignItems,
  gap: theme.spacing(0.75)
}));

export const Bullet = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color'
}
)(({theme, color: backgroundColor}) => ({
  flexShrink: 0,
  width: theme.spacing(1),
  height: theme.spacing(1),
  borderRadius: theme.spacing(1),
  backgroundColor,

}));


export const ProgressbarWrapper = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));

export const Progressbar = styled('div')(({theme}) => ({
  height: theme.spacing(0.5),
  width: '100%',
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.action.disabledBackground,

  '& div': {
    width: 0,
    height: '100%',
    borderRadius: theme.spacing(0.5),
    transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                 width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`
  }
}));

export const Toolbar = styled(Box,  {
  shouldForwardProp: (prop) => prop !== 'center'
})(({theme, center = false}) => ({
  marginBottom: theme.spacing(2),
  paddingRight: theme.spacing(1),
  ...(center && {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  '& .MuiTypography-caption': {
    color: theme.palette.text.secondary
  },

  '& .MuiButton-label': {
    ...theme.typography.caption
  },

  '& a': {
    cursor: 'pointer'
  }
}));


export const StyledTooltip = styled(Tooltip)(({theme}) => ({
  '.MuiTooltip-tooltip': {
    color: theme.palette.common.white,
    maxWidth: 260,
    marginBottom: 0,
    overflow: 'hidden',
  },
}));


export const SearchInput = styled(TextField)(({theme}) => ({
  marginTop: theme.spacing(-0.5)
}));


export const LabelWrapper = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'space-between',
}));


export const CategoryItemStyled = styled(CategoryItem, {
  shouldForwardProp: (prop) => prop !== 'filterable'
})(({theme, filterable}) => ({
  '& .progressbar div': {
    backgroundColor: 'var(--color)'
  },
  ...(filterable && {
    cursor: 'pointer',
    '&:hover .progressbar div': {
      backgroundColor: 'var(--hover-color)'
    },
  })
}));

export const CategoryItemWrapperRoot = styled(Box)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'nowrap',
  overflow: 'hidden',
  gap: theme.spacing(1)
}));

export const CategoryItemWrapperInner = styled(Box)(({theme}) => ({
  padding: theme.spacing(0.5, 0),
  flexGrow: '1',
  maxWidth: '100%',
  minWidth: 0
}));


export const SignWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'backgroundColor'
})(({theme, backgroundColor}) => ({
  marginLeft: theme.spacing(1),
  padding: theme.spacing(0, 1),
  backgroundColor,
  color: 'white',
  borderRadius: theme.spacing(2)
}));

