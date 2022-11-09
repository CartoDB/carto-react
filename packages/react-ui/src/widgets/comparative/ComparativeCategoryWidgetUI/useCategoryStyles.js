import { makeStyles } from "@material-ui/core";

export const useCategoryStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2, 0),
    ...theme.typography.body2
  },
  categoriesList: {
    overflow: 'auto',
    maxHeight: theme.spacing(40),
    paddingRight: theme.spacing(1),
    margin: theme.spacing(0.5, 0)
  },
  progressbar: {
    height: theme.spacing(0.5),
    width: '100%',
    margin: theme.spacing(0.5, 0, 1, 0),
    borderRadius: theme.spacing(0.5),
    backgroundColor: theme.palette.action.disabledBackground,

    '& div': {
      width: 0,
      height: '100%',
      borderRadius: theme.spacing(0.5),
      transition: `background-color ${theme.transitions.easing.sharp} ${theme.transitions.duration.shortest}ms,
                   width ${theme.transitions.easing.sharp} ${theme.transitions.duration.complex}ms`
    }
  },
  toolbar: {
    marginBottom: theme.spacing(2),
    paddingRight: theme.spacing(1),

    '& .MuiTypography-caption': {
      color: theme.palette.text.secondary
    },

    '& .MuiButton-label': {
      ...theme.typography.caption
    },

    '& a': {
      cursor: 'pointer'
    }
  },
  searchInput: {
    marginTop: theme.spacing(-0.5)
  },
  categoryGroup: {
    '& $progressbar div': {
      backgroundColor: 'var(--color)'
    }
  },
  categoryGroupHover: {
    cursor: 'pointer',
    '&:hover $progressbar div': {
      backgroundColor: 'var(--hover-color)'
    },
    '& $progressbar div': {
      backgroundColor: 'var(--color)'
    }
  },
  bullet: {
    flexShrink: 0,
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: theme.spacing(1)
  }
}));
