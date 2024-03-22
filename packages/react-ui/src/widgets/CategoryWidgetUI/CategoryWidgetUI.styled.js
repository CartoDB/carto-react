import { Box, Button, Grid, Link, styled } from '@mui/material';
import Typography from '../../components/atoms/Typography';

const REST_CATEGORY = '__rest__';

export const CategoriesWrapper = styled(Grid)(({ theme }) => ({
  maxHeight: theme.spacing(40),
  overflow: 'auto',
  padding: 0
}));

export const CategoryItemGroup = styled(Grid, {
  shouldForwardProp: (prop) => !['selectable', 'name', 'unselected'].includes(prop)
})(({ theme, selectable, name, unselected }) => {
  return {
    flexDirection: 'row',
    maxWidth: '100%',
    padding: theme.spacing(0.5, 0.25),
    margin: 0,

    '> .MuiGrid-item': {
      paddingTop: 0,
      paddingLeft: 0
    },
    '&:focus-visible': {
      outline: `none !important`,
      boxShadow: `inset 0 0 0 2px ${theme.palette.primary.main} !important`
    },

    ...(unselected && {
      color: theme.palette.text.disabled,

      '.progressbar div': {
        backgroundColor: theme.palette.text.disabled
      }
    }),
    ...(name !== REST_CATEGORY &&
      selectable && {
        cursor: 'pointer',
        flexWrap: 'nowrap',

        '&:hover .progressbar div': {
          backgroundColor: theme.palette.secondary.dark
        }
      }),
    ...(name === REST_CATEGORY && {
      cursor: 'default',

      '.progressbar div': {
        backgroundColor: theme.palette.text.disabled
      }
    })
  };
});

export const OptionsSelectedBar = styled(Grid)(({ theme: { spacing, palette } }) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing(1.5),
  paddingRight: spacing(1),

  '& .MuiTypography-caption': {
    color: palette.text.secondary
  }
}));

export const ProgressBar = styled(Grid)(({ theme }) => ({
  height: theme.spacing(0.5),
  width: '100%',
  margin: theme.spacing(0.5, 0, 0.25, 0),
  borderRadius: theme.spacing(0.5),
  backgroundColor: theme.palette.action.disabledBackground,

  '& div': {
    width: 0,
    height: '100%',
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.secondary.main,
    transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                 width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`
  }
}));

export const CategoryLabelWrapper = styled(Grid, {
  shouldForwardProp: (prop) => prop !== 'isSelectable'
})(({ theme, isSelectable }) => {
  return {
    ...(isSelectable && {
      width: `calc(100% - ${theme.spacing(4)})`
    })
  };
});

export const CategoryLabel = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightBold,
  marginRight: theme.spacing(2)
}));

export const LinkAsButton = styled(Link)(({ theme }) => ({
  ...theme.typography.caption,
  cursor: 'pointer',

  '& + hr': {
    margin: theme.spacing(0, 1)
  }
}));

export const CategoriesRoot = styled(Box)(({ theme }) => ({
  ...theme.typography.body2
}));

export const HiddenButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  left: '-999px',
  top: '-1px',
  width: '1px',
  height: '1px',
  display: 'inline-flex',

  '&:focus-visible': {
    position: 'static',
    width: 'auto',
    height: 'auto',
    marginTop: theme.spacing(2)
  }
}));
