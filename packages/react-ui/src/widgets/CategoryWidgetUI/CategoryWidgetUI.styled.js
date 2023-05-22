import { Box, Grid, Link, styled } from '@mui/material';
import Typography from '../../components/atoms/Typography';

const REST_CATEGORY = '__rest__';

export const CategoriesWrapper = styled(Grid)(({ theme: { spacing } }) => ({
  maxHeight: spacing(40),
  overflow: 'auto',
  padding: spacing(0, 1, 1, 0)
}));

export const CategoryItemGroup = styled(Grid, {
  shouldForwardProp: (prop) => !['selectable', 'name', 'unselected'].includes(prop)
})(({ theme, selectable, name, unselected }) => {
  return {
    flexDirection: 'row',
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
  margin: theme.spacing(0.5, 0, 1, 0),
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

export const CategoriesRoot = styled(Box)(({ theme: { typography } }) => ({
  ...typography.body2
}));
