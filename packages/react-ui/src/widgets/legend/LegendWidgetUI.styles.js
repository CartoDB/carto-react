import { Paper, styled } from '@mui/material';
import { ICON_SIZE_MEDIUM } from '../../theme/themeConstants';

export const LEGEND_WIDTH = 240;

export const LegendRoot = styled(Paper, {
  shouldForwardProp: (prop) => !['collapsed'].includes(prop)
})(({ theme, collapsed }) => ({
  width: collapsed ? undefined : LEGEND_WIDTH,
  background: theme.palette.background.paper,
  position: 'absolute',
  maxHeight: 'calc(100% - 120px)',
  display: 'flex',
  flexDirection: 'column'
}));

export const LegendToggleHeader = styled('header', {
  shouldForwardProp: (prop) => !['collapsed'].includes(prop)
})(({ theme, collapsed }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
  paddingLeft: theme.spacing(2),
  borderBottom: collapsed ? undefined : `1px solid ${theme.palette.divider}`
}));

export const LegendItemHeader = styled('header')(({ theme }) => ({
  padding: theme.spacing(1.5),
  paddingRight: theme.spacing(2),
  gap: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'space-between',
  position: 'sticky',
  zIndex: 2,
  top: 0,
  background: theme.palette.background.paper
}));

export const StyledOpacityControl = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  padding: theme.spacing(1),
  minWidth: LEGEND_WIDTH - 32
}));

export const styles = {
  legendItemList: {
    overflow: 'auto',
    maxHeight: `calc(100% - 12px)`
  },
  legendItem: {
    '&:not(:first-of-type)': {
      borderTop: (theme) => `1px solid ${theme.palette.divider}`
    }
  },
  layerVariablesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 1
  },
  layerOptions: {
    background: (theme) => theme.palette.background.default,
    px: 2,
    py: 1,
    m: 2
  },
  opacityInput: {
    display: 'flex',
    width: '60px',
    flexShrink: 0
  },
  legendVariableList: {
    m: 0,
    p: 0,
    pb: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  legendVariableListItem: {
    display: 'flex',
    alignItems: 'center'
  },
  legendIconWrapper: {
    mr: 1.5,
    width: ICON_SIZE_MEDIUM,
    height: ICON_SIZE_MEDIUM,
    '& img': {
      margin: 'auto',
      display: 'block'
    }
  }
};
